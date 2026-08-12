/**
 * BACKEND — HUB DE EXÁMENES DE INDUCCIÓN (ONI · SSOMA) → Google Drive
 * ------------------------------------------------------------------
 * Recibe un examen ya corregido desde la app (index.html), genera el PDF de
 * sustento (con foto y firma) EN EL SERVIDOR y lo archiva en Drive con la
 * jerarquía pedida:
 *
 *   Raíz › Año › Mes › Día › Área › División › Nombre completo › Examen_...pdf
 *
 * Puntos que resuelve:
 *  - PDF generado en el servidor a partir de una plantilla HTML (no requiere
 *    librerías en el navegador): Utilities.newBlob(html).getAs('application/pdf').
 *  - Carpetas reutilizadas sin duplicar (getOrCreateFolder + LockService).
 *  - Idempotencia por uploadId (CacheService): un reintento tras un error de
 *    red NO vuelve a generar el PDF → nunca se duplica en Drive.
 *  - Evidencia abierta a lectura con enlace (jefes/coordinadores no piden acceso).
 *  - Registro de metadatos (tema, nombre, área, nota, aprobado…) en una hoja.
 *
 * INSTALACIÓN (ver README.md):
 *  1) Crea en Drive la carpeta raíz "Exámenes de Inducción 2026" y copia su ID
 *     desde la URL → pégalo en ROOT_FOLDER_ID.
 *  2) (Opcional) Crea una Google Sheet y copia su ID en LOG_SHEET_ID.
 *  3) Implementar › Nueva implementación › Aplicación web
 *       - Ejecutar como: Yo
 *       - Quién tiene acceso: Cualquier usuario
 *  4) Copia la URL /exec y pégala en CONFIG.endpoint de index.html.
 */

/* ====================== CONFIGURACIÓN ====================== */
var ROOT_FOLDER_ID = 'PEGA_AQUI_EL_ID_DE_LA_CARPETA_RAIZ';   // "Exámenes de Inducción 2026"
var LOG_SHEET_ID   = '';                                     // (opcional) ID de la hoja de registro
var LOG_SHEET_NAME = 'Registros';
/* ========================================================== */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || '';
  if (action === 'registros') {
    return json({ ok: true, registros: leerRegistros(e) });
  }
  return json({ ok: true, service: 'HUB Exámenes de Inducción', time: new Date().toISOString() });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!data || data.action !== 'examen') {
      return json({ ok: false, error: 'Solicitud no reconocida.' });
    }
    if (!ROOT_FOLDER_ID || ROOT_FOLDER_ID.indexOf('PEGA_AQUI') === 0) {
      return json({ ok: false, error: 'ROOT_FOLDER_ID no configurado en el script.' });
    }
    var meta = data.meta || {};

    // Idempotencia: si este mismo envío ya se procesó, devuelve el resultado anterior.
    var cache = CacheService.getScriptCache();
    var uid = data.uploadId ? ('exm_' + String(data.uploadId)) : '';
    if (uid) { var prev = cache.get(uid); if (prev) return textJson(prev); }

    // Ruta de carpetas (serializada solo al crear, para no duplicar).
    var dest = createFolderPath(data, meta);
    compartirLectura(dest);

    // PDF a partir del HTML.
    var nombreArchivo = buildFileName(meta);
    var html = buildHtml(data, meta);
    var pdfBlob = Utilities.newBlob(html, 'text/html', nombreArchivo + '.html').getAs('application/pdf').setName(nombreArchivo + '.pdf');
    var file = dest.createFile(pdfBlob);
    file.setDescription(JSON.stringify(meta));

    logToSheet(meta, dest.getUrl(), file);

    var result = JSON.stringify({ ok: true, folder: dest.getUrl(), folderId: dest.getId(), pdf: file.getUrl(), pdfId: file.getId(), name: file.getName() });
    if (uid) { try { cache.put(uid, result, 21600); } catch (e3) {} } // 6 h anti-duplicado
    return textJson(result);

  } catch (err) {
    return json({ ok: false, error: String(err && err.message || err) });
  }
}

/**
 * Crea/reutiliza: Raíz › Año › Mes › Día › Área › División › Nombre completo.
 */
