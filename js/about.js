const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe semua elemen foto
document.addEventListener('DOMContentLoaded', function() {
    const photoElements = document.querySelectorAll('.photo-top, .photo-bottom');
    photoElements.forEach(el => observer.observe(el));
});