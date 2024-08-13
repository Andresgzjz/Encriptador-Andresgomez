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


    function esTextoValido(texto) {
      
        const regex = /^[a-z]+$/;
        return regex.test(texto);
    }

    // Copiar
    function copiarTexto() {
        resultadoTextarea.select();
        document.execCommand("copy");
    }

    
    function actualizarVisibilidad(mensaje = "") {
        contenedorEncriptado.style.display = mensaje ? "block" : "none";
        textoEncriptado.style.display = mensaje ? "none" : "block"; 
        botonCopiar.style.visibility = mensaje ? "hidden" : "visible"; 
        if (mensaje) {
            mensajeError.textContent = mensaje;
            contenedorEncriptado.appendChild(mensajeError);
        } else {
            if (contenedorEncriptado.contains(mensajeError)) {
                contenedorEncriptado.removeChild(mensajeError);
            }
        }
    }

    // botón de cifrar
    botonCifrar.addEventListener("click", function() {
        const texto = textoLimpio.value;
        if (!esTextoValido(texto)) {
            actualizarVisibilidad("No se puede cifrar dado que contiene caracteres inválidos o acentos. Por favor, intente de nuevo.");
            setTimeout(() => {
                actualizarVisibilidad();
            }, 5000); // 5 segundos
            return;
        }
        const textoEncriptadoResultado = encriptarTexto(texto);
        resultadoTextarea.value = textoEncriptadoResultado;
        actualizarVisibilidad();
    });

    // botón de descifrar
    botonDescifrar.addEventListener("click", function() {
        const texto = textoLimpio.value;
        if (!esTextoValido(texto)) {
            actualizarVisibilidad("No se puede descifrar dado que contiene caracteres inválidos o acentos. Por favor, intente de nuevo.");
            setTimeout(() => {
                actualizarVisibilidad();
            }, 20000); // 20 segundos
            return;
        }
        const textoDesencriptadoResultado = desencriptarTexto(texto);
        resultadoTextarea.value = textoDesencriptadoResultado;
        actualizarVisibilidad();
    });

    // botón de copiar
    botonCopiar.addEventListener("click", copiarTexto);
});