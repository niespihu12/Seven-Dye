const endTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 days from now

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.promo-timer').textContent = 'Expired!';
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    const images = ["src/img/image1.jpg", "src/img/image2.jpg", "src/img/image3.jpg"];
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showImage(index) {
        document.getElementById('carousel-image').src = images[index];
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            currentIndex = parseInt(e.target.dataset.index);
            showImage(currentIndex);
        });
    });