document.querySelector('.hamburger-menu').addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});

document.getElementById('favorite-btn').addEventListener('click', function() {
    this.style.backgroundColor = '#4CAF50';
    this.textContent = 'Favorilere Eklendi!';
});

function scrollCharacters(direction) {
    const characterGrid = document.querySelector('.character-grid');
    const scrollAmount = 250; 
    characterGrid.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

document.querySelectorAll('.episode').forEach(episode => {
    episode.addEventListener('mouseover', () => {
        episode.classList.add('animate__animated', 'animate__flipInX'); 
    });

    episode.addEventListener('animationend', () => {
        episode.classList.remove('animate__animated', 'animate__flipInX'); 
    });
});

const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { 
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});