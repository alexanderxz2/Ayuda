    // Función que muestra campos adicionales basado en una condición
    function mostrarCamposAdicionales() {
        const estudioPrevio = document.getElementById('estudioPrevio').value;
        const camposAdicionales = document.getElementById('camposAdicionales');
        if (estudioPrevio === 'si') {
            camposAdicionales.style.display = 'block';
        } else {
            camposAdicionales.style.display = 'none';
        }
    }
    
    function validarNumero(input) {
        input.value = input.value.replace(/[^\d]/g, '');
    }
  
    function validarTexto(input) {
        input.value = input.value.replace(/[^a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ]/g, '');
    }

    function calcularTotales() {
        // Inicializar contadores para cada fila
        let fila1 = 0, fila2 = 0, fila3 = 0, fila4 = 0, fila5 = 0, fila6 = 0, fila7 = 0;
        
        // Iterar sobre todos los checkboxes
        for (let i = 1; i <= 160; i++) {
            let checkbox = document.getElementById(`opcion${i}`);
            console.log(`opcion${i} value: ${checkbox.value}, checked: ${checkbox.checked}`);  // Agregar esta línea

            if (checkbox && checkbox.checked) {  // Si el checkbox existe y está marcado
                switch (checkbox.value) {
                    case 'R':
                        fila1 += 1;
                        break;
                    case 'I':
                        fila2 += 1;
                        break;
                    case 'S':
                        fila3 += 1;
                        break;
                    case 'C':
                        fila4 += 1;
                        break;
                    case 'E':
                        fila5 += 1;
                        break;
                    case 'A':
                        fila6 += 1;
                        break;
                    case 'Falso':
                        fila7 += 1;
                        break;
                }
            }
        }
        const divResultados = document.getElementById('resultados');
        divResultados.innerHTML = `
            Fila 1: ${fila1}<br>
            Fila 2: ${fila2}<br>
            Fila 3: ${fila3}<br>
            Fila 4: ${fila4}<br>
            Fila 5: ${fila5}<br>
            Fila 6: ${fila6}<br>
            Fila 7: ${fila7}<br>
            console.log('Resultados:', divResultados.innerHTML);  // Añadido para depuración

        `;
        // -------------------------------------------------
        console.log('R:', fila1);
        console.log('I:', fila2);
        console.log('S:', fila3);
        console.log('C:', fila4);
        console.log('E:', fila5);
        console.log('A:', fila6);
        console.log('Vacio:', fila7);
        
        // Aquí, puedes hacer lo que necesites con los valores de fila1, fila2, ..., fila6
        // Por ejemplo, enviar estos valores al servidor o actualizar la interfaz de usuario
        mostrarGrafica(fila1, fila2, fila3, fila4, fila5, fila6);
        return {
            fila1: fila1,
            fila2: fila2,
            fila3: fila3,
            fila4: fila4,
            fila5: fila5,
            fila6: fila6,
            fila7: fila7
        };
    }    
    let miGrafico;
    function mostrarGrafica(fila1, fila2, fila3, fila4, fila5, fila6) {

        document.getElementById('seccionGrafica').style.visibility = 'hidden';
        const ctx = document.getElementById('miGrafica').getContext('2d');

        if (miGrafico) {
            miGrafico.destroy();
        }
        
        miGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['R', 'I', 'S', 'C', 'E', 'A'],
                datasets: [{
                    data: [fila1, fila2, fila3, fila4, fila5, fila6],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 165, 0, 0.6)',
                        'rgba(0, 255, 0, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(0, 255, 0, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }, {
                    type: 'line',
                    data: [fila1, fila2, fila3, fila4, fila5, fila6],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointBorderColor: 'rgba(75, 192, 192, 1)'
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Gráfico de Personalidad',
                        font: {
                            size: 30 // tamaño del título
                        }
                    },
                    legend: {
                        display: false   // Esto oculta la leyenda
                    },
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        formatter: (value, context) => {
                            return value; // Muestra el valor de la barra
                        },
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 20 // tamaño de las etiquetas del eje X
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 14, // Establece el valor máximo en el eje y
                        ticks: {
                            stepSize: 1, // Esto hará que las divisiones en el eje y sean de 1 en 1
                            font: {
                                size: 20 // tamaño de las etiquetas del eje X
                            }
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Asegúrate de incluir el plugin ChartDataLabels
        });
    }
    function capturarImagen() {
        console.log("Inicio de captura de imagen");
        const canvasGrafica = document.getElementById('miGrafica');
    
        if (canvasGrafica) {
            const imgData = canvasGrafica.toDataURL('image/png');
            const inputImagen = document.createElement('input');  // Crear un input para almacenar los datos de la imagen
            inputImagen.type = 'hidden';
            inputImagen.name = 'imagenData';
            inputImagen.value = imgData;
            document.getElementById('formulario').appendChild(inputImagen);  // Añadir el input al formulario
        } else {
            console.error("No se pudo encontrar el canvas de la gráfica");
        }
    }
    

    function chequearRespuestas(seccion) {
        let campos = seccion.querySelectorAll('input, textarea, select');
        for (let campo of campos) {
            let parent = campo.parentElement;
            while (parent && parent !== seccion) {
                if (getComputedStyle(parent).display === 'none') {
                    break;  // Si el contenedor está oculto, salir del bucle while
                }
                parent = parent.parentElement;
            }
            // Si el contenedor está oculto, saltar al siguiente campo
            if (parent && getComputedStyle(parent).display === 'none') {
                continue;
            }
            if (campo.required && campo.value === '') {
                alert('Por favor complete todos los campos requeridos.');
                return false;
            }
        }
        return true;
    } 
    function actualizarImagen() {
        const imagenSeccion = document.getElementById('imagenSeccion');
        if (seccionActual - 1 < imagenesPorSeccion.length) {
            imagenSeccion.src = imagenesPorSeccion[seccionActual - 1];
        } else {
            // Puedes poner una imagen por defecto aquí si lo deseas
            imagenSeccion.src = 'images/logo.png';
        }
    }
    // Obtén una referencia al elemento img
    const imagenSeccion = document.getElementById('imagenSeccion');

    function formToJSON(form) {
        let formData = new FormData(form);
        let obj = {};
        for (let [key, value] of formData) {
            obj[key] = value;
        }
        return obj;
    }
    function restoreFormState(form) {
        let savedFormData = JSON.parse(localStorage.getItem('formularioData') || '{}');
        for (let [key, value] of Object.entries(savedFormData)) {
            let input = form.querySelector(`[name="${key}"]`);
            if (input && input.type !== 'file') {
                if (input.type === 'checkbox') {
                    input.checked = value;
                } else {
                    input.value = value;
                }
            }
        }
    }
    function recolectarDatos() {
        const formData = new FormData();
        const horariosIndividuales = document.querySelectorAll('.horario-individual');
        horariosIndividuales.forEach((div) => {
            const index = div.dataset.index; // Usa el índice asignado al div
            const selectDia = div.querySelector(`#diasCita${index}`);
            const selectHora = div.querySelector(`#horaCita${index}`);
            formData.append(`diasCita[${index}]`, selectDia.value);
            formData.append(`horaCita[${index}]`, selectHora.value);
        });
    }
