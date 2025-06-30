const achievements = document.getElementById('block achiv');

function navigateWithTransition(url) {  
    document.body.classList.add('fade-out');
    setTimeout(() => {
    window.location.href = url;
    }, 300);
}

achievements.addEventListener('click', function() {
    navigateWithTransition('../pages/achievements.html');
});