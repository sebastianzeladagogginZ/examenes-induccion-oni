/* ============================================================================
   HUB DE EXÁMENES DE INDUCCIÓN — ONI (SSOMA)
   Banco de exámenes + CLAVE de respuestas.
   ----------------------------------------------------------------------------
   Este archivo separa los DATOS (preguntas, opciones, imágenes) y la CLAVE de
   respuestas de la lógica de la app (index.html). Para actualizar un examen o
   corregir una pregunta, edita aquí. La CLAVE se puede cargar de dos formas:
     1) Desde la app en "Modo administrador" (candado 🔒 → PIN) marcando la
        respuesta correcta de cada pregunta y pulsando "Exportar clave".
     2) Pegando el objeto CLAVE directamente aquí abajo.
   Escala de nota: nota = aciertos / total * 20.  Aprueba con NOTA_MINIMA, salvo
   que el examen defina su propio campo `nota_minima` (p. ej. Inducción = 15/20).
   ============================================================================ */

const NOTA_MINIMA = 18;          // sobre 20 (18/20 = 90%). Por defecto para todos los exámenes.
                                 // Un examen puede sobreescribirlo con su campo `nota_minima`.

/* Tipos de pregunta:
   - single : una sola respuesta correcta (radio).
   - multi  : varias respuestas correctas (checkbox); acierta solo si marca
              EXACTAMENTE el conjunto correcto.
   - pair   : elige la imagen correcta entre dos (A / B).
   Campo img: ruta a la imagen ilustrativa de la pregunta (opcional).
   Campo nota_fuente: aviso interno (no se muestra al colaborador) sobre erratas
   del documento original, por si deseas corregirlas. */

