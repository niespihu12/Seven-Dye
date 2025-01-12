document.addEventListener('DOMContentLoaded', function() {
    const textos = document.querySelectorAll('.texto');
    let indiceActual = 0;

    // Mostrar el primer texto
    textos[0].classList.add('activo');

    function cambiarTexto() {
        // Ocultar texto actual
        textos[indiceActual].classList.remove('activo');
        
        // Pasar al siguiente texto
        indiceActual = (indiceActual + 1) % textos.length;
        
        // Mostrar nuevo texto
        textos[indiceActual].classList.add('activo');
    }

    // Cambiar texto cada 3 segundos
    setInterval(cambiarTexto, 3000);
});