document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrusel iniciado'); // Para verificar que el script se ejecuta

    const textos = document.querySelectorAll('.carrusel-texto .texto');
    let indiceActual = 0;

    function cambiarTexto() {
        textos.forEach(texto => texto.classList.remove('activo'));
        
      
        indiceActual = (indiceActual + 1) % textos.length;
        
        textos[indiceActual].classList.add('activo');
    }

    // Iniciar el carrusel
    setInterval(cambiarTexto, 3000);
});