document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.featured-video video');
    const videoContainer = document.querySelector('.featured-video');

    // Eliminar el botón y overlay ya que no los necesitaremos
    const videoOverlay = document.querySelector('.video-overlay');
    const playButton = document.querySelector('.play-button');
    if (videoOverlay) videoOverlay.remove();
    if (playButton) playButton.remove();

    // Función para verificar si el elemento está visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    // Función para manejar el scroll y reproducir/pausar el video
    function handleVideoPlayback() {
        if (isElementInViewport(videoContainer)) {
            if (video.paused) {
                video.play()
                    .catch(error => {
                        console.log("Reproducción automática bloqueada por el navegador:", error);
                    });
            }
        } else {
            if (!video.paused) {
                video.pause();
            }
        }
    }

    // Escuchar el evento scroll
    window.addEventListener('scroll', handleVideoPlayback);

    // Verificar inicialmente si el video está visible
    handleVideoPlayback();
});