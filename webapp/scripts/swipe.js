document.addEventListener('DOMContentLoaded', function() {
    const previewImage = document.getElementById('mainImage');
    const yesHint = document.getElementById('yesHint');
    const noHint = document.getElementById('noHint');
    let touchStartX = 0;
    let isSwiping = false;
    let start_count = 0;

    // Скрываем подсказки изначально
    yesHint.style.display = 'none';
    noHint.style.display = 'none';

    previewImage.addEventListener('touchstart', handleTouchStart, { passive: true });
    previewImage.addEventListener('touchmove', handleTouchMove, { passive: false });
    previewImage.addEventListener('touchend', handleTouchEnd, { passive: true });

    previewImage.addEventListener('mousedown', handleMouseDown);
    previewImage.addEventListener('mousemove', handleMouseMove);
    previewImage.addEventListener('mouseup', handleMouseUp);
    previewImage.addEventListener('mouseleave', handleMouseLeave);
    
    if (document.getElementById('fullscreenSlider').style.display === 'block') {
        return;
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
    }

    function handleTouchMove(e) {
        if (!isSwiping) return;
        e.preventDefault();
        
        const touchX = e.touches[0].clientX;
        const diff = touchX - touchStartX;
        
        updateSwipeFeedback(diff);
    }

    function handleTouchEnd(e) {
        if (!isSwiping) return;
        
        const touchX = e.changedTouches[0].clientX;
        handleSwipeEnd(touchX);
    }

    function handleMouseDown(e) {
        touchStartX = e.clientX;
        isSwiping = true;
    }

    function handleMouseMove(e) {
        if (!isSwiping) return;
        
        const mouseX = e.clientX;
        const diff = mouseX - touchStartX;
        
        updateSwipeFeedback(diff);
    }

    function handleMouseUp(e) {
        if (!isSwiping) return;
        
        const mouseX = e.clientX;
        handleSwipeEnd(mouseX);
    }

    function handleMouseLeave() {
        if (isSwiping) {
            resetSwipe();
        }
    }

    function updateSwipeFeedback(diff) {
        if (diff > 30) {
            yesHint.style.display = 'block';
            noHint.style.display = 'none';
            yesHint.style.opacity = Math.min(0.7, Math.abs(diff)/100);
        } else if (diff < -30) {
            yesHint.style.display = 'none';
            noHint.style.display = 'block';
            noHint.style.opacity = Math.min(0.7, Math.abs(diff)/100);
        } else {
            yesHint.style.opacity = 0;
            noHint.style.opacity = 0;
        }
        
        previewImage.style.transform = `translateX(${diff * 0.3}px)`;
    }

    function handleSwipeEnd(endX) {
        const diff = endX - touchStartX;
        const threshold = 100; // Минимальное расстояние для срабатывания
        
        if (diff > threshold) {
            handleChoice(true); // Свайп вправо - ДА
        } else if (diff < -threshold) {
            handleChoice(false); // Свайп влево - НЕТ
        }
        
        resetSwipe();
    }

    function resetSwipe() {
        isSwiping = false;
        yesHint.style.opacity = 0;
        noHint.style.opacity = 0;
        previewImage.style.transform = '';
        
        setTimeout(() => {
            yesHint.style.display = 'none';
            noHint.style.display = 'none';
        }, 300);
    }

    const photoList = [
        '../resources/cameras/1.jpg',
        '../resources/cameras/2.jpg',
        '../resources/cameras/3.jpg',
    ];
    let currentPhotoIndex = 0;

    function handleChoice(isYes) {        
        const direction = isYes ? 1 : -1;
        const viewportWidth = window.innerWidth;
        const flyOutDistance = viewportWidth * 1.5;
        const rotation = direction * 25;
        
        // Анимация "улетания" текущего фото
        previewImage.style.willChange = 'transform, opacity';
        previewImage.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s linear';
        previewImage.style.transform = `translateX(${direction * flyOutDistance}px) rotate(${rotation}deg)`;
        previewImage.style.opacity = '0';
        
        // Подготовка новой фотографии
        const newPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
        const tempImg = new Image();
        tempImg.src = photoList[newPhotoIndex];
        
        tempImg.onload = function() {
            // Задержка для завершения первой анимации
            setTimeout(() => {
                // Меняем фото
                currentPhotoIndex = newPhotoIndex;
                previewImage.src = this.src;
                
                previewImage.style.transition = 'none';
                previewImage.style.transform = `translateX(${-direction * viewportWidth * 0.3}px)`;
                previewImage.style.opacity = '0';
                
                requestAnimationFrame(() => {
                    previewImage.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s linear';
                    previewImage.style.transform = 'translateX(0) rotate(0deg)';
                    previewImage.style.opacity = '1';
                    
                    // 8. Восстанавливаем взаимодействие
                    setTimeout(() => {
                        previewImage.style.willChange = 'auto';
                    }, 700);
                });
            }, 600);
        };
        start_count += 1;
        let count = document.getElementById('count');
        count.textContent = `${start_count}`;
    }

    function preloadImages() {
        photoList.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    preloadImages();

    previewImage.onload = function() {
        this.style.opacity = 0;
        setTimeout(() => {
            this.style.transition = 'opacity 0.3s ease';
            this.style.opacity = 1;
        }, 50);
    };
});