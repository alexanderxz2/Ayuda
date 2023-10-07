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
    
    // Función para actualizar la imagen según la sección
    function actualizarImagen() {
        if (seccionActual - 1 < imagenesPorSeccion.length) {
            imagenSeccion.src = imagenesPorSeccion[seccionActual - 1];
        } else {
            imagenSeccion.src = '';  // Puedes poner una imagen por defecto aquí si lo deseas
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
        if (!chequearRespuestas(seccionAnterior)) {
            return;  // Si no pasó la chequeo de respuestas, no hace nada más
        }
        btnSiguiente.disabled = true;
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
