const express = require('express');
const multer  = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Document, Table, TableRow, TableCell, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, ImageRun, WidthType, TableLayoutType } = require("docx");
const nodemailer = require('nodemailer');
const storage = multer.memoryStorage(); // Esto guarda los datos en memoria
const upload = multer({ storage: storage }).array('imagenHorario', 1);
const app = express();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexanderxz96@gmail.com',
        pass: 'hnqt wnnn ibre tymw!'
    }
});
// Define el middleware al principio
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/descargas', express.static(path.join(__dirname, 'descargas')));
app.use(bodyParser.text({ limit: '10mb', type: 'text/plain' }));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
function crearTitulo(titulo) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.TITLE,
        children: [
            new TextRun({
                text: titulo,
                bold: true,
                size: 48,  // tamaño grande para el título
            }),
        ],
    });
}

function Realista() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Realista",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" }) // Salto de línea
        ],
    });
}

function Realista1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere actividades físicas que requieren habilidades, fuerza, coordinación, etc.",
                size: 24
            }),
            new TextRun({ text: "\n" }) // Salto de línea
        ],
    });
}

function Realista2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tímido, Auténtico, Persistente, Estable, Conformista y Práctico.",
                size: 24
            }),
            new TextRun({ text: "\n" }) // Salto de línea
        ],
    });
}

function Realista3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Mecánico, Operador de Perforadoras, Agricultor.",
                size: 24
            }),
            new TextRun({ text: "\n" }) // Salto de línea
        ],
    });
}

function Intelectual() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Intelectual",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Intelectual1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere actividades de pensar, organizar y comprender.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Intelectual2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Analítico, Original, Curioso, Independiente.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Intelectual3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Biólogo, Economista, Matemático, Reportero.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}


function Social() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Social",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Social1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere actividades que ayudan a formar a otros.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Social2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Sociable, Amigable, Cooperativo, Comprensivo.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Social3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Trabajador Social, Profesor, Asesor, Psicólogo Clínico.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Convencional() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Convencional",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Convencional1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere actividades ordenadas, definidas y reglamentadas.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Convencional2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Conformista, Eficiente, Práctico, Poco Imaginativo, Inflexible.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Convencional3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Contador, Gerente de Empresa, Cajero de Banco, Archivista.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Emprendedor() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Emprendedor",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Emprendedor1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere actividades verbales que ofrecen la posibilidad de influir en los demás y adquirir poder.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Emprendedor2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Autoconfianza, Ambicioso, Energía, Dominante.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Emprendedor3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Abogado, Corredor de Bienes Raíces, Especialista en Relaciones Públicas, Gerente de una Pequeña Empresa.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Artistico() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Tipo: Artístico",
                bold: true,
                size: 28
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Artistico1() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Prefiere las actividades ambiguas y poco sistemáticas que permiten la expresión creativa.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Artistico2() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Imaginativo, Desordenado, Idealista, Emotivo, Poco Práctico.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function Artistico3() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "Pintor, Músico, Escritor, Decorador de Interiores.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}


