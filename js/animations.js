// ملف JavaScript لدمج مكتبات الرسوم المتحركة المتقدمة

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة مكتبة AOS للرسوم المتحركة عند التمرير
    initAOS();
    
    // تهيئة مكتبة Anime.js للرسوم المتحركة المتقدمة
    initAnimeJS();
    
    // تهيئة تأثيرات الجزيئات باستخدام Particles.js
    initParticles();
    
    // تهيئة تأثيرات ثلاثية الأبعاد
    init3DEffects();
});

// تهيئة مكتبة AOS
function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });
}

// تهيئة مكتبة Anime.js
function initAnimeJS() {
    // تأثير الشعار المتحرك
    animateLogo();
    
    // تأثير النص المتوهج
    animateGlowingText();
    
    // تأثير الكواكب المتحركة
    animatePlanets();
    
    // تأثير المسار الفضائي
    animateSpacePath();
}

// تأثير الشعار المتحرك
function animateLogo() {
    const logo = document.querySelector('.navbar-logo .logo-icon');
    if (!logo) return;
    
    anime({
        targets: logo,
        rotate: '1turn',
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: 1000
    });
}

// تأثير النص المتوهج
function animateGlowingText() {
    const glowingTexts = document.querySelectorAll('.text-gradient');
    
    glowingTexts.forEach(text => {
        anime({
            targets: text,
            textShadow: [
                { value: '0 0 5px rgba(0, 176, 255, 0.5), 0 0 10px rgba(0, 176, 255, 0.3)', duration: 1000 },
                { value: '0 0 15px rgba(0, 176, 255, 0.8), 0 0 20px rgba(0, 176, 255, 0.5)', duration: 1000 },
                { value: '0 0 5px rgba(0, 176, 255, 0.5), 0 0 10px rgba(0, 176, 255, 0.3)', duration: 1000 }
            ],
            loop: true,
            easing: 'easeInOutSine'
        });
    });
}

// تأثير الكواكب المتحركة
function animatePlanets() {
    const planets = document.querySelectorAll('.planet-effect');
    
    planets.forEach((planet, index) => {
        anime({
            targets: planet,
            translateX: function() {
                return anime.random(-30, 30);
            },
            translateY: function() {
                return anime.random(-30, 30);
            },
            scale: [
                { value: 1, duration: 1000, easing: 'easeOutSine' },
                { value: 1.1, duration: 2000, easing: 'easeInOutQuad' },
                { value: 1, duration: 1000, easing: 'easeInSine' }
            ],
            opacity: [
                { value: 0.7, duration: 1000, easing: 'easeOutSine' },
                { value: 1, duration: 2000, easing: 'easeInOutQuad' },
                { value: 0.7, duration: 1000, easing: 'easeInSine' }
            ],
            delay: index * 200,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    });
}

// تأثير المسار الفضائي
function animateSpacePath() {
    const spacePath = document.querySelector('.space-path');
    if (!spacePath) return;
    
    // تحريك النقاط على طول المسار
    anime({
        targets: '.space-path-point',
        translateX: function(el, i) {
            return anime.random(-5, 5);
        },
        translateY: function(el, i) {
            return anime.random(-5, 5);
        },
        scale: [
            { value: 1, duration: 500, easing: 'easeOutSine' },
            { value: 1.5, duration: 1000, easing: 'easeInOutQuad' },
            { value: 1, duration: 500, easing: 'easeInSine' }
        ],
        delay: function(el, i) { return i * 100; },
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    });
}

// تهيئة تأثيرات الجزيئات باستخدام Particles.js
function initParticles() {
    // التحقق من وجود العنصر المستهدف
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    
    // تحميل مكتبة Particles.js ديناميكيًا
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
        // تهيئة Particles.js بعد تحميل المكتبة
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 100,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    };
    document.body.appendChild(script);
}

// تهيئة تأثيرات ثلاثية الأبعاد
function init3DEffects() {
    // تأثير التحويم ثلاثي الأبعاد
    init3DHover();
    
    // تأثير التمرير ثلاثي الأبعاد
    init3DScroll();
}

// تأثير التحويم ثلاثي الأبعاد
function init3DHover() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // موقع المؤشر بالنسبة للبطاقة
            const y = e.clientY - rect.top;
            
            // حساب الزوايا بناءً على موقع المؤشر
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = (x - centerX) / 10; // تقليل التأثير بقسمة على 10
            const rotateX = (centerY - y) / 10;
            
            // تطبيق التحويل
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // إضافة تأثير توهج
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            this.style.backgroundImage = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
        });
        
        // إعادة تعيين التحويل عند مغادرة المؤشر
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.backgroundImage = 'none';
        });
    });
}

// تأثير التمرير ثلاثي الأبعاد
function init3DScroll() {
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('.section-3d');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionMiddle = sectionTop + sectionHeight / 2;
            
            // حساب المسافة من منتصف القسم
            const distanceFromMiddle = scrollY + window.innerHeight / 2 - sectionMiddle;
            const percentage = distanceFromMiddle / (window.innerHeight / 2);
            
            // تطبيق تأثير العمق
            if (Math.abs(percentage) < 1) {
                const translateZ = percentage * 100;
                const opacity = 1 - Math.abs(percentage) * 0.5;
                
                section.style.transform = `translateZ(${translateZ}px)`;
                section.style.opacity = opacity;
            }
        });
    });
}
