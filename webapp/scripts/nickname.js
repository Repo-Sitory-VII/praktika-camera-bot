document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('NAME');
    const container = document.querySelector('.information');
    // Проверяем, нужна ли анимация
    const delay = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));
    if (nameElement.scrollWidth > container.offsetWidth) {
        // Настройки анимации
        const duration = nameElement.textContent.length * 333;
        let startTime = null;
        let distance = 0;
        function sleep(millis) {
            var t = (new Date()).getTime();
            var i = 0;
            while (((new Date()).getTime() - t) < millis) {
                i++;
            }
        }
        function startAnimation() {            
            // Сбрасываем позицию
            nameElement.style.transform = 'translateX(0)';
            
            
            const textWidth = nameElement.scrollWidth;
            const containerWidth = container.offsetWidth;
            distance = textWidth + containerWidth;
            startTime = null; // Сброс времени начала
            animationId = requestAnimationFrame(animate);
        }
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const translateX = -progress * distance;
            if (Math.round(translateX) === -270) {
                nameElement.style.transition = 'none'
                nameElement.style.transform = 'translateX(1000)'
                // Немедленный старт новой анимации                
                startAnimation()
            }
            nameElement.style.transform = `translateX(${translateX}px)`;
            
            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            } else {
                
                // Мгновенный возврат в начало
                nameElement.style.transition = 'none';
                nameElement.style.transform = 'translateX(0)';
                // Немедленный старт новой анимации
                nameElement.style.position.left = '0px';
                
                startAnimation();
                
            }
        }
        
        startAnimation();
        
        // Перезапуск при изменении размера
        window.addEventListener('resize', function() {
            if (nameElement.scrollWidth > container.offsetWidth) {
                startAnimation();
            }
        });
    }
    else {
        nameElement.style.position.left = '0px';
    }
});