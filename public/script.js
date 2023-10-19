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
        console.log('Fila 1:', fila1);
        console.log('Fila 2:', fila2);
        console.log('Fila 3:', fila3);
        console.log('Fila 4:', fila4);
        console.log('Fila 5:', fila5);
        console.log('Fila 6:', fila6);
        console.log('Fila 7:', fila7);
        
        // Aquí, puedes hacer lo que necesites con los valores de fila1, fila2, ..., fila6
        // Por ejemplo, enviar estos valores al servidor o actualizar la interfaz de usuario
        mostrarGrafica(fila1, fila2, fila3, fila4, fila5, fila6);

    }    
    let miGrafico;
    function mostrarGrafica(fila1, fila2, fila3, fila4, fila5, fila6) {

        document.getElementById('seccionGrafica').style.display = 'hidden';
        const ctx = document.getElementById('miGrafica').getContext('2d');

        if (miGrafico) {
            miGrafico.destroy();
        }
        
        miGrafico = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['R', 'I', 'S', 'C', 'E', 'A'],
                datasets: [{
                    label: 'Número de respuestas',
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
                    label: 'Conexión',
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
                        display: true  // Esto oculta la leyenda
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
            }
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
document.addEventListener("DOMContentLoaded", function() {

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
        if (seccionActual === 23) {  // Asumiendo que la sección 21 es la sección previa a la sección 22
            calcularTotales();
            setTimeout(capturarImagen, 1000);
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
        
        calcularTotales();

        console.log('Datos a enviar:', [...new FormData(formulario).entries()]);
    
        fetch('/procesar', {
            method: 'POST',
            body: new FormData(formulario)
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
