document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('mainImage');
    const fullscreenSlider = document.getElementById('fullscreenSlider');
    const slidesContainer = document.getElementById('slidesContainer');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;
    let startX = 0;
    let initialDistance = null;
    let currentScale = 1;

    mainImage.addEventListener('click', function() {
        fullscreenSlider.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        goToSlide(0);
        resetZoom(); // Сброс зума при открытии
    });

    closeBtn.addEventListener('click', closeSlider);

    function closeSlider() {
        fullscreenSlider.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetZoom();
    }

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlide = index;
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        resetZoom(); // Сброс зума при переключении слайдов
    }

    // Кнопки вперед/назад
    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });

    slidesContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    slidesContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    slidesContainer.addEventListener('touchend', handleTouchEnd);

    // Закрытие по клику вне картинки
    fullscreenSlider.addEventListener('click', function(e) {
        if (e.target === fullscreenSlider) {
            closeSlider();
        }
    });

    // Сброс масштаба
    function resetZoom() {
        currentScale = 1;
        slides.forEach(slide => {
            slide.style.transform = 'scale(1)';
            slide.style.transformOrigin = 'center center';
        });
    }

    function handleTouchStart(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = getDistance(
                e.touches[0].clientX, 
                e.touches[0].clientY,
                e.touches[1].clientX,
                e.touches[1].clientY
            );
        } else if (e.touches.length === 1) {
            startX = e.touches[0].clientX;
        }
    }

    function handleTouchMove(e) {
        // Зум двумя пальцами
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getDistance(
                e.touches[0].clientX,
                e.touches[0].clientY,
                e.touches[1].clientX,
                e.touches[1].clientY
            );

            if (initialDistance !== null) {
                const scale = currentDistance / initialDistance;
                currentScale = Math.max(1, Math.min(scale, 3)); // Ограничиваем масштаб от 1x до 3x
                slides[currentSlide].style.transform = `scale(${currentScale})`;
            }
        }
    }

    function handleTouchEnd(e) {
        // Определяем свайп только если не было зума
        if (currentScale <= 1.1 && e.changedTouches.length === 1) {
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (diffX > 50) goToSlide(currentSlide + 1); // Свайп влево
            if (diffX < -50) goToSlide(currentSlide - 1); // Свайп вправо
        }
        
        initialDistance = null;
    }

    // Вычисление расстояния между двумя точками
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
});