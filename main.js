// DOM Elements
const loader = document.getElementById('loader');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const fadeIns = document.querySelectorAll('.fade-in');
const profileImg = document.querySelector('.profile-img');
const projectLinks = document.querySelectorAll('.project-link');
const modal = document.createElement('div');
modal.classList.add('modal');
document.body.appendChild(modal);

// Project Data for Modal (Ganti dengan data Anda)
const projectData = [
    {
        title: 'Project 1',
        description: 'Deskripsi lengkap project 1. Teknologi: React, Node.js. Hasil: Aplikasi web dengan 10k+ users.',
        image: 'project1-large.jpg', // Ganti dengan gambar besar
        link: 'https://github.com/yourrepo/project1' // Link demo/repo
    },
    {
        title: 'Project 2',
        description: 'Deskripsi lengkap project 2. Fokus pada UI/UX dan integrasi API.',
        image: 'project2-large.jpg',
        link: 'https://github.com/yourrepo/project2'
    },
    {
        title: 'Project 3',
        description: 'Deskripsi lengkap project 3. Inovasi di bidang [bidang Anda].',
        image: 'project3-large.jpg',
        link: 'https://github.com/yourrepo/project3'
    }
];

// 1. Loading Screen with Progress
window.addEventListener('load', () => {
    const progress = document.createElement('div');
    progress.style.cssText = 'position: absolute; bottom: 0; left: 0; width: 0%; height: 4px; background: #d4af37; transition: width 0.5s ease;';
    loader.appendChild(progress);
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 15;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 500);
        }
        progress.style.width = width + '%';
    }, 100);
});

// 2. Smooth Scrolling & Active Nav
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Update active nav on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// 3. Mobile Hamburger Menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 4. Typing Effect di Home
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.color = '#d4af37';
    cursor.style.animation = 'blink 1s infinite';
    element.appendChild(cursor);
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            cursor.remove();
        }
    }
    type();
}

// Inisialisasi typing setelah load
window.addEventListener('load', () => {
    const homeP = document.querySelector('.home p');
    if (homeP) {
        typeWriter(homeP, homeP.textContent, 50); // Ganti textContent dengan teks asli di HTML
    }
});

// Tambah CSS untuk blink (tambah di style.css jika belum)
const style = document.createElement('style');
style.textContent = '@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }';
document.head.appendChild(style);

// 5. Parallax Effect pada Foto Profil
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (profileImg) {
        profileImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// 6. Counter Animation di About (Asumsikan elemen <span class="counter">X tahun</span> di HTML About)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start);
    }, 16);
}

// Trigger counter saat section visible
const aboutSection = document.getElementById('about');
const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Counter
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            
            // Progress Bars di CV (lihat poin 8)
            if (entry.target.id === 'cv') {
                animateProgressBars();
            }
        }
    });
}, observerOptions);

// Observe sections
sections.forEach(section => observer.observe(section));

// Untuk fade-in stagger
fadeIns.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

window.addEventListener('scroll', () => {
    fadeIns.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
});

// 7. Hover Glow Effect pada Cards (Partikel-like glow)
const cards = document.querySelectorAll('.project-card, .timeline-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
        // Tambah subtle particle (canvas mini, opsional - ringan)
        createGlowParticles(card);
    });
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
});

function createGlowParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px; height: 4px;
            background: #d4af37;
            border-radius: 50%;
            pointer-events: none;
            animation: glowFloat 1s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        element.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Tambah CSS untuk glowFloat (tambah di style.css)
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes glowFloat {
        0% { opacity: 1; transform: scale(1) translateY(0); }
        100% { opacity: 0; transform: scale(0) translateY(-20px); }
    }
`;
document.head.appendChild(glowStyle);

// 8. Modal untuk Projects
projectLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const data = projectData[index];
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${data.image}" alt="${data.title}">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <a href="${data.link}" target="_blank">Lihat di GitHub</a>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close')) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Tambah CSS untuk Modal (tambah di style.css)
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(10,10,10,0.9);
        justify-content: center; align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    .modal-content {
        background: #1a1a1a;
        padding: 2rem;
        border-radius: 10px;
        max-width: 600px;
        text-align: center;
        position: relative;
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
    }
    .modal img { max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 1rem; }
    .close {
        position: absolute; top: 10px; right: 15px;
        font-size: 2rem; color: #d4af37; cursor: pointer;
        transition: color 0.3s;
    }
    .close:hover { color: #ffffff; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(modalStyle);

// 9. Animated Progress Bars di CV Skills
// Asumsikan di HTML CV: <div class="skill-bar"><div class="progress" data-width="80"></div><span>HTML/CSS</span></div>
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease';
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Tambah CSS untuk Progress Bars (tambah di style.css, di section .cv-section ul li atau buat baru)
const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .skill-bar {
        margin: 1rem 0;
        background: rgba(255,255,255,0.1);
        height: 10px;
        border-radius: 5px;
        overflow: hidden;
    }
    .progress {
        height: 100%;
        background: linear-gradient(90deg, #d4af37, #ffffff);
        width: 0;
    }
    .skill-bar span {
        display: block;
        margin-top: 0.5rem;
        color: #d4af37;
    }
`;
document.head.appendChild(progressStyle);

// Update HTML CV Skills untuk progress bars (contoh, tambahkan di <ul> skills):
// <li class="skill-bar"><div class="progress" data-width="90"></div><span>HTML/CSS/JS - 90%</span></li>
// <li class="skill-bar"><div class="progress" data-width="80"></div><span>React - 80%</span></li>
// Dst.

// 10. Inisialisasi Observer untuk Fade-In & Counters
observer.observe(document.getElementById('about'));
observer.observe(document.getElementById('cv'));

// Tambahkan class 'counter' di HTML About, misal: <p>Saya memiliki pengalaman <span class="counter" data-target="5">0</span> tahun...</span>