function crearCCFM() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "CIENCIAS FÍSICO - MATEMÁTICAS (CCFM)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nPresenta actividades relacionadas con el interés técnico y matemático, investigación de la energía, reparación de objetos mecánicos, y manejo de máquinas y herramientas.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearCCSS() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "CIENCIAS SOCIALES (CC.SS.)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nPresenta actividades relacionadas con el bienestar social, formación educativa, y fortalecimiento de lazos sociales.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearCCNA() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "CIENCIAS NATURALES (CCNA)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nActividades de experimentación y manipulación en campos como anatomía, fisiología, química, agricultura y zootecnia.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearCCCO() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "CIENCIAS DE LA COMUNICACIÓN (CCCO)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nEnfocadas en la búsqueda y transmisión objetiva de información, incluyendo redacción de crónicas, reportajes fotográficos, y publicidad.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearArte() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "ARTES (ARTE)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nActividades creativas como dibujo, canto, baile, diseño, pintura, y decoración, enfocadas en la armonía y composición artística.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearBuro() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "BUROCRACIA (BURO)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nInvolucra actividades como catalogación y clasificación de material, gestión de información y atención en oficinas y centros comerciales.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearCCEP() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "CIENCIAS ECONÓMICAS POLÍTICAS (CCEP)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nEstudio de economía y política, incluyendo temas como oferta y demanda, formas de gobierno, y análisis cuantitativo de datos.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearIIAA() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "INSTITUTOS ARMADOS (IIAA)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nRelacionado con la vida militar, manejo y conservación de armamento, y cumplimiento de órdenes en Fuerzas Policiales y Armadas.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearFina() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "FINANZAS (FINA)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nActividades vinculadas a la contabilidad, organización de presupuestos, y gestión financiera en empresas e industrias.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearLing() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "LINGÜÍSTICA (LING)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nEstudio y traducción de idiomas, literatura, escritura creativa, incluyendo poesía y prosa.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}

function crearJuri() {
    return new Paragraph({
        children: [
            new TextRun({
                text: "JURISPRUDENCIA (JURI)",
                bold: true,
                size: 28
            }),
            new TextRun({
                text: "\nEnfocado en el estudio legal, defensa en tribunales, análisis legislativo, y asesoramiento jurídico.",
                size: 24
            }),
            new TextRun({ text: "\n" })
        ],
    });
}



function crearSeparador() {
    return new Paragraph({
        children: [
            new TextRun({ text: '\n' }) // Un párrafo con un salto de línea para separar secciones
        ],
    });
}

function crearPreguntaRespuesta(textoPregunta, respuesta) {
    return new Paragraph({
        children: [
            new TextRun({ text: textoPregunta, bold: true, size: 32 }),
            new TextRun({ text: '\n' }), // Inserta un salto de línea aquí
            new TextRun({ text: respuesta, size: 32 }), // Asegúrate de que la respuesta esté en el mismo tamaño de fuente
        ],
    });
}
function crearResultado(nombre, valor) {
    let resultadoTexto;
    if (nombre === 'Valor Vera') {
        resultadoTexto = `Valor: ${valor}. ` + (valor >= 6 ? 'La prueba no es verídica' : 'La prueba es verídica');
    } else if (nombre === 'Valor Cons') {
        // Asegúrate de que 'valor' sea un número antes de sumarle 11
        const valorOriginal = Number(valor);
        const valorAbsoluto = Math.abs(valorOriginal);
        resultadoTexto = `Valor original: ${valorOriginal}. Valor absoluto: ${valorAbsoluto}. ` + (valorAbsoluto >= 6 ? 'La prueba no es consistente' : 'La prueba es consistente');
    } else {
        resultadoTexto = valor.toString();
    }
    return new Paragraph({
        children: [
            new TextRun({ text: nombre + ": ", bold: true, size: 32 }),
            new TextRun({ text: `${resultadoTexto}\n`, size: 32 }),
        ],
    });
}
// Función para el título de la categoría
function crearTituloCategoria(categoria) {
    return new Paragraph({
        children: [
            new TextRun({ text: `${categoria}: `, bold: true, size: 32 }),
        ],
    });
}

// Funciones para cada elección
function crearPrimeraEleccion(valor1) {
    return new Paragraph({
        children: [
            new TextRun({ text: `Primera Elección: ${valor1}, `, size: 28 }),
        ],
    });
}

function crearSegundaEleccion(valor2) {
    return new Paragraph({
        children: [
            new TextRun({ text: `Segunda Elección: ${valor2}, `, size: 28 }),
        ],
    });
}

function crearTerceraEleccion(valor3) {
    return new Paragraph({
        children: [
            new TextRun({ text: `Tercera Elección: ${valor3}\n`, size: 28 }),
        ],
    });
}

