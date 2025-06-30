const profile = document.getElementById('profile');
const home = document.getElementById('home');
const leaderboard = document.getElementById('leaderboard');
function getCurrentPage() {
  const path = window.location.pathname;
  return path.split('/').pop() || 'mainpage.html';
}

function normalizeUrl(url) {
  if (url.startsWith('../')) {
    return url.split('/').pop();
  }
  return url;
}

let currentPage = getCurrentPage();

function navigateWithTransition(url) {
  const targetPage = normalizeUrl(url);
  
  if (targetPage === currentPage) return;
    document.body.classList.add('fade-out');
    setTimeout(() => {
    window.location.href = url;
    }, 300);
}

profile.addEventListener('click', () => {
    navigateWithTransition('../pages/profile.html');
});

home.addEventListener('click', () => {
    navigateWithTransition('../pages/mainpage.html');
});

leaderboard.addEventListener('click', () => {
    navigateWithTransition('../pages/leaderboard.html');
});

window.addEventListener('load', () => {
    document.body.classList.remove('fade-out');
});

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('touchstart', function() {
        this.classList.add('active-touch');
    });
      
    item.addEventListener('touchend', function() {
        this.classList.remove('active-touch');
    });
});