document.addEventListener("DOMContentLoaded", function() {
    var contadorHorarios = 0;
    var maxHorarios = 3;
    var btnAgregarHorario = document.getElementById('btnAgregarHorario');
    var seleccionHorarios = document.getElementById('seleccionHorarios');

    
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("fechaNacimiento")[0].setAttribute('max', today);
    // Variables
    let seccionActual = 1;
    const btnSiguiente = document.getElementById('botonSiguiente'); 
    const btnAnterior = document.getElementById('anterior');
    const btnEnviar = document.getElementById('enviar');
    const formulario = document.querySelector('form'); 
    const inputs = Array.from(formulario.querySelectorAll('input, textarea, select'));
    // -------------------------------------------------
    restoreFormState(formulario);


    // Restaurar el estado del formulario desde Local Storage
    const savedFormData = JSON.parse(localStorage.getItem('formularioData') || '{}');
    for (let [key, value] of Object.entries(savedFormData)) {
        const input = document.querySelector(`[name="${key}"]`);
        if (input && input.type !== 'file') {
            if (input.type === 'checkbox') {
                input.checked = value;
            } else {
                input.value = value;
            }
        }
    }
    document.querySelectorAll('.btn-genero').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.btn-genero').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('generoSeleccionado').value = this.getAttribute('data-value');
    
            // Verificar si el valor se actualiza correctamente
            console.log("Género seleccionado: ", document.getElementById('generoSeleccionado').value);
        });
    });
    
    
    // Restaurar el estado del formulario desde Local Storage
    formulario.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();  // Esto evita que el formulario se envíe
            const currentIndex = inputs.indexOf(document.activeElement);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();  // Esto mueve el foco al siguiente campo de entrada
            }
        }
    });

    // Función para activar o desactivar campos requeridos en una sección
    function actualizarCamposRequeridos(seccion, activar) {
        let campos = seccion.querySelectorAll('input, textarea, select');
        campos.forEach(campo => {
            if (activar) {
                campo.setAttribute('required', true);
            } else {
                campo.removeAttribute('required');
            }
        });
    }
    btnAgregarHorario.addEventListener('click', function() {
        if (contadorHorarios < maxHorarios) {
            var divHorario = document.createElement('div');
            divHorario.className = 'horario-individual';

            divHorario.innerHTML = `
                <label for="diasCita${contadorHorarios}">¿Qué días preferirías para la cita?</label>
                <br>
                <br>
                <select id="diasCita${contadorHorarios}" name="diasCita[]" class="select-estilo" required>
                    <option value="" disabled selected>Selecciona un día</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                </select>
                <br>
                <label for="horaCita${contadorHorarios}">Selecciona una hora para la cita:</label>
                <br><br>
                <select id="horaCita${contadorHorarios}" name="horaCita[]" class="select-estilo" required>
                    <option value="" disabled selected>Selecciona una hora</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="9:30 AM">9:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                </select>
                <br>
                <button type="button" class="btnEliminarHorario">Eliminar</button>
                <br><br>
            `;
    
            seleccionHorarios.appendChild(divHorario);
            contadorHorarios++;
    
            // Añadir la funcionalidad de eliminar al botón recién creado
            divHorario.querySelector('.btnEliminarHorario').addEventListener('click', function() {
                divHorario.remove();
            });
        } else {
            alert('Solo puedes añadir hasta 3 horarios.');
        }
    });    
    // Mapeo de opciones a categorías
    const mapeoOpciones = {
        "opcion1_N": "CCFM",  // j15
        "opcion2_N": "CCFM",  // j16
        "opcion3_N": "CCSS",  // j17
        "opcion4_N": "CCSS",  // j18
        "opcion5_N": "CCNA",  // j19
        "opcion6_N": "CCNA",  // j20
        "opcion7_N": "CCCO",  // j21
        "opcion8_N": "CCCO",  // j22
        "opcion9_N": "ARTE",  // j23
        "opcion10_N": "ARTE", // j24
        "opcion11_N": "BURO", // j25
        "opcion12_N": "BURO", // j26
        "opcion13_N": "CCEP", // j27
        "opcion14_N": "CCEP", // j28
        "opcion15_N": "IIAA", // j29
        "opcion16_N": "IIAA", // j30
        "opcion17_N": "FINA", // j31
        "opcion18_N": "FINA", // j32
        "opcion19_N": "LING", // j33
        "opcion20_N": "LING", // j34
        "opcion21_N": "JURI", // j35
        "opcion22_N": "JURI", // j36
        "opcion23_N": "VERA", // j37
        "opcion24_N": "NULO", // j38
        "opcion25_N": "CONS", // j39
        "opcion26_N": "CONS", // j40
        "opcion27_N": "CCFM", // j41
        "opcion28_N": "CCFM", // j42
        "opcion29_N": "CCSS", // j43
        "opcion30_N": "CCSS", // j44
        "opcion31_N": "CCNA", // j45
        "opcion32_N": "CCNA", // j46 //j47 no existe
        "opcion33_N": "CCCO", // j48
        "opcion34_N": "CCCO", // j49
        "opcion35_N": "ARTE", // j50
        "opcion36_N": "ARTE", // j51
        "opcion37_N": "BURO", // j52
        "opcion38_N": "BURO", // j53
        "opcion39_N": "CCEP", // j54
        "opcion40_N": "CCEP", // j55
        "opcion41_N": "IIAA", // j56
        "opcion42_N": "IIAA", // j57
        "opcion43_N": "FINA", // j58
        "opcion44_N": "FINA", // j59
        "opcion45_N": "LING", // j60
        "opcion46_N": "LING", // j61
        "opcion47_N": "JURI", // j62
        "opcion48_N": "JURI", // j63
        "opcion49_N": "VERA", // j64
        "opcion50_N": "NULO", // j65
        "opcion51_N": "NULO", // j66
        "opcion52_N": "CONS", // j67
        "opcion53_N": "CCFM", // j68
        "opcion54_N": "CCFM", // j69
        "opcion55_N": "CCSS", // j70
        "opcion56_N": "CCSS", // j71
        "opcion57_N": "CCNA", // j72
        "opcion58_N": "CCNA", // j73
        "opcion59_N": "CCCO", // j74
        "opcion60_N": "CCCO", // j75
        "opcion61_N": "ARTE", // j76
        "opcion62_N": "ARTE", // j77
        "opcion63_N": "BURO", // j78
        "opcion64_N": "BURO", // j79
        "opcion65_N": "CCEP", // j80
        "opcion66_N": "CCEP", // j81
        "opcion67_N": "IIAA", // j82
        "opcion68_N": "IIAA", // j83
        "opcion69_N": "FINA", // j84
        "opcion70_N": "FINA", // j85
        "opcion71_N": "LING", // j86
        "opcion72_N": "LING", // j87
        "opcion73_N": "JURI", // j88
        "opcion74_N": "JURI", // j89
        "opcion75_N": "VERA", // j90
        "opcion76_N": "NULO", // j91
        "opcion77_N": "NULO", // j92
        "opcion78_N": "CONS", // j93
        "opcion79_N": "CCFM", // j94 //j95 no existe
        "opcion80_N": "CCFM", // j96
        "opcion81_N": "CCSS", // j97
        "opcion82_N": "CCSS", // j98
        "opcion83_N": "CCNA", // j99
        "opcion84_N": "CCNA", // j100
        "opcion85_N": "CCCO", // j101
        "opcion86_N": "CCCO", // j102
        "opcion87_N": "ARTE", // j103
        "opcion88_N": "ARTE", // j104
        "opcion89_N": "BURO", // j105
        "opcion90_N": "BURO", // j106
        "opcion91_N": "CCEP", // j107
        "opcion92_N": "CCEP", // j108
        "opcion93_N": "IIAA", // j109
        "opcion94_N": "IIAA", // j110
        "opcion95_N": "FINA", // j111
        "opcion96_N": "FINA", // j112
        "opcion97_N": "LING", // j113
        "opcion98_N": "LING", // j114
        "opcion99_N": "JURI", // j115
        "opcion100_N": "JURI", // j116
        "opcion101_N": "VERA", // j117
        "opcion102_N": "NULO", // j118
        "opcion103_N": "NULO", // j119
        "opcion104_N": "CONS", // j120
        "opcion105_N": "CCFM", // j121
        "opcion106_N": "CCFM", // j122
        "opcion107_N": "CCSS", // j123 // j124 no existe
        "opcion108_N": "CCSS", // j125
        "opcion109_N": "CCNA", // j126
        "opcion110_N": "CCNA", // j127
        "opcion111_N": "CCCO", // j128
        "opcion112_N": "CCCO", // j129
        "opcion113_N": "ARTE", // j130
        "opcion114_N": "ARTE", // j131
        "opcion115_N": "BURO", // j132
        "opcion116_N": "BURO", // j133
        "opcion117_N": "CCEP", // j134
        "opcion118_N": "CCEP", // j135
        "opcion119_N": "IIAA", // j136
        "opcion120_N": "IIAA", // j137
        "opcion121_N": "FINA", // j138
        "opcion122_N": "FINA", // j139
        "opcion123_N": "LING", // j140
        "opcion124_N": "LING", // j141
        "opcion125_N": "JURI", // j142
        "opcion126_N": "JURI", // j143
        "opcion127_N": "VERA", // j144
        "opcion128_N": "NULO", // j145
        "opcion129_N": "NULO", // j146
        "opcion130_N": "CONS", // j147
        "opcion131_N": "VERA", // j148
        "opcion132_N": "CCFM", // j149
        "opcion133_N": "CCSS", // j150
        "opcion134_N": "CCSS", // j151
        "opcion135_N": "CCNA", // j152
        "opcion136_N": "CCNA", // j153
        "opcion137_N": "CCCO", // j154
        "opcion138_N": "CCCO", // j155
        "opcion139_N": "ARTE", // j156
        "opcion140_N": "ARTE", // j157
        "opcion141_N": "BURO", // j158
        "opcion142_N": "BURO", // j159
        "opcion143_N": "VERA", // j160
        "opcion144_N": "CCEP", // j161
        "opcion145_N": "IIAA", // j162
        "opcion146_N": "IIAA", // j163
        "opcion147_N": "FINA", // j164
        "opcion148_N": "FINA", // j165
        "opcion149_N": "LING", // j166
        "opcion150_N": "LING", // j167
        "opcion151_N": "VERA", // j168
        "opcion152_N": "JURI", // j169
        "opcion153_N": "NULO", // j170
        "opcion154_N": "CONS", // j171
        "opcion155_N": "NULO", // j172
        "opcion156_N": "NULO", // j173
        "opcion157_N": "CCFM", // j174
        "opcion158_N": "CCFM", // j175
        "opcion159_N": "CCSS", // j176
        "opcion160_N": "CCSS", // j177
        "opcion161_N": "CCNA", // j178
        "opcion162_N": "CCNA", // j179
        "opcion163_N": "CCCO", // j180
        "opcion164_N": "CCCO", // j181
        "opcion165_N": "ARTE", // j182
        "opcion166_N": "ARTE", // j183
        "opcion167_N": "BURO", // j184
        "opcion168_N": "BURO", // j185
        "opcion169_N": "CCEP", // j186
        "opcion170_N": "CCEP", // j187
        "opcion171_N": "IIAA", // j188
        "opcion172_N": "IIAA", // j189
        "opcion173_N": "FINA", // j190
        "opcion174_N": "FINA", // j191
        "opcion175_N": "LING", // j192
        "opcion176_N": "LING", // j193
        "opcion177_N": "VERA", // j194
        "opcion178_N": "JURI", // j195
        "opcion179_N": "VERA", // j196
        "opcion180_N": "NULO", // j197
        "opcion181_N": "NULO", // j198
        "opcion182_N": "CONS", // j199
        "opcion183_N": "VERA", // j200
        "opcion184_N": "CCFM", // j201
        "opcion185_N": "CCSS", // j202
        "opcion186_N": "CCSS", // j203
        "opcion187_N": "CCNA", // j204
        "opcion188_N": "CCNA", // j205
        "opcion189_N": "CCCO", // j206
        "opcion190_N": "CCCO", // j207
        "opcion191_N": "ARTE", // j208
        "opcion192_N": "ARTE", // j209
        "opcion193_N": "BURO", // j210
        "opcion194_N": "BURO", // j211
        "opcion195_N": "CCEP", // j212
        "opcion196_N": "CCEP", // j213
        "opcion197_N": "IIAA", // j214
        "opcion198_N": "IIAA", // j215
        "opcion199_N": "FINA", // j216
        "opcion200_N": "FINA", // j217
        "opcion201_N": "LING", // j218
        "opcion202_N": "LING", // j219
        "opcion203_N": "VERA", // j220
        "opcion204_N": "JURI", // j221
        "opcion205_N": "VERA", // j222
        "opcion206_N": "NULO", // j223
        "opcion207_N": "NULO", // j224
        "opcion208_N": "CONS", // j225
        "opcion209_N": "CCFM", // j226
        "opcion210_N": "CCFM", // j227
        "opcion211_N": "CCSS", // j228
        "opcion212_N": "CCSS", // j229
        "opcion213_N": "CCNA", // j230
        "opcion214_N": "CCNA", // j231
        "opcion215_N": "CCCO", // j232
        "opcion216_N": "CCCO", // j233
        "opcion217_N": "ARTE", // j234
        "opcion218_N": "ARTE", // j235
        "opcion219_N": "BURO", // j236
        "opcion220_N": "BURO", // j237
        "opcion221_N": "CCEP", // j238
        "opcion222_N": "CCEP", // j239
        "opcion223_N": "IIAA", // j240
        "opcion224_N": "IIAA", // j241
        "opcion225_N": "FINA", // j242
        "opcion226_N": "FINA", // j243
        "opcion227_N": "LING", // j244
        "opcion228_N": "LING", // j245
        "opcion229_N": "JURI", // j246
        "opcion230_N": "JURI", // j247
        "opcion231_N": "CONS", // j248
        "opcion232_N": "NULO", // j249
        "opcion233_N": "NULO", // j250
        "opcion234_N": "CONS", // j251
        "opcion235_N": "CCFM", // j252
        "opcion236_N": "CCFM", // j253
        "opcion237_N": "CCSS", // j254
        "opcion238_N": "CCSS", // j255
        "opcion239_N": "CCNA", // j256
        "opcion240_N": "CCNA", // j257
        "opcion241_N": "CCCO", // j258
        "opcion242_N": "CCCO", // j259
        "opcion243_N": "ARTE", // j260
        "opcion244_N": "ARTE", // j261
        "opcion245_N": "BURO", // j262
        "opcion246_N": "BURO", // j263
        "opcion247_N": "CCEP", // j264
        "opcion248_N": "CCEP", // j265
        "opcion249_N": "IIAA", // j266
        "opcion250_N": "IIAA", // j267
        "opcion251_N": "FINA", // j268
        "opcion252_N": "FINA", // j269
        "opcion253_N": "LING", // j270
        "opcion254_N": "LING", // j271
        "opcion255_N": "JURI", // j272
        "opcion256_N": "JURI", // j273
        "opcion257_N": "CONS", // j274
        "opcion258_N": "NULO", // j275
        "opcion259_N": "NULO", // j276
        "opcion260_N": "CONS", // j277
        "opcion261_N": "CCFM", // j278
        "opcion262_N": "CCFM", // j279
        "opcion263_N": "CCSS", // j280
        "opcion264_N": "CCSS", // j281
        "opcion265_N": "CCNA", // j282
        "opcion266_N": "CCNA", // j283
        "opcion267_N": "CCCO", // j284
        "opcion268_N": "CCCO", // j285
        "opcion269_N": "ARTE", // j286
        "opcion270_N": "ARTE", // j287
        "opcion271_N": "BURO", // j288
        "opcion272_N": "BURO", // j289
        "opcion273_N": "CCEP", // j290
        "opcion274_N": "CCEP", // j291
        "opcion275_N": "IIAA", // j292
        "opcion276_N": "IIAA", // j293
        "opcion277_N": "FINA", // j294
        "opcion278_N": "FINA", // j295
        "opcion279_N": "LING", // j296
        "opcion280_N": "LING", // j297
        "opcion281_N": "JURI", // j298
        "opcion282_N": "JURI", // j299
        "opcion283_N": "CONS", // j300
        "opcion284_N": "CONS", // j301
        "opcion285_N": "CONS", // j302
        "opcion286_N": "CONS", // j303
    // Agregar más mapeos según sea necesario...
    };
    // Asegúrate de llamar a validarFormulario antes de enviar el formulario.
    
    function calcularCons() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const SUMA = (
            (estaSeleccionada("opcion25_N") - estaSeleccionada("opcion261_N")) +
            (estaSeleccionada("opcion49_N") - estaSeleccionada("opcion263_N")) +
            (estaSeleccionada("opcion75_N") - estaSeleccionada("opcion265_N")) +
            (estaSeleccionada("opcion101_N") - estaSeleccionada("opcion267_N")) +
            (estaSeleccionada("opcion127_N") - estaSeleccionada("opcion269_N")) +
            (estaSeleccionada("opcion151_N") - estaSeleccionada("opcion271_N")) +
            (estaSeleccionada("opcion177_N") - estaSeleccionada("opcion273_N")) +
            (estaSeleccionada("opcion203_N") - estaSeleccionada("opcion275_N")) +
            (estaSeleccionada("opcion231_N") - estaSeleccionada("opcion277_N")) +
            (estaSeleccionada("opcion257_N") - estaSeleccionada("opcion279_N")) +
            (estaSeleccionada("opcion283_N") - estaSeleccionada("opcion1_N"))
        );
        
    
        const RESTA = (
            (estaSeleccionada("opcion26_N") - estaSeleccionada("opcion262_N")) +
            (estaSeleccionada("opcion52_N") - estaSeleccionada("opcion264_N")) +
            (estaSeleccionada("opcion78_N") - estaSeleccionada("opcion266_N")) +
            (estaSeleccionada("opcion104_N") - estaSeleccionada("opcion268_N")) +
            (estaSeleccionada("opcion130_N") - estaSeleccionada("opcion270_N")) +
            (estaSeleccionada("opcion154_N") - estaSeleccionada("opcion272_N")) +
            (estaSeleccionada("opcion182_N") - estaSeleccionada("opcion274_N")) +
            (estaSeleccionada("opcion208_N") - estaSeleccionada("opcion276_N")) +
            (estaSeleccionada("opcion234_N") - estaSeleccionada("opcion278_N")) +
            (estaSeleccionada("opcion260_N") - estaSeleccionada("opcion280_N")) +
            (estaSeleccionada("opcion285_N") - estaSeleccionada("opcion2_N"))
        );
    
        const CONS = SUMA - RESTA;
        
        return CONS;
    }
    function calcularVera() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const VERA = (
            estaSeleccionada("opcion23_N") +
            estaSeleccionada("opcion49_N") +
            estaSeleccionada("opcion75_N") +
            estaSeleccionada("opcion101_N") +
            estaSeleccionada("opcion127_N") +
            estaSeleccionada("opcion143_N") +
            estaSeleccionada("opcion179_N") +
            estaSeleccionada("opcion205_N") +
            estaSeleccionada("opcion131_N") +
            estaSeleccionada("opcion157_N") +
            estaSeleccionada("opcion183_N")
        );
    
        return VERA;
    }
    function calcularCCFM() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const CCFM = (
            estaSeleccionada("opcion1_N") +
            estaSeleccionada("opcion27_N") +
            estaSeleccionada("opcion53_N") +
            estaSeleccionada("opcion79_N") +
            estaSeleccionada("opcion105_N") +
            estaSeleccionada("opcion131_N") +
            estaSeleccionada("opcion157_N") +
            estaSeleccionada("opcion183_N") +
            estaSeleccionada("opcion209_N") +
            estaSeleccionada("opcion235_N") +
            estaSeleccionada("opcion261_N") +
            estaSeleccionada("opcion2_N") +
            estaSeleccionada("opcion4_N") +
            estaSeleccionada("opcion6_N") +
            estaSeleccionada("opcion8_N") +
            estaSeleccionada("opcion10_N") +
            estaSeleccionada("opcion12_N") +
            estaSeleccionada("opcion14_N") +
            estaSeleccionada("opcion16_N") +
            estaSeleccionada("opcion18_N") +
            estaSeleccionada("opcion20_N") +
            estaSeleccionada("opcion22_N") 
        );
    
        return CCFM;
    }
    function calcularCCSS() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const CCSS = (
            estaSeleccionada("opcion3_N") +
            estaSeleccionada("opcion29_N") +
            estaSeleccionada("opcion55_N") +
            estaSeleccionada("opcion81_N") +
            estaSeleccionada("opcion107_N") +
            estaSeleccionada("opcion133_N") +
            estaSeleccionada("opcion159_N") +
            estaSeleccionada("opcion185_N") +
            estaSeleccionada("opcion211_N") +
            estaSeleccionada("opcion237_N") +
            estaSeleccionada("opcion263_N") +
            estaSeleccionada("opcion28_N") +
            estaSeleccionada("opcion30_N") +
            estaSeleccionada("opcion32_N") +
            estaSeleccionada("opcion34_N") +
            estaSeleccionada("opcion36_N") +
            estaSeleccionada("opcion38_N") +
            estaSeleccionada("opcion40_N") +
            estaSeleccionada("opcion42_N") +
            estaSeleccionada("opcion44_N") +
            estaSeleccionada("opcion46_N") +
            estaSeleccionada("opcion48_N") 
        );
    
        return CCSS;
    }
    function calcularCCNA() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const CCNA = (
            estaSeleccionada("opcion5_N") +
            estaSeleccionada("opcion31_N") +
            estaSeleccionada("opcion57_N") +
            estaSeleccionada("opcion83_N") +
            estaSeleccionada("opcion109_N") +
            estaSeleccionada("opcion135_N") +
            estaSeleccionada("opcion161_N") +
            estaSeleccionada("opcion187_N") +
            estaSeleccionada("opcion213_N") +
            estaSeleccionada("opcion239_N") +
            estaSeleccionada("opcion265_N") +
            estaSeleccionada("opcion54_N") +
            estaSeleccionada("opcion56_N") +
            estaSeleccionada("opcion58_N") +
            estaSeleccionada("opcion60_N") +
            estaSeleccionada("opcion62_N") +
            estaSeleccionada("opcion64_N") +
            estaSeleccionada("opcion66_N") +
            estaSeleccionada("opcion68_N") +
            estaSeleccionada("opcion70_N") +
            estaSeleccionada("opcion72_N") +
            estaSeleccionada("opcion74_N") 
        );
    
        return CCNA;
    }
    function calcularCCCO() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const CCCO = (
            estaSeleccionada("opcion7_N") +
            estaSeleccionada("opcion33_N") +
            estaSeleccionada("opcion59_N") +
            estaSeleccionada("opcion85_N") +
            estaSeleccionada("opcion111_N") +
            estaSeleccionada("opcion137_N") +
            estaSeleccionada("opcion163_N") +
            estaSeleccionada("opcion189_N") +
            estaSeleccionada("opcion215_N") +
            estaSeleccionada("opcion241_N") +
            estaSeleccionada("opcion267_N") +
            estaSeleccionada("opcion80_N") +
            estaSeleccionada("opcion82_N") +
            estaSeleccionada("opcion84_N") +
            estaSeleccionada("opcion86_N") +
            estaSeleccionada("opcion88_N") +
            estaSeleccionada("opcion90_N") +
            estaSeleccionada("opcion92_N") +
            estaSeleccionada("opcion94_N") +
            estaSeleccionada("opcion96_N") +
            estaSeleccionada("opcion98_N") +
            estaSeleccionada("opcion100_N") 
        );
    
        return CCCO;
    }
    function calcularARTE() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const ARTE = (
            estaSeleccionada("opcion9_N") +
            estaSeleccionada("opcion35_N") +
            estaSeleccionada("opcion61_N") +
            estaSeleccionada("opcion87_N") +
            estaSeleccionada("opcion113_N") +
            estaSeleccionada("opcion139_N") +
            estaSeleccionada("opcion165_N") +
            estaSeleccionada("opcion191_N") +
            estaSeleccionada("opcion217_N") +
            estaSeleccionada("opcion243_N") +
            estaSeleccionada("opcion269_N") +
            estaSeleccionada("opcion106_N") +
            estaSeleccionada("opcion108_N") +
            estaSeleccionada("opcion110_N") +
            estaSeleccionada("opcion112_N") +
            estaSeleccionada("opcion114_N") +
            estaSeleccionada("opcion116_N") +
            estaSeleccionada("opcion118_N") +
            estaSeleccionada("opcion120_N") +
            estaSeleccionada("opcion122_N") +
            estaSeleccionada("opcion124_N") +
            estaSeleccionada("opcion126_N") 
        );
    
        return ARTE;
    }
    function calcularBURO() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const BURO = (
            estaSeleccionada("opcion11_N") +
            estaSeleccionada("opcion37_N") +
            estaSeleccionada("opcion63_N") +
            estaSeleccionada("opcion89_N") +
            estaSeleccionada("opcion115_N") +
            estaSeleccionada("opcion141_N") +
            estaSeleccionada("opcion167_N") +
            estaSeleccionada("opcion193_N") +
            estaSeleccionada("opcion219_N") +
            estaSeleccionada("opcion245_N") +
            estaSeleccionada("opcion271_N") +
            estaSeleccionada("opcion132_N") +
            estaSeleccionada("opcion134_N") +
            estaSeleccionada("opcion136_N") +
            estaSeleccionada("opcion138_N") +
            estaSeleccionada("opcion140_N") +
            estaSeleccionada("opcion142_N") +
            estaSeleccionada("opcion144_N") +
            estaSeleccionada("opcion146_N") +
            estaSeleccionada("opcion148_N") +
            estaSeleccionada("opcion150_N") +
            estaSeleccionada("opcion152_N") 
        );
    
        return BURO;
    }
    function calcularCCEP() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const CCEP = (
            estaSeleccionada("opcion13_N") +
            estaSeleccionada("opcion39_N") +
            estaSeleccionada("opcion65_N") +
            estaSeleccionada("opcion91_N") +
            estaSeleccionada("opcion117_N") +
            estaSeleccionada("opcion143_N") +
            estaSeleccionada("opcion169_N") +
            estaSeleccionada("opcion195_N") +
            estaSeleccionada("opcion221_N") +
            estaSeleccionada("opcion247_N") +
            estaSeleccionada("opcion273_N") +
            estaSeleccionada("opcion158_N") +
            estaSeleccionada("opcion160_N") +
            estaSeleccionada("opcion162_N") +
            estaSeleccionada("opcion164_N") +
            estaSeleccionada("opcion166_N") +
            estaSeleccionada("opcion168_N") +
            estaSeleccionada("opcion170_N") +
            estaSeleccionada("opcion172_N") +
            estaSeleccionada("opcion174_N") +
            estaSeleccionada("opcion176_N") +
            estaSeleccionada("opcion178_N") 
        );
    
        return CCEP;
    }
    function calcularIIAA() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const IIAA = (
            estaSeleccionada("opcion15_N") +
            estaSeleccionada("opcion41_N") +
            estaSeleccionada("opcion67_N") +
            estaSeleccionada("opcion93_N") +
            estaSeleccionada("opcion119_N") +
            estaSeleccionada("opcion145_N") +
            estaSeleccionada("opcion171_N") +
            estaSeleccionada("opcion197_N") +
            estaSeleccionada("opcion223_N") +
            estaSeleccionada("opcion249_N") +
            estaSeleccionada("opcion275_N") +
            estaSeleccionada("opcion184_N") +
            estaSeleccionada("opcion186_N") +
            estaSeleccionada("opcion188_N") +
            estaSeleccionada("opcion190_N") +
            estaSeleccionada("opcion192_N") +
            estaSeleccionada("opcion194_N") +
            estaSeleccionada("opcion196_N") +
            estaSeleccionada("opcion198_N") +
            estaSeleccionada("opcion200_N") +
            estaSeleccionada("opcion202_N") +
            estaSeleccionada("opcion204_N") 
        );
    
        return IIAA;
    }
    function calcularFINA() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const FINA = (
            estaSeleccionada("opcion17_N") +
            estaSeleccionada("opcion43_N") +
            estaSeleccionada("opcion69_N") +
            estaSeleccionada("opcion95_N") +
            estaSeleccionada("opcion121_N") +
            estaSeleccionada("opcion147_N") +
            estaSeleccionada("opcion173_N") +
            estaSeleccionada("opcion199_N") +
            estaSeleccionada("opcion225_N") +
            estaSeleccionada("opcion251_N") +
            estaSeleccionada("opcion277_N") +
            estaSeleccionada("opcion210_N") +
            estaSeleccionada("opcion212_N") +
            estaSeleccionada("opcion214_N") +
            estaSeleccionada("opcion216_N") +
            estaSeleccionada("opcion218_N") +
            estaSeleccionada("opcion220_N") +
            estaSeleccionada("opcion222_N") +
            estaSeleccionada("opcion224_N") +
            estaSeleccionada("opcion226_N") +
            estaSeleccionada("opcion228_N") +
            estaSeleccionada("opcion230_N") 
        );
    
        return FINA;
    }
    function calcularLING() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const LING = (
            estaSeleccionada("opcion19_N") +
            estaSeleccionada("opcion45_N") +
            estaSeleccionada("opcion71_N") +
            estaSeleccionada("opcion97_N") +
            estaSeleccionada("opcion123_N") +
            estaSeleccionada("opcion149_N") +
            estaSeleccionada("opcion175_N") +
            estaSeleccionada("opcion201_N") +
            estaSeleccionada("opcion227_N") +
            estaSeleccionada("opcion253_N") +
            estaSeleccionada("opcion279_N") +
            estaSeleccionada("opcion236_N") +
            estaSeleccionada("opcion238_N") +
            estaSeleccionada("opcion240_N") +
            estaSeleccionada("opcion242_N") +
            estaSeleccionada("opcion244_N") +
            estaSeleccionada("opcion246_N") +
            estaSeleccionada("opcion248_N") +
            estaSeleccionada("opcion250_N") +
            estaSeleccionada("opcion252_N") +
            estaSeleccionada("opcion254_N") +
            estaSeleccionada("opcion256_N") 
        );
    
        return LING;
    }
    function calcularJURI() {
        function estaSeleccionada(id) {
            const elemento = document.getElementById(id);
            if (elemento) {
                return elemento.checked ? 1 : 0;
            } else {
                console.error(`Elemento con id ${id} no encontrado`);
                return 0;
            }
        }
    
        const JURI = (
            estaSeleccionada("opcion21_N") +
            estaSeleccionada("opcion47_N") +
            estaSeleccionada("opcion73_N") +
            estaSeleccionada("opcion99_N") +
            estaSeleccionada("opcion125_N") +
            estaSeleccionada("opcion151_N") +
            estaSeleccionada("opcion177_N") +
            estaSeleccionada("opcion203_N") +
            estaSeleccionada("opcion229_N") +
            estaSeleccionada("opcion255_N") +
            estaSeleccionada("opcion281_N") +
            estaSeleccionada("opcion262_N") +
            estaSeleccionada("opcion264_N") +
            estaSeleccionada("opcion266_N") +
            estaSeleccionada("opcion268_N") +
            estaSeleccionada("opcion270_N") +
            estaSeleccionada("opcion272_N") +
            estaSeleccionada("opcion274_N") +
            estaSeleccionada("opcion276_N") +
            estaSeleccionada("opcion278_N") +
            estaSeleccionada("opcion280_N") +
            estaSeleccionada("opcion282_N") 
        );
    
        return JURI;
    }
    function realizarCalculos() {
        const valorVera = calcularVera();
        const valorCons = calcularCons();
        const valorCCFM = calcularCCFM();
        const valorCCSS = calcularCCSS();
        const valorCCNA = calcularCCNA();
        const valorCCCO = calcularCCCO();
        const valorARTE = calcularARTE();
        const valorBURO = calcularBURO();
        const valorCCEP = calcularCCEP();
        const valorIIAA = calcularIIAA();
        const valorFINA = calcularFINA();
        const valorLING = calcularLING();
        const valorJURI = calcularJURI();

        const datos = {
        //    VERA: valorVera,
        //    CONS: valorCons,
            CCFM: valorCCFM,
            CCSS: valorCCSS,
            CCNA: valorCCNA,
            CCCO: valorCCCO,
            ARTE: valorARTE,
            BURO: valorBURO,
            CCEP: valorCCEP,
            IIAA: valorIIAA,
            FINA: valorFINA,
            LING: valorLING,
            JURI: valorJURI
        };
        

        // Aquí puedes agregar más cálculos si lo necesitas
        // const otroValor = calcularOtroValor();
        
        console.log({
            valorVera,
            valorCons,
            valorCCFM,
            valorCCNA,
            valorCCCO,
            valorARTE,
            valorBURO,
            valorCCEP,
            valorIIAA,
            valorFINA,
            valorLING,
            valorJURI,
            // otroValor,  // Descomenta esta línea si agregas más cálculos
        });
        mostrarNuevaGrafica(datos);
    }
    let miNuevaGrafica;
    function mostrarNuevaGrafica(datos) {
        // Asegúrate de que el contenedor de la gráfica esté visible
        document.getElementById('seccionGraficaSegundo').style.visibility = 'hidden';
    
        // Obtén el contexto del canvas donde se mostrará la gráfica
        const ctx = document.getElementById('miNuevaGrafica').getContext('2d');
        if (miNuevaGrafica) {
            miNuevaGrafica.destroy();
        }
    
        // Extrae las etiquetas y valores de los datos
        const labels = Object.keys(datos);
        const values = Object.values(datos);
    
        // Crea una nueva instancia de Chart.js para la gráfica
        miNuevaGrafica = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: [
                    //    'rgba(255, 99, 132, 0.6)',
                    //    'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(99, 132, 255, 0.6)',
                        'rgba(245, 130, 49, 0.6)',
                        'rgba(145, 30, 180, 0.6)',
                        'rgba(70, 240, 240, 0.6)',
                        'rgba(240, 50, 230, 0.6)',
                        'rgba(210, 245, 60, 0.6)',
                        'rgba(250, 190, 190, 0.6)'
                    ],
                    borderColor: [
                    //    'rgba(255, 99, 132, 1)',
                    //    'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(99, 132, 255, 1)',
                        'rgba(245, 130, 49, 1)',
                        'rgba(145, 30, 180, 1)',
                        'rgba(70, 240, 240, 1)',
                        'rgba(240, 50, 230, 1)',
                        'rgba(210, 245, 60, 1)',
                        'rgba(250, 190, 190, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Grafico CASM',
                        font: {
                            size: 30,  // tamaño del título
                            weight: 'bold'  // negrita
                        }
                    },
                    legend: {
                        display: false  // Esto oculta la leyenda
                    },
                    datalabels: {
                        align: 'end',
                        anchor: 'end',
                        formatter: (value, context) => {
                            return value; // Muestra el valor de la barra
                        },
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 20,  // tamaño de las etiquetas del eje X
                                weight: 'bold'  // negrita
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 22, // Establece el valor máximo en el eje y
                        ticks: {
                            stepSize: 1, // Esto hará que las divisiones en el eje y sean de 1 en 1
                            font: {
                                size: 20 // tamaño de las etiquetas del eje X
                            }
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Asegúrate de incluir el plugin ChartDataLabels
        });
    }
    const cuadroMujeres = {
        CCFM: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-11': { percentil: '40-60', significado: 'Indeciso' },
            '12-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCSS: {
            '0-4': { percentil: '1-14', significado: 'Desinterés' },
            '5-7': { percentil: '15-29', significado: 'Bajo' },
            '8-9': { percentil: '30-39', significado: 'Promedio Bajo' },
            '10-14': { percentil: '40-60', significado: 'Indeciso' },
            '15-16': { percentil: '61-74', significado: 'Promedio Alto' },
            '17-19': { percentil: '75-89', significado: 'Alto' },
            '20-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCNA: {
            '0-3': { percentil: '1-14', significado: 'Desinterés' },
            '4-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCCO: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-11': { percentil: '40-60', significado: 'Indeciso' },
            '12-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        ARTE: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-11': { percentil: '40-60', significado: 'Indeciso' },
            '12-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        BURO: {
            '0-4': { percentil: '1-14', significado: 'Desinterés' },
            '5-7': { percentil: '15-29', significado: 'Bajo' },
            '8-9': { percentil: '30-39', significado: 'Promedio Bajo' },
            '10-14': { percentil: '40-60', significado: 'Indeciso' },
            '15-16': { percentil: '61-74', significado: 'Promedio Alto' },
            '17-19': { percentil: '75-89', significado: 'Alto' },
            '20-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCEP: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        IIAA: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-9': { percentil: '40-60', significado: 'Indeciso' },
            '10-12': { percentil: '61-74', significado: 'Promedio Alto' },
            '13-15': { percentil: '75-89', significado: 'Alto' },
            '16-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        FINA: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        LING: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        JURI: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-11': { percentil: '40-60', significado: 'Indeciso' },
            '12-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        }
    };

    const cuadroVarones = {
        CCFM: {
            '0-4': { percentil: '1-14', significado: 'Desinterés' },
            '5-7': { percentil: '15-29', significado: 'Bajo' },
            '8-9': { percentil: '30-39', significado: 'Promedio Bajo' },
            '10-13': { percentil: '40-60', significado: 'Indeciso' },
            '14-15': { percentil: '61-74', significado: 'Promedio Alto' },
            '16-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCSS: {
            '0-3': { percentil: '1-14', significado: 'Desinterés' },
            '4-6': { percentil: '15-29', significado: 'Bajo' },
            '7-8': { percentil: '30-39', significado: 'Promedio Bajo' },
            '9-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCNA: {
            '0-4': { percentil: '1-14', significado: 'Desinterés' },
            '5-7': { percentil: '15-29', significado: 'Bajo' },
            '8-9': { percentil: '30-39', significado: 'Promedio Bajo' },
            '10-13': { percentil: '40-60', significado: 'Indeciso' },
            '14-15': { percentil: '61-74', significado: 'Promedio Alto' },
            '16-18': { percentil: '75-89', significado: 'Alto' },
            '19-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCCO: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-10': { percentil: '40-60', significado: 'Indeciso' },
            '11-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        ARTE: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-10': { percentil: '40-60', significado: 'Indeciso' },
            '11-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        BURO: {
            '0-3': { percentil: '1-14', significado: 'Desinterés' },
            '4-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-11': { percentil: '40-60', significado: 'Indeciso' },
            '12-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        CCEP: {
            '0-3': { percentil: '1-14', significado: 'Desinterés' },
            '4-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        IIAA: {
            '0-3': { percentil: '1-14', significado: 'Desinterés' },
            '4-5': { percentil: '15-29', significado: 'Bajo' },
            '6-7': { percentil: '30-39', significado: 'Promedio Bajo' },
            '8-12': { percentil: '40-60', significado: 'Indeciso' },
            '13-14': { percentil: '61-74', significado: 'Promedio Alto' },
            '15-17': { percentil: '75-89', significado: 'Alto' },
            '18-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        FINA: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-10': { percentil: '40-60', significado: 'Indeciso' },
            '11-12': { percentil: '61-74', significado: 'Promedio Alto' },
            '13-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        LING: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-9': { percentil: '40-60', significado: 'Indeciso' },
            '10-12': { percentil: '61-74', significado: 'Promedio Alto' },
            '13-15': { percentil: '75-89', significado: 'Alto' },
            '16-22': { percentil: '90-99', significado: 'Muy Alto' },
        },
        JURI: {
            '0-2': { percentil: '1-14', significado: 'Desinterés' },
            '3-4': { percentil: '15-29', significado: 'Bajo' },
            '5-6': { percentil: '30-39', significado: 'Promedio Bajo' },
            '7-10': { percentil: '40-60', significado: 'Indeciso' },
            '11-13': { percentil: '61-74', significado: 'Promedio Alto' },
            '14-16': { percentil: '75-89', significado: 'Alto' },
            '17-22': { percentil: '90-99', significado: 'Muy Alto' },
        }
    };
    
    function obtenerPercentilYSignificado(genero, categoria, puntaje) {
        console.log(`Datos recibidos - Género: ${genero}, Categoría: ${categoria}, Puntaje: ${puntaje}`);

        if (!['Varon', 'Mujer'].includes(genero)) {
            console.error(`Género no válido: ${genero}`);
            return null;
        }
        if (!cuadroVarones[categoria] && !cuadroMujeres[categoria]) {
            console.error(`Categoría no válida: ${categoria}`);
            return null;
        }
        if (isNaN(puntaje)) {
            console.error(`Puntaje no es un número: ${puntaje}`);
            return null;
        }
    
        let cuadro = genero === 'Varon' ? cuadroVarones : cuadroMujeres;
        for (const rango in cuadro[categoria]) {
            let [min, max] = rango.split('-').map(Number);
            if (puntaje >= min && puntaje <= max) {
                return cuadro[categoria][rango];
            }
        }
    
        console.error(`No se encontró un rango para el puntaje ${puntaje} en la categoría ${categoria}`);
        return null; // En caso de no encontrar un rango adecuado
    }
    
    
    // Inicializa un objeto para contar las respuestas por categoría
    const conteoCategorias = {
        "VERA": 0,
        "CONS": 0,
        "CCFM": 0,
        "CCSS": 0,
        "CCNA": 0,
        "CCCO": 0,
        "ARTE": 0,
        "BURO": 0,
        "CCEP": 0,
        "IIAA": 0,
        "FINA": 0,
        "LING": 0,
        "JURI": 0
    };
    function capturarNuevaImagen() {
        console.log("Inicio de captura de imagen");
        const canvasGrafica = document.getElementById('miNuevaGrafica');  // Asegúrate de que 'miNuevaGrafica' sea el ID correcto de tu nuevo canvas
    
        if (canvasGrafica) {
            const imgData = canvasGrafica.toDataURL('image/png');
            const inputImagen = document.createElement('input');  // Crear un input para almacenar los datos de la imagen
            inputImagen.type = 'hidden';
            inputImagen.name = 'imagenDataNueva';  // Cambia el nombre para evitar conflictos
            inputImagen.value = imgData;
            document.getElementById('formulario').appendChild(inputImagen);  // Añadir el input al formulario
        } else {
            console.error("No se pudo encontrar el canvas de la nueva gráfica");
        }
    }    
    
    const checkboxes = document.querySelectorAll('.checkbox-nuevo');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Resetea los conteos
            for (let categoria in conteoCategorias) {
                conteoCategorias[categoria] = 0;
            }
            
            // Calcula los conteos
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const categoria = mapeoOpciones[cb.id];
                    conteoCategorias[categoria]++;
                }
            });

            // Mostrar resultados (puedes adaptarlo según tus necesidades)
            console.log(conteoCategorias);
        });
    });


    // Función que maneja el botón "Siguiente"
    btnSiguiente.addEventListener('click', function() {
        let seccionAnterior = document.getElementById('seccion' + seccionActual);
/*         if (!chequearRespuestas(seccionAnterior)) {
            return;  // Si no pasó la chequeo de respuestas, no hace nada más
        } */
        
        btnSiguiente.disabled = true;
        localStorage.setItem('formularioData', JSON.stringify(formToJSON(formulario)));

        seccionAnterior.style.display = 'none';
        actualizarCamposRequeridos(seccionAnterior, false);
        
        seccionActual++;
        
        let seccionNueva = document.getElementById('seccion' + seccionActual);
        if (seccionNueva) {
            seccionNueva.style.display = 'block';
            actualizarCamposRequeridos(seccionNueva, true);
        }
        
        btnAnterior.style.display = 'block';
        if (!document.getElementById('seccion' + (seccionActual + 1))) {
            btnSiguiente.style.display = 'none';
            btnEnviar.style.display = 'block';
        }
        // Cuando se llega a la sección 23...
        if (seccionActual === 24) {
            // Mostrar temporalmente el contenedor y la sección del gráfico
            document.getElementById('contenedorCaptura').style.display = 'block';
            document.getElementById('seccionGrafica').style.visibility = 'visible';

            calcularTotales();  // Renderizar el gráfico

            // Agregar un retraso antes de capturar la imagen y luego ocultar el gráfico
            setTimeout(() => {
                capturarImagen();  // Capturar la imagen del gráfico
                
                // Ocultar el contenedor y la sección del gráfico nuevamente
                document.getElementById('contenedorCaptura').style.display = 'none';
                document.getElementById('seccionGrafica').style.visibility = 'hidden';
            }, 1000);
        }
        if (seccionActual === 55) {
            // Mostrar temporalmente el contenedor y la sección del gráfico
            document.getElementById('contenedorCapturaSegundo').style.display = 'block';
            document.getElementById('seccionGraficaSegundo').style.visibility = 'visible';
            realizarCalculos();
            // Renderizar el gráfico

            // Agregar un retraso antes de capturar la imagen y luego ocultar el gráfico
            setTimeout(() => {
                capturarNuevaImagen()  // Capturar la imagen del gráfico
                
                // Ocultar el contenedor y la sección del gráfico nuevamente
                document.getElementById('contenedorCapturaSegundo').style.display = 'none';
                document.getElementById('seccionGraficaSegundo').style.visibility = 'hidden';
            }, 1000);
        }
        btnSiguiente.disabled = false;
    });

    // Función que maneja el botón "Anterior"
    btnAnterior.addEventListener('click', function() {
        btnAnterior.disabled = true; // Desactiva al principio

        let seccionActualDiv = document.getElementById('seccion' + seccionActual);
        seccionActualDiv.style.display = 'none';
        actualizarCamposRequeridos(seccionActualDiv, false);

        seccionActual--;

        let seccionAnteriorDiv = document.getElementById('seccion' + seccionActual);
        seccionAnteriorDiv.style.display = 'block';
        actualizarCamposRequeridos(seccionAnteriorDiv, true);

        btnSiguiente.style.display = 'block';
        btnEnviar.style.display = 'none';
        if (seccionActual === 1) {
            btnAnterior.style.display = 'none';
        }
        btnAnterior.disabled = false;  // Activa al final
    });

    // Función que maneja la lógica de envío del formulario
    btnEnviar.addEventListener('click', (e) => {
        e.preventDefault();
        
        btnEnviar.disabled = true;  // Deshabilita el botón Enviar
        
        const resultados = calcularTotales();

        const formData = new FormData(formulario);

        // Recoge y añade al FormData los horarios seleccionados
        const horariosIndividuales = document.querySelectorAll('.horario-individual');
        horariosIndividuales.forEach((div, index) => {
            // No uses el índice aquí ya que el nombre ya incluye el índice
            const selectDia = div.querySelector(`select[id^="diasCita"]`);
            const selectHora = div.querySelector(`select[id^="horaCita"]`);
            // Usa el índice al nombrar las claves del FormData
            formData.append(`diasCita[${index}]`, selectDia ? selectDia.value : '');
            formData.append(`horaCita[${index}]`, selectHora ? selectHora.value : '');
        });

        let generoSeleccionado = document.getElementById('generoSeleccionado').value;
        if (!generoSeleccionado) {
            alert("Por favor, selecciona un género antes de continuar.");
            btnEnviar.disabled = false;  // Reactiva el botón Enviar
            return; // Detiene la ejecución de la función si no se ha seleccionado un género
        }
        console.log("Género al calcular: ", generoSeleccionado);

        let puntajeCCFM = calcularCCFM();
        let resultadoCCFM = obtenerPercentilYSignificado(generoSeleccionado, 'CCFM', puntajeCCFM);
        console.log(`CCFM - Percentil: ${resultadoCCFM.percentil}, Significado: ${resultadoCCFM.significado}`);
    
        let puntajeCCSS = calcularCCSS();
        let resultadoCCSS = obtenerPercentilYSignificado(generoSeleccionado, 'CCSS', puntajeCCSS);
        console.log(`CCSS - Percentil: ${resultadoCCSS.percentil}, Significado: ${resultadoCCSS.significado}`);
    
        let puntajeCCNA = calcularCCNA();
        let resultadoCCNA = obtenerPercentilYSignificado(generoSeleccionado, 'CCNA', puntajeCCNA);
        console.log(`CCNA - Percentil: ${resultadoCCNA.percentil}, Significado: ${resultadoCCNA.significado}`);
    
        let puntajeCCCO = calcularCCCO();
        let resultadoCCCO = obtenerPercentilYSignificado(generoSeleccionado, 'CCCO', puntajeCCCO);
        console.log(`CCCO - Percentil: ${resultadoCCCO.percentil}, Significado: ${resultadoCCCO.significado}`);
    
        let puntajeARTE = calcularARTE();
        let resultadoARTE = obtenerPercentilYSignificado(generoSeleccionado, 'ARTE', puntajeARTE);
        console.log(`ARTE - Percentil: ${resultadoARTE.percentil}, Significado: ${resultadoARTE.significado}`);
    
        let puntajeBURO = calcularBURO();
        let resultadoBURO = obtenerPercentilYSignificado(generoSeleccionado, 'BURO', puntajeBURO);
        console.log(`BURO - Percentil: ${resultadoBURO.percentil}, Significado: ${resultadoBURO.significado}`);
    
        let puntajeCCEP = calcularCCEP();
        let resultadoCCEP = obtenerPercentilYSignificado(generoSeleccionado, 'CCEP', puntajeCCEP);
        console.log(`CCEP - Percentil: ${resultadoCCEP.percentil}, Significado: ${resultadoCCEP.significado}`);
    
        let puntajeIIAA = calcularIIAA();
        let resultadoIIAA = obtenerPercentilYSignificado(generoSeleccionado, 'IIAA', puntajeIIAA);
        console.log(`IIAA - Percentil: ${resultadoIIAA.percentil}, Significado: ${resultadoIIAA.significado}`);
    
        let puntajeFINA = calcularFINA();
        let resultadoFINA = obtenerPercentilYSignificado(generoSeleccionado, 'FINA', puntajeFINA);
        console.log(`FINA - Percentil: ${resultadoFINA.percentil}, Significado: ${resultadoFINA.significado}`);
    
        let puntajeLING = calcularLING();
        let resultadoLING = obtenerPercentilYSignificado(generoSeleccionado, 'LING', puntajeLING);
        console.log(`LING - Percentil: ${resultadoLING.percentil}, Significado: ${resultadoLING.significado}`);
    
        let puntajeJURI = calcularJURI();
        let resultadoJURI = obtenerPercentilYSignificado(generoSeleccionado, 'JURI', puntajeJURI);
        console.log(`JURI - Percentil: ${resultadoJURI.percentil}, Significado: ${resultadoJURI.significado}`);
            

        const valorVera = calcularVera();
        const valorCons = calcularCons();
        const valorCCFM = calcularCCFM();
        const valorCCSS = calcularCCSS();
        const valorCCNA = calcularCCNA();
        const valorCCCO = calcularCCCO();
        const valorARTE = calcularARTE();
        const valorBURO = calcularBURO();
        const valorCCEP = calcularCCEP();
        const valorIIAA = calcularIIAA();
        const valorFINA = calcularFINA();
        const valorLING = calcularLING();
        const valorJURI = calcularJURI();

        formData.append('valorVera', valorVera);
        formData.append('valorCons', valorCons);
        formData.append('valorCCFM', valorCCFM);
        formData.append('valorCCSS', valorCCSS);
        formData.append('valorCCNA', valorCCNA);
        formData.append('valorCCCO', valorCCCO);
        formData.append('valorARTE', valorARTE);
        formData.append('valorBURO', valorBURO);
        formData.append('valorCCEP', valorCCEP);
        formData.append('valorIIAA', valorIIAA);
        formData.append('valorFINA', valorFINA);
        formData.append('valorLING', valorLING);
        formData.append('valorJURI', valorJURI);
        
        formData.append('valorR', resultados.fila1);
        formData.append('valorI', resultados.fila2);
        formData.append('valorS', resultados.fila3);
        formData.append('valorC', resultados.fila4);
        formData.append('valorE', resultados.fila5);
        formData.append('valorA', resultados.fila6);
        formData.append('valorVacio', resultados.fila7);

        formData.append('resultadoCCFM', JSON.stringify(resultadoCCFM));
        formData.append('resultadoCCSS', JSON.stringify(resultadoCCSS));
        formData.append('resultadoCCNA', JSON.stringify(resultadoCCNA));
        formData.append('resultadoCCCO', JSON.stringify(resultadoCCCO));
        formData.append('resultadoARTE', JSON.stringify(resultadoARTE));
        formData.append('resultadoBURO', JSON.stringify(resultadoBURO));
        formData.append('resultadoCCEP', JSON.stringify(resultadoCCEP));
        formData.append('resultadoIIAA', JSON.stringify(resultadoIIAA));
        formData.append('resultadoFINA', JSON.stringify(resultadoFINA));
        formData.append('resultadoLING', JSON.stringify(resultadoLING));
        formData.append('resultadoJURI', JSON.stringify(resultadoJURI));

        formData.append('generoSeleccionado', generoSeleccionado);

        console.log('Datos a enviar:', [...formData.entries()]);  

        fetch('/procesar', {
            method: 'POST',
            body: formData        
         })
        .then(res => {
            // Check if the response is JSON
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return res.json();
            } else {
                // If it's not JSON, throw an error
                throw new Error('Received non-JSON response from server');
            }
        })  
        .then(data => {
            // Muestra el mensaje de éxito
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.textContent = 'Enviado correctamente';
            mensajeExito.style.display = 'block';
        
            // Asume que el servidor responde con una URL de redirección
            setTimeout(() => {
                window.location = '/';  // Asume que '/' es la URL de tu página de inicio
            }, 3000);  // Redirecciona después de 2 segundos para que el usuario pueda ver el mensaje
        })
        
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error.message);
            btnEnviar.disabled = false;  // Re-habilita el botón Enviar en caso de error
        });   
    });

    // Inicialización
    for (let i = 2; i <= 10; i++) {
        let seccion = document.getElementById('seccion' + i);
        if (seccion) {
            actualizarCamposRequeridos(seccion, false);
        }
    }
    btnAnterior.style.display = 'none';

});
