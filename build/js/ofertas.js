document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = track.querySelectorAll('.product-card');
    const prevButton = document.querySelector('.carousel-nav .prev');
    const nextButton = document.querySelector('.carousel-nav .next');
    
    let currentIndex = 0;
    const slidesPerView = window.innerWidth < 768 ? 1 : 
                         window.innerWidth < 1024 ? 2 : 4;
    const totalSlides = slides.length - slidesPerView;

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 16;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= totalSlides;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < totalSlides) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Funcionalidad de favoritos
    document.querySelectorAll('.favorite').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                
                const heart = document.createElement('div');
                heart.classList.add('heart-animation');
                this.appendChild(heart);
                setTimeout(() => heart.remove(), 1000);
                
                showNotification('¡Añadido a favoritos!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Eliminado de favoritos');
            }
        });
    });

    // Funcionalidad de vista rápida
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.product-card');
            const productData = {
                image: card.querySelector('img').src,
                title: card.querySelector('.product-title a').textContent,
                price: card.querySelector('.product-price').textContent,
                rating: card.querySelector('.rating-count').textContent
            };
            
            showQuickViewModal(productData);
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    }

    function showQuickViewModal(productData) {
        const modal = document.createElement('div');
        modal.classList.add('quick-view-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="modal-body">
                    <div class="product-image">
                        <img src="${productData.image}" alt="${productData.title}">
                    </div>
                    <div class="product-details">
                        <h3>${productData.title}</h3>
                        <div class="price">${productData.price}</div>
                        <div class="rating">
                            <div class="stars">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <span>${productData.rating}</span>
                        </div>
                        <div class="product-description">
                            <p>Chaqueta denim con diseño tie-dye único. Perfecta para un look casual y moderno. Material de alta calidad y confección premium.</p>
                        </div>
                        <div class="size-section">
                            <h4>Talla</h4>
                            <div class="size-options">
                                <button>S</button>
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                            </div>
                        </div>
                        <div class="quantity-section">
                            <h4>Cantidad</h4>
                            <div class="quantity-controls">
                                <button class="decrease">-</button>
                                <input type="number" value="1" min="1" max="10">
                                <button class="increase">+</button>
                            </div>
                        </div>
                        <button class="add-to-cart">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);

        // Event listeners del modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });

        // Funcionalidad de cantidad
        const quantityInput = modal.querySelector('.quantity-controls input');
        modal.querySelector('.decrease').addEventListener('click', () => {
            if (quantityInput.value > 1) quantityInput.value--;
        });
        modal.querySelector('.increase').addEventListener('click', () => {
            if (quantityInput.value < 10) quantityInput.value++;
        });

        // Funcionalidad de tallas
        modal.querySelectorAll('.size-options button').forEach(button => {
            button.addEventListener('click', () => {
                modal.querySelectorAll('.size-options button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
            });
        });
    }

    // Soporte para swipe en móviles
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalSlides) {
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Inicialización
    updateCarousel();

    // Actualizar en resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
});