# HUB de Exámenes de Inducción · ONI SSOMA

> ## 🌐 App en vivo: <https://sebastianzeladagogginz.github.io/examenes-induccion-oni/>
> Repo: `github.com/sebastianzeladagogginZ/examenes-induccion-oni` (rama `main`, raíz `/`).
> Un `git push` a `main` redespliega la app sola en ~1 min.
>
> **Estado:** ✅ App publicada · ✅ Clave de respuestas cargada · ✅ **Backend desplegado y
> conectado** (cuenta `ssomaoni@gmail.com`) · ✅ **Firma en pantalla operativa**. El sistema
> guarda el PDF en Drive automáticamente. Probado de extremo a extremo el 12 ago 2026 (se creó
> carpeta + PDF de prueba). La carpeta raíz **`Exámenes de Inducción 2026`** se crea sola en
> "Mi unidad" de esa cuenta.

App web (PWA) para tomar los **exámenes de inducción SSOMA** de forma digital:
se llena rápido, **se corrige solo**, el colaborador se toma una **foto** y **firma**
en pantalla, y se genera un **PDF de sustento** que se archiva **automáticamente en
Google Drive**, ordenado por:

```
Año › Mes › Día › Área › División › Nombre completo › Examen_....pdf
```

Reutiliza el mismo patrón probado de la app **ATS y Charla de 5 min** (backend Google
Apps Script + carga a Drive) y la paleta del formulario **SEG-F-010** (navy `#0c4a6e`
→ celeste `#0284c7`).

Exámenes incluidos (transcritos de los Word de capacitaciones):

| Tema | N.º preguntas | Nota mínima |
|---|---|---|
| Trabajo en Altura y Manejo de Escaleras | 13 | 18/20 |
| Riesgo Eléctrico | 20 | 18/20 |
| Trabajos en Cámaras / Espacio Confinado | 22 | 18/20 |
| Ergonomía / Riesgo Disergonómico | 24 | 18/20 |
| Instalación de Cableado — Fibra Óptica | 20 | 18/20 |
| **Inducción General ONI 2026** | 23 | **15/20** |

**Nota:** se califica sobre **20**. `nota = aciertos ÷ total × 20`. Aprueba con
**`NOTA_MINIMA`** (por defecto **18/20 = 90 %**). Cada examen puede fijar su propia
nota mínima con el campo **`nota_minima`** en `examenes.js` (Inducción usa **15/20**).

---

## 📁 Archivos

```
6. HUB DE EXAMENES DE INDUCCIÓN/
├── index.html          ← la app (UI, autocorrección, foto, firma, envío)
├── examenes.js         ← BANCO de preguntas + CLAVE de respuestas  ← edita aquí
├── manifest.json       ← PWA
├── sw.js               ← service worker (offline)
├── icon.svg            ← ícono
├── img/                ← imágenes de las preguntas (pictogramas, señales, posturas…)
├── apps-script/
│   └── Codigo.gs       ← BACKEND: genera el PDF y lo guarda en Drive
└── README.md
```

---

## ✅ Puesta en marcha (3 pasos)

### Paso 1 — Cargar la CLAVE de respuestas  ⚠️ imprescindible

Los exámenes vienen **sin la respuesta correcta marcada** (los Word eran exámenes en
blanco). Hasta cargar la clave, todo saldría como incorrecto. Dos formas:

**A) Desde la app (recomendado — se ven las imágenes):**
1. Abre la app y toca el **candado 🔒** (arriba a la derecha). PIN por defecto: **`2026`**
   (cámbialo en `CONFIG.adminPin` de `index.html`).
2. Elige un examen → marca la **respuesta correcta** de cada pregunta (para las de
   ergonomía con imágenes, elige la postura correcta A o B).
3. Pulsa **📤 Exportar clave**, copia el texto y pégalo reemplazando el bloque
   `const CLAVE = {…}` al final de `examenes.js`. Repite para los 5 exámenes.

**B) A mano:** edita el objeto `CLAVE` en `examenes.js`. Cada examen es un arreglo con
la respuesta de cada pregunta **en orden**; índices desde 0 (`0=a, 1=b, 2=c…`).
`single` → un número; `multi` → arreglo de números; `pair` → `'A'` o `'B'`.

### Paso 2 — Desplegar el backend en Drive (Apps Script)

> Igual que hiciste con la app ATS. **Usa la misma cuenta `ssomaoni@gmail.com`.**

1. En Google Drive crea la carpeta raíz **`Exámenes de Inducción 2026`**. Ábrela y copia
   su **ID** de la URL: `https://drive.google.com/drive/folders/`**`ESTE_ES_EL_ID`**.
