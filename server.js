const express = require('express');
const multer  = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun } = require("docx");
const nodemailer = require('nodemailer');

const storage = multer.memoryStorage(); // Esto guarda los datos en memoria
const upload = multer({ storage: storage }).array('imagenHorario', 1);

const app = express();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '13200125@ue.edu.pe',
        pass: 'Jinkasama023'
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

function crearPreguntaRespuesta(textoPregunta, respuesta) {
    return new Paragraph({
        children: [
            new TextRun({ text: textoPregunta, bold: true, size: 32 }),  // tamaño de fuente aumentado
            new TextRun({ text: `\n${respuesta}\n`, size: 32 }),  // tamaño de fuente aumentado y respuesta en una nueva línea
        ],
    });
}
function generarTextoDisponibilidad(horariosPorDia) {
    return Object.entries(horariosPorDia).map(([dia, horarios]) => {
      if (horarios.length > 0) {
        return `${dia}: ${horarios.join(', ')}`; // Unimos los horarios con coma y espacio
      }
      return ''; // Si no hay horarios, no devolvemos nada para ese día
    }).filter(texto => texto).join('\n'); // Filtramos los días sin horarios y unimos con un salto de línea
  }
  

function crearResultado(nombre, valor) {
    let resultadoTexto;

    if (nombre === 'Valor Vera') {
        resultadoTexto = `Valor: ${valor}. ` + (valor >= 6 ? 'La prueba no es verídica' : 'La prueba es verídica');
    } else if (nombre === 'Valor Cons') {
        const valorModificado = valor + 11;
        resultadoTexto = `Valor: ${valor}. ` + (valorModificado >= 6 ? 'La prueba no es consistente' : 'La prueba es consistente');
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

function crearSeleccionCategoria(categoria, valor1, valor2, valor3) {
    return new Paragraph({
        children: [
            new TextRun({ text: `${categoria}: `, bold: true, size: 24 }),
            new TextRun({ text: `Primera Elección: ${valor1}, `, size: 24 }),
            new TextRun({ text: `Segunda Elección: ${valor2}, `, size: 24 }),
            new TextRun({ text: `Tercera Elección: ${valor3}\n`, size: 24 }),
        ],
    });
}

const obtenerValor = (campo, requestBody, defaultValue = 'N/A') => requestBody[campo] || defaultValue;

app.post('/procesar', upload, (req, res) => {
    try {
        console.log("Inicio de la función /procesar");
        console.log(req.body);

        const valorVera = obtenerValor('valorVera', req.body);
        const valorCons = obtenerValor('valorCons', req.body);
        const valorCCFM = obtenerValor('valorCCFM', req.body);
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

        const seccionesEncuesta = [
            // Tus otras secciones aquí...
            // Añade aquí las nuevas secciones con las elecciones del usuario
            crearSeleccionCategoria('Oficios', obtenerValor('oficio1', req.body), obtenerValor('oficio2', req.body), obtenerValor('oficio3', req.body)),
            crearSeleccionCategoria('Carreras', obtenerValor('carrera1', req.body), obtenerValor('carrera2', req.body), obtenerValor('carrera3', req.body)),
            crearSeleccionCategoria('Profesiones', obtenerValor('profesion1', req.body), obtenerValor('profesion2', req.body), obtenerValor('profesion3', req.body)),
        ];

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
            crearPreguntaRespuesta("¿Cuáles eran tus cursos preferidos?", obtenerValor('cursosPreferidos', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos que te desagradaban?", obtenerValor('cursosDesagradables', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos en los que obtuviste las mejores notas?", obtenerValor('mejoresNotas', req.body)),
            crearPreguntaRespuesta("¿Cuáles eran los cursos en los que obtuviste las peores notas?", obtenerValor('peoresNotas', req.body)),
            crearPreguntaRespuesta("¿Qué cursos desaprobaste?", obtenerValor('cursosDesaprobados', req.body)),
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
            crearResultado('Valor Vera', valorVera),
            crearResultado('Valor Cons', valorCons),
            crearResultado('Valor CCFM', valorCCFM),
            crearResultado('Valor CCNA', valorCCNA),
            crearResultado('Valor CCCO', valorCCCO),
            crearResultado('Valor ARTE', valorARTE),
            crearResultado('Valor BURO', valorBURO),
            crearResultado('Valor CCEP', valorCCEP),
            crearResultado('Valor IIAA', valorIIAA),
            crearResultado('Valor FINA', valorFINA),
            crearResultado('Valor LING', valorLING),
            crearResultado('Valor JURI', valorJURI),
            crearResultado('R', fila1),
            crearResultado('I', fila2),
            crearResultado('S', fila3),
            crearResultado('C', fila4),
            crearResultado('E', fila5),
            crearResultado('A', fila6),
            crearResultado('Vacio', fila7)
        ];
        const doc = new Document({
            creator: "TuNombre",
            title: "Formulario",
            description: "Documento generado desde el servidor",
            sections: [
                {
                children: [...seccion, ...seccionesEncuesta]                
            }
            ]
        });
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
            
            const mailOptions = {
                from: 'tuCorreo@gmail.com',
                to: '13200125@ue.edu.pe',
                subject: `Prueba Orientación Vocacional alumno ${codigoUsuario}`,
                text: `Disponibilidad preferente del alumno: Días - ${textoDiasCita}; Horas - ${textoHorasCita}\nAdjunto encontrarás el informe generado.`,
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

