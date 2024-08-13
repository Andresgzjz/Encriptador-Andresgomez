document.addEventListener("DOMContentLoaded", function() {

    const textoLimpio = document.getElementById("texto__limpio");
    const textoEncriptado = document.getElementById("texto__encriptado");
    const resultadoTextarea = document.querySelector(".resultado");
    const botonCifrar = document.getElementById("btncifrar");
    const botonDescifrar = document.getElementById("btndescifrar");
    const botonCopiar = document.querySelector(".boton__copiar");
    const contenedorEncriptado = document.querySelector(".contenedor__encriptado");
    const mensajeError = document.createElement("p");

    // Encriptador
    function encriptarTexto(texto) {
        return texto
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
    }

    // Desencriptado
    function desencriptarTexto(texto) {
        return texto
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");
    }

    // Validar texto
    function esTextoValido(texto) {
        // Regex para letras minúsculas y espacios
        const regex = /^[a-z\s]+$/;
        return regex.test(texto);
    }

    // Copiar
    function copiarTexto() {
        resultadoTextarea.select();
        document.execCommand("copy");
    }

    // Actualizar visibilidad del contenedor y área de texto
    function actualizarVisibilidad(mensaje = "") {
        if (mensaje) {
            contenedorEncriptado.style.display = "block";
            textoEncriptado.style.display = "none";
            botonCopiar.style.visibility = "hidden";
            mensajeError.textContent = mensaje;
            contenedorEncriptado.appendChild(mensajeError);
        } else {
            contenedorEncriptado.style.display = "none";
            textoEncriptado.style.display = "block"; 
            botonCopiar.style.visibility = "visible"; 
            if (contenedorEncriptado.contains(mensajeError)) {
                contenedorEncriptado.removeChild(mensajeError);
            }
        }
    }

    // Restablecer estado después de un mensaje de error
    function restablecerEstado() {
        setTimeout(() => {
            textoLimpio.value = ""; 
            resultadoTextarea.value = ""; 
            actualizarVisibilidad(); 
        }, 5000); // 5 segundos
    }

    // botón de cifrar
    botonCifrar.addEventListener("click", function() {
        let texto = textoLimpio.value;
        if (typeof texto !== 'string') {
            texto = String(texto);
        }
        if (!esTextoValido(texto)) {
            actualizarVisibilidad("No se puede cifrar dado que contiene caracteres inválidos o acentos. Por favor, intente de nuevo.");
            restablecerEstado(); 
            texto = null; 
            return;
        }
        const textoEncriptadoResultado = encriptarTexto(texto);
        resultadoTextarea.value = textoEncriptadoResultado;
        actualizarVisibilidad();
        texto = null; 
    });

    // botón de descifrar
    botonDescifrar.addEventListener("click", function() {
        let texto = textoLimpio.value;
        if (typeof texto !== 'string') {
            texto = String(texto);
        }
        if (!esTextoValido(texto)) {
            actualizarVisibilidad("No se puede descifrar dado que contiene caracteres inválidos o acentos. Por favor, intente de nuevo.");
            restablecerEstado();
            texto = null; 
            return;
        }
        const textoDesencriptadoResultado = desencriptarTexto(texto);
        resultadoTextarea.value = textoDesencriptadoResultado;
        actualizarVisibilidad();
        texto = null; 
    });

    // botón de copiar
    botonCopiar.addEventListener("click", copiarTexto);

    // Verifica la visibilidad cuando cambia el contenido del texto limpio
    textoLimpio.addEventListener("input", function() {
        if (textoLimpio.value.trim() === "") {
            contenedorEncriptado.style.display = "block";
            textoEncriptado.style.display = "none";
            botonCopiar.style.visibility = "hidden";
        }
    });

});