function crearSubtitulo(subtitulo) {
    return new Paragraph({
        alignment: AlignmentType.CENTER,
        heading: HeadingLevel.HEADING_2,
        children: [
            new TextRun({
                text: subtitulo,
                bold: true,
                size: 36,  // tamaño más pequeño que el título principal
            }),
        ],
    });
}
function obtenerYProcesarResultados(categoria, req) {
    const resultado = req.body[`resultado${categoria}`];
    if (!resultado) return 'No Disponible';
    try {
        const resultadoParsed = JSON.parse(resultado);
        // Añadir un salto de línea entre 'Percentil' y 'Significado'
        return `Percentil: ${resultadoParsed.percentil}\nSignificado: ${resultadoParsed.significado}`;
    } catch (e) {
        console.error(`Error al procesar resultado para ${categoria}:`, e);
        return 'Error en el procesamiento';
    }
}
function crearInformacionGenero(genero) {
    return new Paragraph({
        children: [
            new TextRun({ text: "Género seleccionado: ", bold: true, size: 32 }),
            new TextRun({ text: `${genero}\n`, size: 32 }),
        ],
    });
}
const obtenerValor = (campo, requestBody, defaultValue = 'N/A') => requestBody[campo] || defaultValue;
app.post('/procesar', upload, (req, res) => {
    try {
        console.log("Inicio de la función /procesar");
        console.log(req.body);

        const generoSeleccionado = req.body.generoSeleccionado;
        const seccionGenero = [crearInformacionGenero(generoSeleccionado)];
        const resultadosCCFM = obtenerYProcesarResultados('CCFM', req);
        const resultadosCCSS = obtenerYProcesarResultados('CCSS', req);
        const resultadosCCNA = obtenerYProcesarResultados('CCNA', req);
        const resultadosCCCO = obtenerYProcesarResultados('CCCO', req);
        const resultadosARTE = obtenerYProcesarResultados('ARTE', req);
        const resultadosBURO = obtenerYProcesarResultados('BURO', req);
        const resultadosCCEP = obtenerYProcesarResultados('CCEP', req);
        const resultadosIIAA = obtenerYProcesarResultados('IIAA', req);
        const resultadosFINA = obtenerYProcesarResultados('FINA', req);
        const resultadosLING = obtenerYProcesarResultados('LING', req);
        const resultadosJURI = obtenerYProcesarResultados('JURI', req);
        const valorVera = obtenerValor('valorVera', req.body);
        const valorCons = obtenerValor('valorCons', req.body);
        const valorCCFM = obtenerValor('valorCCFM', req.body);
        const valorCCSS = obtenerValor('valorCCSS', req.body);
        const valorCCNA = obtenerValor('valorCCNA', req.body);
        const valorCCCO = obtenerValor('valorCCCO', req.body);
        const valorARTE = obtenerValor('valorARTE', req.body);
        const valorBURO = obtenerValor('valorBURO', req.body);
        const valorCCEP = obtenerValor('valorCCEP', req.body);
        const valorIIAA = obtenerValor('valorIIAA', req.body);
        const valorFINA = obtenerValor('valorFINA', req.body);
        const valorLING = obtenerValor('valorLING', req.body);
        const valorJURI = obtenerValor('valorJURI', req.body);
        const fila1 = obtenerValor('valorR', req.body);
        const fila2 = obtenerValor('valorI', req.body);
        const fila3 = obtenerValor('valorS', req.body);
        const fila4 = obtenerValor('valorC', req.body);
        const fila5 = obtenerValor('valorE', req.body);
        const fila6 = obtenerValor('valorA', req.body);
        const fila7 = obtenerValor('valorVacio', req.body);
        let seccionesEncuesta = [
            // Tus otras secciones aquí...
            
            // Secciones con las elecciones del usuario para Oficios
            crearTituloCategoria('Oficios'),
            crearPrimeraEleccion(obtenerValor('oficio1', req.body)),
            crearSegundaEleccion(obtenerValor('oficio2', req.body)),
            crearTerceraEleccion(obtenerValor('oficio3', req.body)),
        
            // Secciones con las elecciones del usuario para Carreras
            crearTituloCategoria('Carreras'),
            crearPrimeraEleccion(obtenerValor('carrera1', req.body)),
            crearSegundaEleccion(obtenerValor('carrera2', req.body)),
            crearTerceraEleccion(obtenerValor('carrera3', req.body)),
        
            // Secciones con las elecciones del usuario para Profesiones
            crearTituloCategoria('Profesiones'),
            crearPrimeraEleccion(obtenerValor('profesion1', req.body)),
            crearSegundaEleccion(obtenerValor('profesion2', req.body)),
            crearTerceraEleccion(obtenerValor('profesion3', req.body)),
        
            // Continúa con el resto de tu código...
        ];
        const seccionesResultados = [
            crearResultado('Resultado CCFM', resultadosCCFM),
            crearResultado('Resultado CCSS', resultadosCCSS),
            crearResultado('Resultado CCNA', resultadosCCNA),
            crearResultado('Resultado CCCO', resultadosCCCO),
            crearResultado('Resultado ARTE', resultadosARTE),
            crearResultado('Resultado BURO', resultadosBURO),
            crearResultado('Resultado CCEP', resultadosCCEP),
            crearResultado('Resultado IIAA', resultadosIIAA),
            crearResultado('Resultado FINA', resultadosFINA),
            crearResultado('Resultado LING', resultadosLING),
            crearResultado('Resultado JURI', resultadosJURI),
            // Agrega más si hay más categorías...
        ];

        const imagenData = Buffer.from(req.body.imagenData.split(",")[1], 'base64');
        const imagenDataNueva = Buffer.from(req.body.imagenDataNueva.split(",")[1], 'base64');

        let seccion = [
            crearPreguntaRespuesta("Nombre", obtenerValor('nombre', req.body)),
            crearPreguntaRespuesta("Código", obtenerValor('codigo', req.body)),
            crearPreguntaRespuesta("Lugar de nacimiento", obtenerValor('lugarNacimiento', req.body)),
            crearPreguntaRespuesta("Fecha de nacimiento", obtenerValor('fechaNacimiento', req.body)),
            crearPreguntaRespuesta("Edad", obtenerValor('edad', req.body)),
            crearPreguntaRespuesta("¿Has estudiado antes en alguna universidad o instituto?", obtenerValor('estudioPrevio', req.body)),
            crearPreguntaRespuesta("¿Cuánto tiempo?", obtenerValor('tiempoEstudio', req.body)),
            crearPreguntaRespuesta("¿Dónde?", obtenerValor('lugarEstudio', req.body)),
            crearPreguntaRespuesta("¿A qué carrera ingresaste a la Universidad ESAN?", obtenerValor('carreraIngreso', req.body)),
            crearPreguntaRespuesta("¿A qué carrera deseas cambiarte?", obtenerValor('carreraDeseada', req.body)),
            crearPreguntaRespuesta("¿Con quién vives?", obtenerValor('conQuienVives', req.body)),
            crearPreguntaRespuesta("¿Cuál es la profesión de tu padre?", obtenerValor('profesionPadre', req.body)),
            crearPreguntaRespuesta("¿Cuál es la profesión de tu madre?", obtenerValor('profesionMadre', req.body)),
            crearPreguntaRespuesta("¿Quién es la persona que más influyó en tu elección de carrera?", obtenerValor('influenciaCarrera', req.body)),

            crearPreguntaRespuesta("¿Cuáles eran tus cursos preferidos?", obtenerValor('cursosPreferidosColegio', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos que te desagradaban?", obtenerValor('cursosDesagradablesColegio', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos en los que obtuviste las mejores notas?", obtenerValor('mejoresNotasColegio', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos en los que obtuviste las peores notas?", obtenerValor('peoresNotasColegio', req.body)),
            crearPreguntaRespuesta("¿Qué cursos desaprobaste?", obtenerValor('cursosDesaprobadosColegio', req.body)),

            crearPreguntaRespuesta("¿Cuáles han sido o son tus cursos preferidos?", obtenerValor('cursosPreferidos', req.body)),
            crearPreguntaRespuesta("¿Qué cursos te desagradan?", obtenerValor('cursosDesagradables', req.body)),
            crearPreguntaRespuesta("¿En qué cursos has obtenido las mejores notas?", obtenerValor('mejoresNotas', req.body)),
            crearPreguntaRespuesta("¿En qué cursos has obtenido las peores notas?", obtenerValor('peoresNotas', req.body)),
            crearPreguntaRespuesta("¿Qué cursos has desaprobado?", obtenerValor('cursosDesaprobados', req.body)),

            crearPreguntaRespuesta("¿De qué curso o cursos te has retirado alguna vez?", obtenerValor('cursosRetirados', req.body)),
            crearPreguntaRespuesta("¿Has llevado algún curso o cursos por segunda vez (BICAS)?", obtenerValor('cursosBICAS', req.body)),
            crearPreguntaRespuesta("¿Has llevado algún curso o cursos por tercera vez (TRICAS)?", obtenerValor('cursosTRICAS', req.body)),
            crearPreguntaRespuesta("¿Has asistido a algún curso o cursos como alumno libre?", obtenerValor('cursosAlumnoLibre', req.body)),
            crearPreguntaRespuesta("¿Cuál es el motivo por el que deseas cambiarte de carrera?", obtenerValor('motivoCambioCarrera', req.body)),
            crearPreguntaRespuesta("¿Cuál es el motivo que te hace dudar de cambiarte de carrera?", obtenerValor('motivoDudaCambio', req.body)),
            crearPreguntaRespuesta("¿Qué es lo que amas hacer?", obtenerValor('amasHacer', req.body)),
            crearPreguntaRespuesta("¿Cuáles consideras que son tus talentos?", obtenerValor('talentos', req.body)),
            crearPreguntaRespuesta("¿Qué actividad te gustaría realizar o consideras que haces bien?", obtenerValor('actividadGustaria', req.body)),
            crearPreguntaRespuesta("¿Crees que esa actividad es rentable o que alguien te podría pagar por hacerla?", obtenerValor('actividadRentable', req.body)),
            crearPreguntaRespuesta("Con una visión de negocio y de acuerdo a tus habilidades ¿Qué consideras es lo que el mundo necesita?", obtenerValor('necesidadMundo', req.body)),
        ];

            
        const imageParagraph = new Paragraph({
            children: [new ImageRun({ data: imagenData, transformation: { width: 600, height: 300 } })],
        });
        const imageNuevaParagraph = new Paragraph({
            children: [new ImageRun({ data: imagenDataNueva, transformation: { width: 600, height: 300 } })],
        });

        let seccionHoland = [
            crearResultado('R', fila1),
            crearResultado('I', fila2),
            crearResultado('S', fila3),
            crearResultado('C', fila4),
            crearResultado('E', fila5),
            crearResultado('A', fila6),
            crearResultado('Vacio', fila7),
        ];
        let seccionCASM = [
            crearResultado('Valor Vera', valorVera),
            crearResultado('Valor Cons', valorCons),
            crearResultado('Valor CCFM', valorCCFM),
            crearResultado('Valor CCSS', valorCCSS),            
            crearResultado('Valor CCNA', valorCCNA),
            crearResultado('Valor CCCO', valorCCCO),
            crearResultado('Valor ARTE', valorARTE),
            crearResultado('Valor BURO', valorBURO),
            crearResultado('Valor CCEP', valorCCEP),
            crearResultado('Valor IIAA', valorIIAA),
            crearResultado('Valor FINA', valorFINA),
            crearResultado('Valor LING', valorLING),
            crearResultado('Valor JURI', valorJURI),
        ];
        seccionHoland.push(imageParagraph);
        seccionCASM.push(imageNuevaParagraph);

        const doc = new Document({
            creator: "TuNombre",
            title: "Formulario",
            description: "Documento generado desde el servidor",
            sections: [
                {
                    children: [
                        crearTitulo("Test Orientación Vocacional"),
                        crearSeparador(),
                        crearSubtitulo("Datos Personales"),
                        crearSeparador(),
                        ...seccion, 
                        ...seccionGenero,
                        crearSeparador(),
                        crearSeparador(),
                        crearSubtitulo("Resultados Holand"),
                        crearSeparador(),
                        ...seccionHoland,
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSubtitulo("Información para prueba Holland"),
                        crearSeparador(),
                        crearSubtitulo("Perfil de Personalidad y Ocupaciones Congruentes"),
                        crearSeparador(),
                        Realista(),
                        Realista1(),
                        Realista2(),
                        Realista3(),
                        crearSeparador(),
                        Intelectual(),
                        Intelectual1(),
                        Intelectual2(),
                        Intelectual3(),
                        crearSeparador(),
                        Social(),
                        Social1(),
                        Social2(),
                        Social3(),
                        crearSeparador(),
                        Convencional(),
                        Convencional1(),
                        Convencional2(),
                        Convencional3(),
                        crearSeparador(),
                        Emprendedor(),
                        Emprendedor1(),
                        Emprendedor2(),
                        Emprendedor3(),
                        crearSeparador(),
                        Artistico(),
                        Artistico1(),
                        Artistico2(),
                        Artistico3(),
                        crearSeparador(),  
                        crearSeparador(),      
                        crearSubtitulo("Resultados CASM"),
                        crearSeparador(),
                        ...seccionCASM,
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSeparador(),
                        crearSubtitulo("Resultados Descriptivos CASM"),
                        crearSeparador(),
                        ...seccionesResultados,
                        crearSeparador(),
                        crearSubtitulo("Resultado Tabla"),
                        crearSeparador(),
                        ...seccionesEncuesta,
                        crearSeparador(),
                        crearSeparador(),              
                        crearSubtitulo("Información para prueba CASM"),
                        crearSeparador(),
                        crearCCFM(),
                        crearSeparador(),
                        crearCCSS(),
                        crearSeparador(),
                        crearCCNA(),
                        crearSeparador(),
                        crearCCCO(),
                        crearSeparador(),
                        crearArte(),
                        crearSeparador(),
                        crearBuro(),
                        crearSeparador(),
                        crearCCEP(),
                        crearSeparador(),
                        crearIIAA(),
                        crearSeparador(),
                        crearFina(),
                        crearSeparador(),
                        crearLing(),
                        crearSeparador(),
                        crearJuri(),
                    ]                
                }
            ]
        });

        //doc.addSection({ children: [imageParagraph, imageNuevaParagraph] });

        const diasCita = obtenerValor('diasCita', req.body) || [];
        const horasCita = obtenerValor('horaCita', req.body) || [];
        
        console.log('Días cita:', diasCita);
        console.log('Horas cita:', horasCita);
        
        // El resto de tu lógica de procesamiento...
        
        const textoDiasCita = [...new Set(diasCita)].join(', ');
        const textoHorasCita = [...new Set(horasCita)].map(hora => {
            // Asegúrate de que cada hora es una cadena y tiene el formato esperado.
            // Aquí, no necesitas convertir el formato de la hora, solo asegúrate de que no es un valor duplicado.
            return hora; // Dado que ya son AM o PM, no necesitas procesarlas más.
        }).join(', ');
        
        
        const codigoUsuario = obtenerValor('codigo', req.body) !== 'N/A' ? obtenerValor('codigo', req.body) : 'SinCodigo';
        const nombreUsuario = obtenerValor('nombre', req.body) !== 'N/A' ? obtenerValor('nombre', req.body) : 'SinNombre';
        const nombreArchivo = `Resultados (${codigoUsuario}) ${nombreUsuario}.docx`;
        const filename = path.join(__dirname, 'descargas', nombreArchivo);

        Packer.toBuffer(doc).then(buffer => {
            fs.writeFileSync(filename, buffer);
            
            const imagenHorario = req.files && req.files.length > 0 ? req.files[0] : null;

            
            const imagenData = req.body.imagenData;
            const imagenDataNueva = req.body.imagenDataNueva;  // Recibe los datos de la nueva imagen
            console.log(imagenData);  // Verificar los datos de la imagen recibidos
            console.log(imagenDataNueva);  // Verificar los datos de la nueva imagen recibidos
            console.log(imagenData.split(','));  // Verificar la división de la Data URL
            console.log(imagenDataNueva.split(','));  // Verificar la división de la nueva Data URL
            
            // Convertir la Data URL a un Buffer
            const imagenBuffer = Buffer.from(imagenData.split(',')[1], 'base64');
            const imagenBufferNueva = Buffer.from(imagenDataNueva.split(',')[1], 'base64');  // Convierte la nueva imagen
            console.log(imagenBuffer.length);  // Verificar el tamaño del buffer de imagen
            console.log(imagenBufferNueva.length);  // Verificar el tamaño del buffer de nueva imagen

            const imageParagraph = new Paragraph({
                children: [new ImageRun({ data: imagenData, transformation: { width: 400, height: 300 } })],
            });
            const imageNuevaParagraph = new Paragraph({
                children: [new ImageRun({ data: imagenDataNueva, transformation: { width: 400, height: 300 } })],
            });
            doc.addSection({ children: [imageParagraph, imageNuevaParagraph] });
        
            //13200125@ue.edu.pe
            //myangali@esan.edu.pe
            const mailOptions = {
                from: 'tuCorreo@gmail.com',
                to: 'myangali@esan.edu.pe',
                subject: `Prueba Orientación Vocacional ${nombreUsuario} ${codigoUsuario}`,
                text: `Disponibilidad preferente del alumno: Días - ${textoDiasCita}; Horas - ${textoHorasCita}\nDentro del archivo de Word se encuentran la información, los resultados y las gráficas.`,
                attachments: [
                    {   // Adjunto del archivo DOCX
                        filename: path.basename(filename),
                        path: filename
                    },
                    {   // Adjunto del gráfico
                        filename: 'GraficaHolland.png',
                        encoding: 'base64',
                        content: imagenBuffer
                    },
                    {   // Adjunto de la nueva gráfico
                        filename: 'GraficaCASM.png',
                        encoding: 'base64',
                        content: imagenBufferNueva
                    },
                    imagenHorario ? {  // Adjunto de la imagen del horario
                        filename: imagenHorario.originalname,
                        encoding: imagenHorario.encoding,
                        mimetype: imagenHorario.mimetype,
                        content: imagenHorario.buffer
                    } : undefined
                ].filter(Boolean)
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo:', error);
                    res.status(500).send("Error al enviar el correo.");
                } else {
                    console.log('Correo enviado:', info.response);
                    res.json({ redirectUrl: '/' });
                }
            });
        }).catch(error => {
            console.error("Error al generar el archivo DOCX:", error);
            res.status(500).send("Error al generar el archivo DOCX.");
        });
    } catch (error) {
        console.error("Error general al procesar el formulario:", error);
        res.status(500).send("Error al procesar el formulario.");
    }
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor corriendo en http://localhost:' + (process.env.PORT || 3000));
});
app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('Algo salió mal!');
});