const EXAMS = {

  /* ===================== 1) TRABAJO EN ALTURA ===================== */
  altura: {
    id: 'altura',
    titulo: 'Trabajo en Altura y Manejo de Escaleras',
    icono: '🪜',
    preguntas: [
      { texto: '¿A partir de qué distancia por encima del suelo se dice que se realizará un trabajo en altura?',
        tipo: 'single', opciones: ['0.80 metros.', '1.00 metros.', '1.80 metros.', '2.00 metros.', '2.80 metros.'] },

      { texto: '¿Cuáles son los riesgos a los que se expone un trabajador al realizar trabajos en altura?',
        tipo: 'single', opciones: ['Contactos eléctricos.', 'Sobre esfuerzos.', 'Exposición a temperaturas ambientales extremas.', 'Posturas inadecuadas o movimientos repetitivos.', 'Caídas a distinto nivel.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es la primera medida de control que uno debe tratar de implementar o ejecutar al evidenciar un riesgo de trabajo en altura?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es la última medida de control que uno debe implementar o ejecutar al evidenciar un riesgo de trabajo en altura?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es el tiempo de vida útil del cinturón de posicionamiento bajo condiciones óptimas de fabricación y uso?',
        tipo: 'single', opciones: ['5 años.', '3 años.', '10 años.', '8 años.', '1 año.'] },

      { texto: 'Marque la opción correcta sobre las consideraciones para realizar el cambio de cinturón de posicionamiento o arnés de seguridad.',
        tipo: 'single', opciones: ['Existencia de corte en correa, faja o bandas.', 'Rotura o deformación de algún elemento metálico principal del cinturón de posicionamiento.', 'Costuras principales del cinturón de posicionamiento descosidas.', 'Rotura de hilos de los estrobos.', 'Problemas para el cierre o apertura de los ganchos de seguridad.', 'Todas las anteriores.', 'Ninguna de las anteriores.'] },

      { texto: 'Con respecto a los primeros auxilios en caso de accidentes en trabajos en altura, marque la opción correcta:',
        tipo: 'single', opciones: ['No mover al herido.', 'Evitar aglomeraciones. No se debe permitir que el accidente se transforme en espectáculo.', 'Conservar la calma.', 'Tranquilizar al herido.', 'Llamar al servicio de emergencia (116 bomberos).', 'Todas las anteriores.', 'Solo a, b y e.'] },

      { texto: '¿Cuáles son los equipos de protección personal empleados para trabajos en altura?',
        tipo: 'single', opciones: ['Casco de seguridad, barbiquejo, cinturón o arnés y zapatillas.', 'Solo cinturón de posicionamiento y zapatos de seguridad.', 'Casco de seguridad, barbiquejo, lentes de seguridad, uniforme, chaleco, cinturón de posicionamiento o arnés, zapatos de seguridad y guantes de seguridad.', 'Solo casco de seguridad con barbiquejo y cinturón de posicionamiento o arnés.', 'Solo cinturón de posicionamiento o arnés.'] },

      { texto: '¿Cuál es el significado de la siguiente imagen?', img: 'img/altura_peldanos.jpg',
        tipo: 'single', opciones: ['Es permitido usar los 3 últimos peldaños.', 'Es permitido usar los 2 últimos peldaños.', 'No está permitido el uso de los 2 últimos peldaños.', 'No está permitido el uso de los 3 últimos peldaños.'] },

      { texto: '¿Cuál es el significado del siguiente pictograma para las escaleras telescópicas?', img: 'img/altura_pictograma.png',
        tipo: 'single', opciones: ['No sobrepasar la carga máxima de uso.', 'No utilizar la escalera sobre una superficie irregular o inestable.', 'No usar la escalera como puente o pasarela.', 'Evitar inclinarse hacia los lados.'] },

      { texto: 'Marque la opción que indique las faltas cometidas en el uso de esta escalera telescópica:', img: 'img/altura_uso_escalera.jpg',
        tipo: 'single', opciones: ['Peligro de electrocución.', 'Parado sobre penúltimo peldaño.', 'Superficie desnivelada y con objetos sobre las bases.', 'Trabajo en fachada sin un personal adicional sosteniendo la escalera en la base.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es la principal causa identificada en todos los accidentes y en la cual no debemos caer a pesar del conocimiento que tengamos de los procesos y de los años de experiencia?',
        tipo: 'single', opciones: ["Trabajar sin EPP's.", 'Trabajar en altura sin cinturón de posicionamiento.', 'No amarrar la escalera.', 'El exceso de confianza.', 'Todas las anteriores.', 'Solo a, b y c.'] },

      { texto: '¿Qué debo hacer si sufro algún incidente o accidente?',
        tipo: 'single', opciones: ['Avisar inmediatamente a mis familiares.', 'Avisar inmediatamente a mi esposa.', 'Avisar inmediatamente a mi jefe inmediato; si él no responde, al número del área de SST, y si este no responde, al número del área de Bienestar Social.', 'Avisar inmediatamente a mis hijos.', 'Avisar inmediatamente al Gerente General.'] }
    ]
  },

  /* ===================== 2) RIESGO ELÉCTRICO ===================== */
  electrico: {
    id: 'electrico',
    titulo: 'Riesgo Eléctrico',
    icono: '⚡',
    preguntas: [
      { texto: '¿Cuáles son los riesgos a los que se expone un trabajador al realizar trabajos cerca de líneas de Baja Tensión y Media Tensión?',
        tipo: 'single', opciones: ['Choque eléctrico con contacto directo o indirecto.', 'Quemaduras por choque eléctrico o por arco eléctrico.', 'Incendios originados por electricidad.', 'Explosiones originadas por electricidad.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es la primera medida de control que uno debe tratar de implementar o ejecutar al evidenciar un trabajo con riesgo eléctrico?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es la última medida de control que uno debe implementar o ejecutar al evidenciar un trabajo con riesgo eléctrico?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: 'Si al realizar un trabajo con riesgo eléctrico no se puede aplicar ninguna medida de control (eliminación, sustitución, control de ingeniería, control administrativo ni EPP), ¿qué se debe realizar inmediatamente?',
        tipo: 'single', opciones: ['Igual realizar el trabajo (instalación/recableado).', 'Aplicar STOP WORK.', 'Solo usar EPP y realizar el trabajo.', 'No informar y proceder con el trabajo.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuáles son fuentes de generación de electricidad?',
        tipo: 'single', opciones: ['Energía Mecánica.', 'Energía Térmica.', 'Energía Nuclear.', 'Energía Eólica.', 'Energía Solar.', 'Todas las anteriores.'] },

      { texto: 'Si la tensión eléctrica es de 0 V a 220/380 V, se categoriza como:',
        tipo: 'single', opciones: ['Línea de Muy Alta Tensión.', 'Línea de Alta Tensión.', 'Línea de Media Tensión.', 'Línea de Baja Tensión.', 'Ninguna de las anteriores.'] },

      { texto: 'Si la tensión eléctrica es superior a 1 KV e igual o inferior a 35 KV, se categoriza como:',
        tipo: 'single', opciones: ['Línea de Muy Alta Tensión.', 'Línea de Alta Tensión.', 'Línea de Media Tensión.', 'Línea de Baja Tensión.', 'Ninguna de las anteriores.'] },

      { texto: 'Si la tensión eléctrica es superior a 35 KV e igual o inferior a 230 KV, se categoriza como:',
        tipo: 'single', opciones: ['Línea de Muy Alta Tensión.', 'Línea de Alta Tensión.', 'Línea de Media Tensión.', 'Línea de Baja Tensión.', 'Ninguna de las anteriores.'] },

      { texto: 'Si la tensión eléctrica es superior a 500 KV, se categoriza como:',
        tipo: 'single', opciones: ['Línea de Muy Alta Tensión.', 'Línea de Alta Tensión.', 'Línea de Media Tensión.', 'Línea de Baja Tensión.', 'Ninguna de las anteriores.'] },

      { texto: 'Marca la oración que defina mejor el concepto de RIESGO ELÉCTRICO:',
        tipo: 'single', opciones: ['Se presenta solo cuando se trabaja a alturas superiores a 1.80 m.', 'Se presenta cuando realizamos falsos movimientos y movimientos repetitivos estando en el poste.', 'Se origina cuando empezamos a realizar el tendido aéreo de fibra óptica.', 'Es la probabilidad de ocurrencia de un contacto directo o indirecto con una instalación eléctrica, pudiendo ocasionar daño personal o material, y/o interrupción de procesos.', 'Ninguna de las anteriores.'] },

      { texto: 'Son equipos de protección individual para realizar trabajos con riesgo eléctrico:',
        tipo: 'single', opciones: ['Casco de seguridad dieléctrico.', 'Guantes de multiflex / badana.', 'Zapatos de seguridad dieléctricos.', 'Detector de tensión eléctrica.', 'Todas las anteriores.'] },

      { texto: 'La distancia mínima de seguridad, según el Código Nacional de Electricidad, para tendidos de telecomunicaciones debajo de líneas eléctricas de MEDIA TENSIÓN debe ser de:',
        tipo: 'single', opciones: ['0.60 m', '0.80 m', '1.20 m', '1.80 m', '2.00 m'] },

      { texto: 'La distancia mínima de seguridad, según el Código Nacional de Electricidad, para tendidos de telecomunicaciones debajo de líneas eléctricas de BAJA TENSIÓN debe ser de:',
        tipo: 'single', opciones: ['0.60 m', '0.80 m', '1.20 m', '1.80 m', '2.00 m'] },

      { texto: 'En la atención de primeros auxilios para choques eléctricos se indica que se debe aplicar el protocolo P.A.S., cuyo significado es:',
        tipo: 'single', opciones: ['Proactividad – Anticipar – Socorrer', 'Prontitud – Acelerar – Subsanar', 'Participar – Actuar – Suspender', 'Prioriza – Anteponer – Susurrar', 'Proteger – Avisar – Socorrer'] },

      { texto: 'Marca la opción correcta sobre primeros auxilios en accidente con choque eléctrico:',
        tipo: 'single', opciones: ['Permanecer sereno, mantener la calma.', 'No actuar si no se sabe cómo proceder.', 'No mover al accidentado, salvo que corra peligro su vida.', 'Evitar aglomeraciones.', 'Llamar al número de emergencia 106 (bomberos).', 'Todas las anteriores.'] },

      { texto: 'En el protocolo PAS, la segunda acción es AVISAR, para lo cual debemos brindar la siguiente información al número de emergencia 106 (bomberos):',
        tipo: 'single', opciones: ['Tipo de accidente ocurrido.', 'Número de trabajadores afectados.', 'Estado del herido o heridos.', 'Dirección exacta del evento.', 'Datos de la persona que llama.', 'Cualquier otra información que se considere relevante.', 'Todas las anteriores.'] },

      { texto: '¿En la siguiente imagen, qué líneas eléctricas se ven?', img: 'img/electrico_lineas.jpg',
        tipo: 'single', opciones: ['Baja Tensión', 'Media Tensión', 'Alta Tensión', 'Muy Alta Tensión', 'Ninguna de las anteriores'] },

      { texto: '¿Cuál es el significado de la siguiente señal de advertencia?', img: 'img/electrico_senal.png',
        tipo: 'single', opciones: ['Riesgo disergonómico.', 'Riesgo biológico.', 'Riesgo de altura.', "Uso obligatorio de EPP's.", 'Riesgo Eléctrico.'] },

      { texto: '¿Cuál es la principal causa identificada en todos los accidentes y en la cual no debemos caer a pesar del conocimiento que tengamos de los procesos y de los años de experiencia?',
        tipo: 'single', opciones: ["Trabajar sin EPP's.", 'Trabajar en altura sin cinturón de posicionamiento.', 'No amarrar la escalera.', 'El exceso de confianza.', 'Todas las anteriores.', 'Solo a, b y c.'] },

      { texto: '¿Qué debo hacer si sufro algún incidente o accidente?',
        tipo: 'single', opciones: ['Avisar inmediatamente a mis familiares.', 'Avisar inmediatamente a mi esposa.', 'Avisar inmediatamente a mi jefe inmediato; si él no responde, al número del área de SST, y si este no responde, al número del área de Bienestar Social.', 'Avisar inmediatamente a mis hijos.', 'Avisar inmediatamente al Gerente General.'] }
    ]
  },

  /* ===================== 3) ESPACIO CONFINADO / CÁMARAS ===================== */
  confinado: {
    id: 'confinado',
    titulo: 'Trabajos en Cámaras / Espacio Confinado',
    icono: '🕳️',
    preguntas: [
      { texto: '¿Qué característica define un espacio confinado?',
        tipo: 'single', opciones: ['Buena ventilación natural.', 'Acceso fácil y amplio.', 'Riesgo de asfixia, ventilación limitada y no diseñado para ocupación continua.', 'Ubicación en espacios abiertos.'] },

      { texto: '¿Cuál es el principal riesgo al ingresar a una cámara subterránea sin ventilación previa?',
        tipo: 'single', opciones: ['Pérdida de herramientas.', 'Daño estructural.', 'Acumulación de gases tóxicos o explosivos.', 'Interferencia electromagnética.'] },

      { texto: '¿Cuál es la primera medida de control que uno debe tratar de implementar o ejecutar al evidenciar un riesgo de trabajo en cámara?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es la última medida de control que uno debe implementar o ejecutar al evidenciar un riesgo de trabajo en cámara?',
        tipo: 'single', nota_fuente: 'El Word original decía "trabajo en altura" (copiado de otro examen).',
        opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Qué documento debe estar autorizado antes del ingreso al espacio confinado?',
        tipo: 'single', opciones: ['Ficha técnica de herramientas.', 'Permiso de trabajo de alto riesgo.', 'Formato de almacén.', 'Parte diario.'] },

      { texto: '¿Qué herramienta se usa para medir la atmósfera interna de una cámara subterránea?',
        tipo: 'single', opciones: ['Manómetro.', 'Nivel.', 'Detector de gases.', 'Termómetro digital.'] },

      { texto: '¿Cuál es el rango seguro de oxígeno para permitir el ingreso?',
        tipo: 'single', opciones: ['15% a 19%.', '19.5% a 23.5%.', '10% a 18%.', '20% a 25%.'] },

      { texto: '¿Cuál es la causa más común de fatiga física en trabajos operativos?',
        tipo: 'single', opciones: ['Mala alimentación.', 'Herramientas nuevas.', 'Esfuerzos físicos, malas posturas y movimientos repetitivos.', 'Uso de cascos.'] },

      { texto: '¿Qué equipo se recomienda durante el ingreso a una cámara subterránea?',
        tipo: 'single', opciones: ['Lentes de sol.', 'Trípode completo, respirador con filtro, línea de vida y arnés.', 'Termómetro.', 'Medidor láser.'] },

      { texto: '¿Qué control corresponde a la jerarquía más efectiva en la prevención de riesgos?',
        tipo: 'single', opciones: ['Uso de EPP.', 'Señalización.', 'Eliminación del peligro.', 'Procedimientos administrativos.'] },

      { texto: '¿Cuál es un ejemplo de control administrativo?',
        tipo: 'single', opciones: ['Uso de respirador con filtro.', 'Instalación de extractores mecánicos.', 'Capacitación en riesgos de altura.', 'Uso de línea de vida.', 'Todas las anteriores.'] },

      { texto: '¿Qué actitud incrementa el riesgo en tareas repetitivas?',
        tipo: 'single', opciones: ['Seguir protocolos.', 'Supervisión constante.', 'Exceso de confianza.', 'Uso correcto de EPP.', 'Todas las anteriores.'] },

      { texto: '¿Qué se debe hacer si no se cuenta con equipo adecuado para levantar más de 25 kg?',
        tipo: 'single', opciones: ['Levantar en equipo.', 'Solicitar ayuda mecánica o reducir peso.', 'Ignorar la carga.', 'Pedir reemplazo.', 'Todas las anteriores.', 'Solo a, b y c.'] },

      { texto: '¿Cuál es una herramienta de palanca usada para abrir cámaras?',
        tipo: 'single', opciones: ['Sierra.', 'Pata de cabra o tortol.', 'Llave inglesa.', 'Todas las anteriores.'] },

      { texto: '¿Qué es lo primero que se debe verificar al usar una pata de cabra?',
        tipo: 'single', opciones: ['Si es de color rojo.', 'Que esté en buen estado.', 'Que pese más de 10 kg.', 'Que tenga mango de madera.'] },

      { texto: "¿Qué medida de control corresponde a 'Controles de ingeniería'?",
        tipo: 'single', opciones: ['Instalación de barandas y dispositivos de seguridad.', 'Capacitación del personal.', 'Uso de arnés con línea de vida.', 'Inspección visual del área.'] },

      { texto: '¿Cuál es un riesgo por movimientos repetitivos?',
        tipo: 'single', opciones: ['Ganas de dormir.', 'Dolor muscular pasajero.', 'Lesiones osteomusculares.', 'Falta de concentración.'] },

      { texto: '¿Qué componente de la espalda permite absorber la compresión entre vértebras?',
        tipo: 'single', opciones: ['Ligamentos lumbares.', 'Discos intervertebrales.', 'Médula espinal.', 'Columna sacra.'] },

      { texto: '¿Qué debe hacerse antes de transportar una carga?',
        tipo: 'single', opciones: ['Flexionar la espalda.', 'Lanzarla suavemente.', 'Planificar el recorrido y revisar la carga.', 'Llevarla sin inspección.'] },

      { texto: 'En la atención de primeros auxilios para lesiones musculoesqueléticas se indica que se debe aplicar el protocolo P.A.S., cuyo significado es:',
        tipo: 'single', opciones: ['Proactividad – Anticipar – Socorrer', 'Prontitud – Acelerar – Subsanar', 'Participar – Actuar – Suspender', 'Prioriza – Anteponer – Susurrar', 'Proteger – Avisar – Socorrer'] },

      { texto: '¿Cuál es la principal causa identificada en todos los accidentes y en la cual no debemos caer a pesar del conocimiento que tengamos de los procesos y de los años de experiencia?',
        tipo: 'single', opciones: ["Trabajar sin EPP's.", 'Trabajar en altura sin cinturón de posicionamiento.', 'No amarrar la escalera.', 'El exceso de confianza.', 'Todas las anteriores.', 'Solo a, b y c.'] },

      { texto: '¿Qué debo hacer si sufro algún incidente o accidente?',
        tipo: 'single', opciones: ['Avisar inmediatamente a mis familiares.', 'Avisar inmediatamente a mi esposa.', 'Avisar inmediatamente a mi jefe inmediato; si él no responde, al número del área de SST, y si este no responde, al número del área de Bienestar Social.', 'Avisar inmediatamente a mis hijos.', 'Avisar inmediatamente al Gerente General.'] }
    ]
  },

  /* ===================== 4) ERGONOMÍA / RIESGO DISERGONÓMICO ===================== */
  ergonomia: {
    id: 'ergonomia',
    titulo: 'Ergonomía / Riesgo Disergonómico',
    icono: '🧍',
    preguntas: [
      { texto: '¿Cómo se define principalmente la ergonomía?',
        tipo: 'single', opciones: ['Ciencia que busca optimizar la interacción entre el trabajador, la máquina y el ambiente de trabajo.', 'Método para aumentar la velocidad de producción sin importar el esfuerzo.', 'Estudio de las costumbres de los trabajadores.'] },

      { texto: '¿Cuáles son los riesgos a los que se expone un trabajador al realizar trabajos donde aplica esfuerzos, cargas y movimientos repetitivos? (puede marcar más de una)',
        tipo: 'multi', opciones: ['Desgarros musculares.', 'Quemaduras.', 'Esguinces.', 'Hemorragias.', 'Resfríos.'] },

      { texto: '¿Cuál es la primera medida de control que uno debe tratar de implementar o ejecutar al evidenciar un trabajo con riesgo disergonómico?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es la última medida de control que uno debe implementar o ejecutar al evidenciar un trabajo con riesgo disergonómico?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: 'Si al realizar un trabajo con riesgo disergonómico no se puede aplicar ninguna medida de control (eliminación, sustitución, control de ingeniería, control administrativo ni EPP), ¿qué se debe realizar inmediatamente?',
        tipo: 'single', opciones: ['Igual realizar el trabajo (instalación/recableado).', 'Aplicar STOP WORK.', 'Solo usar EPP y realizar el trabajo.', 'No informar y proceder con el trabajo.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuál de las siguientes oraciones define exactamente a la ERGONOMÍA?',
        tipo: 'single', opciones: ['Es la ciencia que estudia la estructura y forma de los seres vivos y las relaciones entre las diversas partes que los constituyen.', 'Es la ciencia que estudia la conducta humana y los procesos mentales.', 'Es la ciencia que busca optimizar la interacción entre el trabajador, máquina y ambiente de trabajo, con el fin de adecuar los puestos, ambientes y la organización del trabajo a las capacidades y limitaciones de los trabajadores, minimizar el estrés y la fatiga e incrementar el rendimiento y la seguridad.', 'Es la ciencia que estudia los métodos más eficaces para satisfacer las necesidades humanas materiales mediante el empleo de bienes escasos.'] },

      { texto: '¿Cuál de las siguientes oraciones define exactamente LA FATIGA?',
        tipo: 'single', opciones: ['Se da cuando un trabajador sufre una lumbalgia.', 'Se da cuando un trabajador tiene la columna desviada.', 'Se da cuando un trabajador tiene sobrepeso.', 'Se da cuando un trabajador emplea energía y esfuerzo por encima de sus posibilidades para realizar una actividad laboral.'] },

      { texto: '¿Cuál de las siguientes oraciones define exactamente el concepto de TRASTORNO MÚSCULO-ESQUELÉTICO?',
        tipo: 'single', opciones: ['Son lesiones a nivel ocular.', 'Son lesiones superficiales de la piel.', 'Son lesiones en las uñas.', 'Son lesiones de músculos, tendones, nervios y articulaciones que se localizan con más frecuencia en cuello, espalda, hombros, codos, muñecas y manos.', 'Son lesiones de las fosas nasales.'] },

      { texto: 'Marque la opción que explique las recomendaciones que debemos tener en cuenta para evitar las POSTURAS FORZADAS:',
        tipo: 'single', opciones: ['Evitar mantener una misma postura durante un tiempo prolongado.', 'Alternar las posturas de pie-sentado siempre que sea posible.', 'Evitar la realización de flexión, hiperextensión y torsión del tronco.', 'Mantener el cuello en posición neutral, sin rotaciones, flexiones, extensiones ni inclinaciones.', 'Todas las anteriores.'] },

      { texto: 'Son factores causantes de lumbalgia:',
        tipo: 'single', opciones: ['Factores individuales: mala postura, vida sedentaria, exceso de peso.', 'Factores psicosociales: monotonía del trabajo, depresión, estrés.', 'Factores ambientales: exposición a vibraciones.', 'Todas las anteriores.'] },

      /* --- Pregunta original de PARES DE IMÁGENES → 5 preguntas tipo pair --- */
      { texto: 'Manejo de carga y postura — Postura 1: marque la imagen que indica la manera CORRECTA.',
        tipo: 'pair', pair: { A: 'img/ergo_p1_A.jpg', B: 'img/ergo_p1_B.jpg' } },
      { texto: 'Manejo de carga y postura — Postura 2: marque la imagen que indica la manera CORRECTA.',
        tipo: 'pair', pair: { A: 'img/ergo_p2_A.jpg', B: 'img/ergo_p2_B.jpg' } },
      { texto: 'Manejo de carga y postura — Postura 3: marque la imagen que indica la manera CORRECTA.',
        tipo: 'pair', pair: { A: 'img/ergo_p3_A.jpg', B: 'img/ergo_p3_B.jpg' } },
      { texto: 'Manejo de carga y postura — Postura 4: marque la imagen que indica la manera CORRECTA.',
        tipo: 'pair', pair: { A: 'img/ergo_p4_A.jpg', B: 'img/ergo_p4_B.jpg' } },
      { texto: 'Manejo de carga y postura — Postura 5: marque la imagen que indica la manera CORRECTA.',
        tipo: 'pair', pair: { A: 'img/ergo_p5_A.jpg', B: 'img/ergo_p5_B.jpg' } },

      { texto: '¿Cuál es la carga máxima que debe cargar un varón bajo condiciones normales?',
        tipo: 'single', opciones: ['15 kg', '40 kg', '20 kg', '25 kg'] },

      { texto: '¿Cuál es la carga máxima que debe cargar una mujer bajo condiciones normales?',
        tipo: 'single', opciones: ['15 kg', '40 kg', '20 kg', '24 kg', '9 kg'] },

      { texto: '¿Cuáles son los riesgos asociados al uso de HERRAMIENTAS MANUALES?',
        tipo: 'single', opciones: ['Golpes y cortes en manos.', 'Lesiones oculares.', 'Golpes en diferentes partes del cuerpo.', 'Esguinces por sobreesfuerzos.', 'Todas las anteriores.', 'Solo a y c.'] },

      { texto: '¿Cuál es el significado de IOS?',
        tipo: 'single', opciones: ['Instructivo de Operación para Salud.', 'Iniciación Operativa Segura.', 'Indicación de Operación Social.', 'Instructivo de Operación Segura.', 'Instructivo de Operación Sensacional.'] },

      { texto: 'En la atención de primeros auxilios para lesiones musculoesqueléticas se indica que se debe aplicar el protocolo P.A.S., cuyo significado es:',
        tipo: 'single', opciones: ['Proactividad – Anticipar – Socorrer', 'Prontitud – Acelerar – Subsanar', 'Participar – Actuar – Suspender', 'Prioriza – Anteponer – Susurrar', 'Proteger – Avisar – Socorrer'] },

      { texto: 'Marca la opción correcta sobre primeros auxilios en accidentes:',
        tipo: 'single', opciones: ['Permanecer sereno, mantener la calma.', 'No actuar si no se sabe cómo proceder.', 'No mover al accidentado, salvo que corra peligro su vida.', 'Evitar aglomeraciones.', 'Llamar al número de emergencia 116 (bomberos).', 'Todas las anteriores.'] },

      { texto: 'En el protocolo PAS, la segunda acción es AVISAR, para lo cual debemos brindar la siguiente información al número de emergencia 116 (bomberos):',
        tipo: 'single', opciones: ['Tipo de accidente ocurrido.', 'Número de trabajadores afectados.', 'Estado del herido o heridos.', 'Dirección exacta del evento y datos de la persona que llama.', 'Cualquier otra información que se considere relevante.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es la principal causa identificada en todos los accidentes y en la cual no debemos caer a pesar del conocimiento que tengamos de los procesos y de los años de experiencia?',
        tipo: 'single', opciones: ["Trabajar sin EPP's.", 'Trabajar en altura sin cinturón de posicionamiento.', 'No amarrar la escalera.', 'El exceso de confianza.', 'Todas las anteriores.'] },

      { texto: '¿Qué debo hacer si sufro algún incidente o accidente?',
        tipo: 'single', opciones: ['Avisar inmediatamente a mis familiares.', 'Avisar inmediatamente a mi esposa.', 'Avisar inmediatamente a mi jefe inmediato; si él no responde, al número del área de SST, y si este no responde, al número del área de Bienestar Social.', 'Avisar inmediatamente a mis hijos.', 'Avisar inmediatamente al Gerente General.'] }
    ]
  },

  /* ===================== 5) INSTALACIÓN DE CABLEADO / FIBRA ÓPTICA ===================== */
  fibra: {
    id: 'fibra',
    titulo: 'Instalación de Cableado — Fibra Óptica',
    icono: '🔌',
    preguntas: [
      { texto: '¿Qué es la fibra óptica?',
        tipo: 'single', opciones: ['Un cable de cobre blindado.', 'Un sistema de antenas.', 'Un filamento de vidrio que transmite luz.', 'Una corriente eléctrica de bajo voltaje.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es el principio físico que permite la transmisión de luz en la fibra óptica?',
        tipo: 'single', opciones: ['Refracción atmosférica.', 'Reflexión interna total.', 'Reacción fotoeléctrica.', 'Expansión térmica.', 'Todas las anteriores.'] },

      { texto: '¿Cuál es la principal diferencia entre fibra monomodo y multimodo?',
        tipo: 'single', nota_fuente: 'La opción "e) Usar EPP" viene del Word original (errata).',
        opciones: ['La velocidad de instalación.', 'El número de cables.', 'La cantidad de haces de luz que transporta.', 'El color del revestimiento.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Qué tipo de fibra se utiliza para largas distancias y altas velocidades?',
        tipo: 'single', opciones: ['Multimodo.', 'Simplex.', 'Monomodo.', 'Loose tube.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué parte de la fibra óptica mantiene la luz confinada?',
        tipo: 'single', opciones: ['Núcleo.', 'Cubierta exterior.', 'Revestimiento (cladding).', 'Kevlar.', 'Chaqueta.'] },

      { texto: '¿Qué es un OLT?',
        tipo: 'single', opciones: ['Dispositivo de seguridad personal.', 'Empalmadora manual.', 'Equipo que envía datos ópticos desde la central.', 'Conector de red coaxial.', 'Todas las anteriores.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué herramienta permite fusionar dos fibras permanentemente?',
        tipo: 'single', opciones: ['OTDR.', 'Pinza de presión.', 'Fusionadora.', 'Medidor de voltaje.', 'Todas las anteriores.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué equipo analiza fallas y genera trazas ópticas?',
        tipo: 'single', opciones: ['Multímetro.', 'Cortadora de fibra.', 'Mini OTDR.', 'Router óptico.', 'Solo a y c.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué se debe hacer antes de usar una empalmadora de fusión?',
        tipo: 'single', opciones: ['Cortar la fibra sin pelar.', 'Empalmar directamente sin limpiar.', 'Pelar, limpiar y cortar la fibra con precisión.', 'Golpear la fibra para ablandarla.', 'Todas las anteriores.', 'Solo b y d.'] },

      { texto: '¿Qué se usa para proteger los empalmes una vez realizados?',
        tipo: 'single', opciones: ['Cinta aislante.', 'Tubo termocontraíble.', 'Pegamento plástico.', 'Gel conductor.', 'Todas las anteriores.', 'Solo a y c.'] },

      { texto: '¿Qué se mide con un OTDR?',
        tipo: 'single', opciones: ['Corriente eléctrica en la fibra.', 'Presión interna del cable.', 'Pérdidas ópticas, longitud y fallas.', 'Velocidad del viento en la zanja.', 'La velocidad de la luz.', 'Todas las anteriores.'] },

      { texto: '¿Qué EPP no debe faltar al trabajar con fibra óptica en postes?',
        tipo: 'single', opciones: ['Casco, lentes, guantes, arnés y chaleco.', 'Mascarilla quirúrgica.', 'Pantalones cortos.', 'Zapatos de tela.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuáles son los métodos de instalación / tendido de cable?',
        tipo: 'single', nota_fuente: 'En el Word el enunciado decía "EPP para trabajos en altura" pero las opciones son métodos de tendido; se ajustó el enunciado para que tenga sentido.',
        opciones: ['Pegado con cinta.', 'Por soplado de aire en ductos.', 'Conducción por corriente.', 'Empuje con varillas metálicas.', 'Solo cinturón de posicionamiento o arnés.'] },

      { texto: '¿Cuál es una mala praxis en instalaciones?',
        tipo: 'single', opciones: ['Usar ferretería recomendada.', 'Sujetar el cable con hebillas seguras.', 'No usar templadores ni sujetadores adecuados.', 'Etiquetar los extremos del cable.'] },

      { texto: '¿Qué significa FTTH?',
        tipo: 'single', opciones: ['Fibra hasta la torre.', 'Fibra hasta el hogar.', 'Fibra total horizontal.', 'Fase terminal de hardware.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué se debe hacer antes de subir a un poste?',
        tipo: 'single', opciones: ['Solo usar escaleras de aluminio.', 'No usar protección si es por poco tiempo.', 'Señalizar, asegurar la escalera y usar arnés.', 'Subir rápidamente para ahorrar tiempo.'] },

      { texto: '¿Qué representa la atenuación en la fibra?',
        tipo: 'single', opciones: ['Un aumento de potencia.', 'Un tipo de conector.', 'La pérdida de señal óptica por distancia o empalmes.', 'La temperatura del cable.'] },

      { texto: '¿Cuál es la principal causa identificada en todos los accidentes y en la cual no debemos caer a pesar del conocimiento que tengamos de los procesos y de los años de experiencia?',
        tipo: 'single', opciones: ["Trabajar sin EPP's.", 'Trabajar en altura sin cinturón de posicionamiento.', 'No amarrar la escalera.', 'El exceso de confianza.', 'Todas las anteriores.', 'Solo a, b y c.'] },

      { texto: '¿Cuál es la primera medida de control que uno debe tratar de implementar o ejecutar al evidenciar un riesgo de trabajo en altura?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] },

      { texto: '¿Cuál es la última medida de control que uno debe implementar o ejecutar al evidenciar un riesgo de trabajo en altura?',
        tipo: 'single', opciones: ['Eliminarlo.', 'Sustituirlo.', 'Aplicar un control de ingeniería.', 'Aplicar un control administrativo.', 'Usar Equipos de Protección Personal.'] }
    ]
  },

  /* ===================== 6) INDUCCIÓN GENERAL ONI 2026 ===================== */
  /* Examen transversal (altura, cámaras, fibra, IPERC, STOP WORK, política de
     alcohol, SCTR, principios ONI, etc.). El Word indica nota mínima 15/20 (los
     otros exámenes aprueban con 18/20) → se define nota_minima por examen.
     4 preguntas eran de DESARROLLO en el Word (Ley SST, peligros, EPP, STOP WORK);
     se convirtieron a opción múltiple para que la app las autocalifique. */
  induccion: {
    id: 'induccion',
    titulo: 'Inducción General ONI 2026',
    icono: '🎓',
    nota_minima: 15,
    preguntas: [
      { texto: '¿Cuál es la Ley y Reglamento de Seguridad y Salud en el Trabajo?',
        tipo: 'single', nota_fuente: 'En el Word era pregunta de desarrollo; convertida a opción múltiple.',
        opciones: ['Ley N° 29783 y su Reglamento D.S. N° 005-2012-TR.', 'Ley N° 30222 y su Reglamento D.S. N° 006-2014-TR.', 'Ley N° 28806, Ley General de Inspección del Trabajo.', 'Ley N° 29088 de Seguridad Vial.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuáles son peligros a los que se expone el técnico de telecomunicaciones de Optical Networks?',
        tipo: 'single', nota_fuente: 'En el Word era "Mencione 4 peligros" (desarrollo); convertida a opción múltiple.',
        opciones: ['Caídas a distinto nivel (trabajos en altura).', 'Contacto eléctrico con líneas de baja o media tensión.', 'Atropello o tránsito vehicular al trabajar en vía pública.', 'Asfixia o gases tóxicos en espacios confinados (cámaras).', 'Todas las anteriores.'] },

      { texto: '¿A qué altura y número de peldaño se considera Trabajo en Altura?',
        tipo: 'single', opciones: ['1.50 m / 4.º peldaño.', '1.78 m / 5.º peldaño.', '1.80 m / 6.º peldaño.', '1.90 m / 7.º peldaño.', '1.20 m / 6.º peldaño.'] },

      { texto: '¿Cuáles son los EPP básicos del técnico de telecomunicaciones de Optical Networks?',
        tipo: 'single', nota_fuente: 'En el Word era "Mencione 5 EPP" (desarrollo); convertida a opción múltiple.',
        opciones: ['Casco de seguridad con barbiquejo, lentes de seguridad y guantes.', 'Zapatos de seguridad y uniforme con cinta reflectiva.', 'Arnés o cinturón de posicionamiento para trabajos en altura.', 'Solo casco y guantes.', 'a, b y c.'] },

      { texto: '¿Según la norma, cuál es la carga máxima que puede cargar una persona en ONI?',
        tipo: 'single', opciones: ['24 kg = 1250 m de fibra óptica.', '25 kg = 1250 m de fibra óptica.', '20 kg = 1150 m de fibra óptica.', '15 kg = 850 m de fibra óptica.'] },

      { texto: '¿Cuáles son los documentos que siempre debe llevar el técnico de telecomunicaciones?',
        tipo: 'single', opciones: ['DNI, fotocheck y SCTR.', 'DNI y licencia de moto.', 'Solo fotocheck.', 'Partida de nacimiento y certificado de estudios.'] },

      { texto: 'Todo trabajo de alto riesgo debe realizarse como mínimo con:',
        tipo: 'single', opciones: ['1 trabajador.', '2 trabajadores.', '1 trabajador y un peatón.', 'Ninguna de las anteriores.'] },

      { texto: '¿Qué es un IPERC?',
        tipo: 'single', opciones: ['Es un libro de Excel.', 'Es la identificación de personas.', 'Es la Identificación de Peligros, Evaluación de Riesgos y Controles.', 'Es la evaluación de riesgos peligrosos identificados.'] },

      { texto: '¿Qué es peligro?',
        tipo: 'single', opciones: ['Fuente, situación o acto que pueda ocasionar un potencial daño.', 'Probabilidad de que ocurra un accidente.', 'Probabilidad de que un peligro se materialice ocasionalmente.', 'Todas las anteriores.'] },

      { texto: '¿Qué es un riesgo?',
        tipo: 'single', opciones: ['Combinación de la probabilidad de que ocurra un evento o explosión peligroso temporal.', 'Todo aquello que te puede causar daño.', 'Es la probabilidad de que un peligro se materialice.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuál es el objetivo de la charla de 5 minutos?',
        tipo: 'single', opciones: ['Dar instrucciones.', 'Compartir conocimiento.', 'Corregir malas prácticas.', 'Compartir experiencias.', 'Todas las anteriores.'] },

      { texto: '¿El permiso de trabajo y el ATS lo debo firmar únicamente cuándo?',
        tipo: 'single', opciones: ['Cuando he finalizado mi labor.', 'Durante la ejecución de la actividad.', 'Antes de iniciar la actividad.', 'No debe firmarlo.'] },

      { texto: '¿Quién debe comunicar el accidente?',
        tipo: 'single', opciones: ['El dueño de casa.', 'Los peatones.', 'Los compañeros de trabajo.', 'El técnico lesionado, salvo que esté incapacitado.', 'c y d.'] },

      { texto: '¿Cuál es la definición de SCTR?',
        tipo: 'single', opciones: ['Seguro Complementario para Trabajos de Alto Riesgo.', 'Seguro contra tareas riesgosas.', 'Sanción contra trabajos riesgosos.', 'Sindicato de trabajadores.', 'Ninguna de las anteriores.'] },

      { texto: 'Inspeccionar diariamente el EPP antes de cada uso es responsabilidad de:',
        tipo: 'single', opciones: ['El encargado del almacén.', 'El supervisor de seguridad.', 'El supervisor de campo.', 'El trabajador al que se le asignó el EPP.', 'Ninguna de las anteriores.'] },

      { texto: 'Durante el ascenso y descenso de la escalera telescópica, se debe mantener:',
        tipo: 'single', opciones: ['2 puntos de apoyo.', '3 puntos de apoyo.', '4 puntos de apoyo.', '5 puntos de apoyo.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuáles son los principios de ONI?',
        tipo: 'single', opciones: ['Seguridad / calidad / producción.', 'Actitud / espacio / visibilidad.', 'Sálvese quien pueda.', 'No los identifico.', 'Ninguna de las anteriores.'] },

      { texto: '¿Cuál es la capacidad de carga de una escalera en Optical Networks?',
        tipo: 'single', nota_fuente: 'Confirmado por ONI (14 ago 2026): 125 kg.',
        opciones: ['120 kg', '125 kg', '130 kg', '100 kg', '135 kg'] },

      { texto: '¿Cómo se activa la Política de STOP WORK en ONI?',
        tipo: 'single', nota_fuente: 'En el Word era pregunta de desarrollo; convertida a opción múltiple.',
        opciones: ['Deteniendo de inmediato la tarea al identificar un acto o condición insegura, sin temor a represalias, e informando al supervisor.', 'Solo el supervisor puede detener el trabajo.', 'Terminando primero la tarea y luego reportando.', 'Únicamente cuando ya ocurrió un accidente.', 'Ninguna de las anteriores.'] },

      { texto: 'Según el Reglamento Interno de Trabajo, ¿cuál es la tolerancia de alcohol y drogas en ONI?',
        tipo: 'single', opciones: ['Tolerancia 0.00 gramos de alcohol por litro de sangre.', 'Tolerancia 0.50 gramos de alcohol por litro de sangre.', 'Tolerancia 0.01 gramos de alcohol por litro de sangre.', 'Tolerancia 0.10 gramos de alcohol por litro de sangre.', 'Ninguna de las anteriores.'] },

      { texto: '¿Se puede fusionar al interior de una cámara?',
        tipo: 'single', nota_fuente: 'Confirmado por ONI (14 ago 2026): la respuesta correcta es NO.',
        opciones: ['No.', 'Sí.', 'Solo si la cámara está sin agua acumulada.', 'Le pregunto a mi supervisor.', 'Ninguna de las anteriores.'] },

      { texto: 'Para realizar trabajos en cámaras se debe esperar un tiempo mínimo de:',
        tipo: 'single', nota_fuente: 'Confirmado por ONI (14 ago 2026): 10 minutos.',
        opciones: ['10 minutos.', '15 minutos.', '5 minutos.', '20 minutos.', 'N/A.'] },

      { texto: '¿Qué significa PTAR?',
        tipo: 'single', opciones: ['Permiso de Trabajo de Alto Residual.', 'Permiso de Trabajo de Alto Riesgo.', 'Permiso de Trabajo de Alto Rigor.', 'Permiso de Trabajo de Altura Regular.', 'Ninguna de las anteriores.'] }
    ]
  }
};

/* ============================================================================
   CLAVE DE RESPUESTAS  (respuestas correctas)
   ----------------------------------------------------------------------------
   Formato: por cada examen, un arreglo con la respuesta correcta de cada
   pregunta EN ORDEN. Los índices empiezan en 0 (0 = opción "a", 1 = "b", ...).
     · single : un número.            Ej. 2      → opción "c"
     · multi  : un arreglo de números. Ej. [0,2]  → opciones "a" y "c"
     · pair   : la cadena 'A' o 'B'.
   Si un valor es null, esa pregunta AÚN NO tiene clave (no se califica todavía).
   Puedes llenar esta clave desde la app (Modo administrador 🔒 → Exportar clave)
   y pegar el resultado aquí, o editarla a mano.
   ============================================================================ */

const CLAVE = {
  // 0=a, 1=b, 2=c, 3=d, 4=e, 5=f, 6=g   ·   multi=[..]   ·   pair='A'/'B'
  altura:    [2, 5, 0, 4, 0, 5, 5, 2, 3, 2, 4, 3, 2],
  electrico: [4, 0, 4, 1, 5, 3, 2, 1, 0, 3, 4, 3, 2, 4, 5, 6, 0, 4, 3, 2],
  confinado: [2, 2, 0, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 0, 2, 1, 2, 4, 3, 2],
  ergonomia: [0, [0,2], 0, 4, 1, 2, 3, 3, 4, 3, 'A', 'B', 'B', 'A', 'B', 3, 0, 4, 3, 4, 5, 5, 3, 2],
  fibra:     [2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 1, 2, 1, 2, 2, 3, 0, 4],
  induccion: [0, 4, 2, 4, 1, 0, 1, 2, 0, 2, 4, 2, 4, 0, 3, 1, 0, 1, 0, 0, 0, 0, 1]
};
/* Nota sobre respuestas de criterio técnico (definidas; cámbialas aquí o desde
   el Modo administrador 🔒 si en tu operación aplica otro criterio):
   · Eléctrico P12 (distancia mín. debajo de MEDIA tensión) = 1.80 m
   · Eléctrico P13 (distancia mín. debajo de BAJA tensión)  = 1.20 m
   · Eléctrico P17 (qué líneas se ven en la foto)           = Baja Tensión
   · Fibra P5  (parte que mantiene la luz confinada)        = Revestimiento (cladding)
   · Fibra P13 (métodos de tendido de cable)                = Por soplado de aire en ductos
   · Inducción P18 (capacidad de carga de la escalera ONI)  = 125 kg      (confirmado ONI)
   · Inducción P21 (¿fusionar dentro de una cámara?)        = No          (confirmado ONI)
   · Inducción P22 (tiempo mínimo de espera en cámaras)     = 10 minutos  (confirmado ONI) */

/* Exportación para el navegador */
if (typeof window !== 'undefined') { window.EXAMS = EXAMS; window.CLAVE = CLAVE; window.NOTA_MINIMA = NOTA_MINIMA; }