2. Ve a <https://script.google.com> → **Nuevo proyecto**.
3. Borra todo y pega el contenido de [`apps-script/Codigo.gs`](apps-script/Codigo.gs).
4. Reemplaza `ROOT_FOLDER_ID` por el ID del paso 1.
   *(Opcional)* crea una Google Sheet y copia su ID en `LOG_SHEET_ID` para llevar el
   registro de todos los exámenes rendidos (útil para un panel a futuro).
5. **Implementar › Nueva implementación › Aplicación web**:
   - *Ejecutar como:* **Yo**
   - *Quién tiene acceso:* **Cualquier usuario**
6. Autoriza los permisos y copia la **URL** que termina en `/exec`.
7. Pega esa URL en `CONFIG.endpoint` de `index.html`.

> Si luego editas `Codigo.gs`, re-despliega manteniendo la MISMA URL:
> *Implementar › Gestionar implementaciones › (lápiz) › Versión: «Nueva» › Implementar.*

### Paso 3 — Publicar la app (HTTPS)

La cámara y el service worker **solo funcionan en HTTPS** (o `http://localhost`). Abrir
el `index.html` con doble clic (`file://`) **no** activa la cámara. Opciones:

- **GitHub Pages** (como la app ATS): sube esta carpeta a un repo y actívalo en
  *Settings › Pages*. Las cuadrillas abren la URL y usan *"Añadir a pantalla de inicio"*.
- Cualquier hosting estático HTTPS (Netlify, etc.).

*(Puedo ayudarte a crear el repo y publicarlo cuando quieras.)*

---

## 🧮 ¿Cómo se corrige?

- Al terminar, la app calcula la nota al instante y muestra **APROBADO / DESAPROBADO**
  con el detalle pregunta por pregunta (qué marcó vs. la correcta).
- El backend arma un **PDF** con: logo, datos del colaborador, nota, tabla de respuestas,
  **foto** y **firma**, y lo guarda en la carpeta ordenada. La evidencia queda abierta a
  **lectura con enlace** (los jefes la abren sin "solicitar acceso").
- **Sin conexión:** el examen queda en una cola local y se sube solo al reconectar.
  **Anti-duplicados:** cada envío lleva un `uploadId`; un reintento no duplica el PDF.

## 📂 Resultado en Drive

```
Exámenes de Inducción 2026/
└── 2026/
    └── 2026-08 Agosto/
        └── 2026-08-12/
            └── MANTENIMIENTO/                 ← Área
                └── Normalización de Red/      ← División
                    └── PEREZ QUISPE JUAN CARLOS/   ← Nombre completo
                        └── Examen_Ergonomia_2026-08-12_PEREZ-QUISPE-JUAN-CARLOS.pdf
```

Los desaprobados llevan `_DESAPROBADO` en el nombre del archivo.

---

## ✏️ Editar exámenes, notas o áreas

- **Preguntas / opciones:** en `examenes.js`, objeto `EXAMS`.
- **Nota mínima:** constante `NOTA_MINIMA` en `examenes.js`.
- **Áreas / divisiones y padrón DNI→nombre:** constantes `AREAS` y `ROSTER_INDIVIDUAL`
  en `index.html` (mismo catálogo que la app ATS).
- Tras editar archivos, **sube el número `CACHE` en `sw.js`** para que los teléfonos
  tomen la versión nueva.

---

## ⚠️ Erratas detectadas en los Word originales (por si quieres corregirlas)

Se transcribió con fidelidad, pero el documento fuente tenía algunos errores de
copiar/pegar. Se marcaron con `nota_fuente` en `examenes.js`:

1. **Espacio Confinado, P4:** decía "…medida de control … trabajo **en altura**"
   (copiado de otro examen). Se ajustó a "…trabajo en cámara".
2. **Fibra Óptica, P3:** incluía una opción suelta "e) Usar EPP" que no corresponde.
3. **Fibra Óptica, P13:** el enunciado decía "EPP para trabajos en altura" pero las
   opciones eran **métodos de tendido de cable**. Se ajustó el enunciado.
4. Algunas preguntas de opción múltiple traían "Todas las anteriores / Solo a, b y c",
   por lo que se dejaron como **respuesta única** (elige la mejor). La única que quedó de
   selección múltiple real es Ergonomía P2 (riesgos por esfuerzos).

Revisa estas cuando cargues la clave; si prefieres otra redacción, avísame.

---

## 🛠️ Problemas frecuentes

- **Todo sale incorrecto / nota 0:** falta cargar la **CLAVE** (Paso 1).
- **La cámara no abre:** debe servirse por **HTTPS** y conceder permiso de cámara.
- **"Backend aún no configurado":** falta pegar la URL `/exec` en `CONFIG.endpoint`.
- **No se ve el cambio tras editar:** recarga en línea; si insiste, sube el número
  `CACHE` en `sw.js` o borra los datos del sitio.
- **PIN de administrador:** por defecto `2026` (cámbialo en `CONFIG.adminPin`).
