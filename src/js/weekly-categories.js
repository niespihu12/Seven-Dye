document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.categories-slider');
    const items = slider.querySelectorAll('.category-item');
    const prevButton = document.querySelector('.nav-buttons .prev');
    const nextButton = document.querySelector('.nav-buttons .next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    let autoplayInterval;
    const autoplayDelay = 3000; // 3 segundos entre cada slide

    // Clonar los primeros elementos al final para el efecto infinito
    const firstItemsClone = [...items].slice(0, 4).map(item => item.cloneNode(true));
    firstItemsClone.forEach(clone => slider.appendChild(clone));

    function updateSlider(direction = null) {
        const itemWidth = items[0].offsetWidth + 16; // 16px es el gap

        if (direction === 'next') {
            currentIndex++;
            if (currentIndex >= totalItems) {
                // Cuando llegue al final, volver al inicio sin transición
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    slider.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease';
                    }, 50);
                }, 500);
            }
        } else if (direction === 'prev') {
            if (currentIndex <= 0) {
                slider.style.transition = 'none';
                currentIndex = totalItems - 1;
                slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease';
                    currentIndex--;
                }, 50);
            } else {
                currentIndex--;
            }
        }

        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

        // Actualizar clases activas
        items.forEach((item, index) => {
            if (index === currentIndex % totalItems) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function startAutoplay() {
        stopAutoplay(); // Limpiar cualquier intervalo existente
        autoplayInterval = setInterval(() => {
            updateSlider('next');
        }, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    nextButton.addEventListener('click', () => {
        stopAutoplay();
        updateSlider('next');
        startAutoplay();
    });

    prevButton.addEventListener('click', () => {
        stopAutoplay();
        updateSlider('prev');
        startAutoplay();
    });

    // Mouse events para pausar/reanudar
    const sliderContainer = document.querySelector('.categories-container');
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        stopAutoplay();
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateSlider('next');
            } else {
                updateSlider('prev');
            }
        }
    }

    // Inicialización
    updateSlider();
    startAutoplay();
});