function createFolderPath(data, meta) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var root = DriveApp.getFolderById(ROOT_FOLDER_ID);
    var anio = getOrCreateFolder(root, sanitize(data.anioFolder || 'Sin-anio'));
    var mes  = getOrCreateFolder(anio, sanitize(data.mesFolder  || 'Sin-mes'));
    var dia  = getOrCreateFolder(mes,  sanitize(data.diaFolder  || 'Sin-dia'));
    var area = getOrCreateFolder(dia,  sanitize(meta.area || 'Sin-area'));
    var div  = getOrCreateFolder(area, sanitize(meta.division || 'Sin-division'));
    var nom  = getOrCreateFolder(div,  sanitize(meta.nombre || 'Sin-nombre'));
    return nom;
  } finally {
    try { lock.releaseLock(); } catch (e2) {}
  }
}

function getOrCreateFolder(parent, name) {
  var it = parent.getFoldersByName(name);
  if (it.hasNext()) return it.next();
  return parent.createFolder(name);
}

function compartirLectura(folder) {
  try { folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
}

function sanitize(s) {
  return String(s == null ? '' : s).replace(/[\\\/\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180) || 'Sin-nombre';
}

/** Nombre de archivo: Examen_<Tema>_<AAAA-MM-DD>_<Nombre>[_DESAPROBADO].pdf */
function buildFileName(meta) {
  var tema = sanitize(meta.temaTitulo || meta.tema || 'Examen').replace(/\s+/g, '-');
  var nom  = sanitize(meta.nombre || '').replace(/\s+/g, '-');
  var estado = meta.aprobado ? '' : '_DESAPROBADO';
  return sanitize('Examen_' + tema + '_' + (meta.fecha || '') + '_' + nom + estado);
}

/** Construye el HTML que se convierte a PDF. */
function buildHtml(data, meta) {
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
  var nota = (meta.nota == null) ? '' : meta.nota;
  var aprobado = !!meta.aprobado;
  var color = aprobado ? '#15803d' : '#b91c1c';
  var estadoTxt = aprobado ? 'APROBADO' : 'DESAPROBADO';

  var logo = data.logoB64 ? ('<img src="data:image/png;base64,' + data.logoB64 + '" style="height:44px">') : '<b style="font-size:18px;color:#0c4a6e">ON · Optical Networks</b>';
  var foto = data.fotoB64 ? ('<img src="data:image/jpeg;base64,' + data.fotoB64 + '" style="width:150px;height:auto;border:1px solid #cbd5e1;border-radius:8px">') : '<div style="width:150px;height:120px;border:1px dashed #cbd5e1;border-radius:8px;text-align:center;color:#94a3b8;line-height:120px">Sin foto</div>';
  var firma = data.firmaB64 ? ('<img src="data:image/png;base64,' + data.firmaB64 + '" style="height:80px">') : '<span style="color:#94a3b8">Sin firma</span>';

  var filas = (data.respuestas || []).map(function (r) {
    var bg = r.ok ? '#f0fdf4' : '#fef2f2';
    var mk = r.ok ? '✔' : '✘';
    var mkc = r.ok ? '#16a34a' : '#dc2626';
    return '<tr style="background:' + bg + '">' +
      '<td style="text-align:center;font-weight:bold;color:' + mkc + '">' + r.n + ' ' + mk + '</td>' +
      '<td>' + esc(r.pregunta) +
        '<div style="font-size:10px;color:#334155;margin-top:3px"><b>Marcó:</b> ' + esc(r.marcada) + '</div>' +
        (r.ok ? '' : '<div style="font-size:10px;color:#166534"><b>Correcta:</b> ' + esc(r.correcta) + '</div>') +
      '</td></tr>';
  }).join('');

  return '' +
  '<html><head><meta charset="utf-8"><style>' +
  'body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;font-size:12px;margin:24px}' +
  '.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #0284c7;padding-bottom:8px}' +
  '.hd h1{font-size:16px;margin:0;color:#0c4a6e}' +
  '.meta{width:100%;border-collapse:collapse;margin:14px 0}' +
  '.meta td{padding:5px 8px;border:1px solid #e2e8f0;font-size:12px}' +
  '.meta td.k{background:#f1f5f9;font-weight:bold;color:#0c4a6e;width:130px}' +
  '.nota{float:right;text-align:center;color:#fff;background:' + color + ';border-radius:10px;padding:10px 16px;min-width:120px}' +
  '.nota .n{font-size:30px;font-weight:bold;line-height:1}' +
  '.nota .e{font-size:12px;font-weight:bold;letter-spacing:1px}' +
  'table.q{width:100%;border-collapse:collapse;margin-top:8px}' +
  'table.q td{border:1px solid #e2e8f0;padding:6px 8px;vertical-align:top;font-size:11px}' +
  'table.q td:first-child{width:42px}' +
  '.foot{margin-top:18px;display:flex;justify-content:space-between;align-items:flex-end}' +
  '.firmbox{text-align:center;border-top:1px solid #334155;padding-top:4px;width:240px}' +
  '</style></head><body>' +
  '<div class="hd">' + logo + '<h1>Examen de Inducción SSOMA</h1></div>' +

  '<div class="nota"><div class="e">' + estadoTxt + '</div><div class="n">' + nota + '<span style="font-size:13px">/20</span></div>' +
  '<div style="font-size:10px">' + (meta.aciertos||0) + '/' + (meta.total||0) + ' correctas</div></div>' +

  '<table class="meta">' +
  '<tr><td class="k">Examen</td><td>' + esc(meta.temaTitulo || meta.tema) + '</td></tr>' +
  '<tr><td class="k">Colaborador</td><td><b>' + esc(meta.nombre) + '</b></td></tr>' +
  '<tr><td class="k">DNI</td><td>' + esc(meta.dni) + '</td></tr>' +
  '<tr><td class="k">Área</td><td>' + esc(meta.area) + '</td></tr>' +
  '<tr><td class="k">División</td><td>' + esc(meta.division) + '</td></tr>' +
  '<tr><td class="k">Fecha</td><td>' + esc(meta.fecha) + '</td></tr>' +
  '<tr><td class="k">Nota mínima</td><td>' + esc(meta.notaMinima) + '/20</td></tr>' +
  '</table>' +

  '<h3 style="color:#0c4a6e;margin:6px 0">Detalle de respuestas</h3>' +
  '<table class="q">' + filas + '</table>' +

  '<div class="foot">' +
  '<div><div style="font-size:10px;color:#64748b;margin-bottom:4px">Foto del colaborador</div>' + foto + '</div>' +
  '<div class="firmbox">' + firma + '<div style="font-size:10px;color:#64748b;margin-top:2px">Firma del colaborador</div></div>' +
  '</div>' +

  '<p style="margin-top:16px;font-size:9px;color:#94a3b8;text-align:center">Documento generado automáticamente por el HUB de Exámenes de Inducción · ONI SSOMA · ' + new Date().toLocaleString('es-PE') + '</p>' +
  '</body></html>';
}

/* ================= Registro en Google Sheets (opcional) ================= */
function logToSheet(meta, folderUrl, file) {
  if (!LOG_SHEET_ID) return;
  try {
    var ss = SpreadsheetApp.openById(LOG_SHEET_ID);
    var sh = ss.getSheetByName(LOG_SHEET_NAME) || ss.insertSheet(LOG_SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Recibido','Examen','DNI','Nombre','Área','División','Fecha','Nota','NotaMin','Estado','Aciertos','Total','Carpeta','PDF']);
    }
    sh.appendRow([
      new Date(), meta.temaTitulo || meta.tema || '', meta.dni || '', meta.nombre || '',
      meta.area || '', meta.division || '', meta.fecha || '', meta.nota, meta.notaMinima,
      meta.aprobado ? 'Aprobado' : 'Desaprobado', meta.aciertos, meta.total,
      folderUrl, file.getUrl()
    ]);
  } catch (e) { /* el registro no debe romper la carga */ }
}

function leerRegistros(e) {
  if (!LOG_SHEET_ID) return [];
  try {
    var ss = SpreadsheetApp.openById(LOG_SHEET_ID);
    var sh = ss.getSheetByName(LOG_SHEET_NAME);
    if (!sh || sh.getLastRow() < 2) return [];
    var limit = (e && e.parameter && e.parameter.limit) ? parseInt(e.parameter.limit, 10) : 1000;
    if (!(limit > 0)) limit = 1000;
    var lastRow = sh.getLastRow();
    var startRow = Math.max(2, lastRow - limit + 1);
    var values = sh.getRange(startRow, 1, lastRow - startRow + 1, 14).getValues();
    var out = [];
    for (var i = values.length - 1; i >= 0; i--) {
      var r = values[i];
      out.push({ recibido: fechaTexto(r[0]), examen: r[1], dni: r[2], nombre: r[3], area: r[4],
        division: r[5], fecha: fechaTexto(r[6]), nota: r[7], notaMin: r[8], estado: r[9],
        aciertos: r[10], total: r[11], carpeta: r[12], pdf: r[13] });
    }
    return out;
  } catch (err) { return []; }
}

function fechaTexto(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'UTC', 'yyyy-MM-dd');
  return String(v == null ? '' : v);
}

function json(obj) { return textJson(JSON.stringify(obj)); }
function textJson(str) { return ContentService.createTextOutput(str).setMimeType(ContentService.MimeType.JSON); }
