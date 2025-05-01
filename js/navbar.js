// ملف JavaScript لشريط التنقل المتحرك بطابع الفضاء

document.addEventListener('DOMContentLoaded', function() {
    // عناصر شريط التنقل
    const navbar = document.querySelector('.space-navbar');
    const menuToggle = document.querySelector('.navbar-menu-toggle');
    const mobileMenu = document.querySelector('.navbar-mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('.navbar-links a, .navbar-mobile-links a');
    
    // تغيير شريط التنقل عند التمرير
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    }
    
    // تفعيل القائمة المنسدلة للشاشات الصغيرة
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open');
        document.body.classList.toggle('menu-open');
        
        // تأثير انفجار نجمي عند النقر
        createStarburstEffect(event);
    }
    
    // إغلاق القائمة المنسدلة عند النقر على رابط
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
    
    // تحديد الرابط النشط بناءً على القسم الحالي
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        // الحصول على جميع الأقسام
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // إزالة الفئة النشطة من جميع الروابط
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // إضافة الفئة النشطة للرابط المطابق
                document.querySelectorAll(`.navbar-links a[href="#${sectionId}"], .navbar-mobile-links a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.add('active');
                });
            }
        });
    }
    
    // إنشاء تأثير انفجار نجمي عند النقر
    function createStarburstEffect(event) {
        const starburst = document.createElement('div');
        starburst.classList.add('starburst-effect');
        
        // تحديد موقع النقر
        const x = event.clientX;
        const y = event.clientY;
        
        starburst.style.left = `${x}px`;
        starburst.style.top = `${y}px`;
        
        document.body.appendChild(starburst);
        
        // إزالة العنصر بعد انتهاء التأثير
        setTimeout(() => {
            starburst.remove();
        }, 1000);
    }
    
    // إنشاء تأثير النجوم المتلألئة في خلفية شريط التنقل
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.classList.add('navbar-stars');
        navbar.appendChild(starsContainer);
        
        // إنشاء عدد عشوائي من النجوم
        const starsCount = Math.floor(Math.random() * 20) + 10;
        
        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('navbar-star');
            
            // تحديد موقع وحجم وسرعة عشوائية لكل نجمة
            const size = Math.random() * 1+ 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.animationDuration = `${duration}s`;
            star.style.animationDelay = `${delay}s`;
            
            starsContainer.appendChild(star);
        }
    }
    
    // تأثير التمرير السلس عند النقر على روابط التنقل
    function smoothScroll(event) {
        // التحقق من أن الرابط يشير إلى قسم في نفس الصفحة
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && targetId.length > 1) {
            event.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // إغلاق القائمة المنسدلة إذا كانت مفتوحة
                closeMobileMenu();
                
                // التمرير إلى القسم المستهدف
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // تحديث عنوان URL
                history.pushState(null, null, targetId);
            }
        }
    }
    
    // إضافة مستمعات الأحداث
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', setActiveLink);
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(event) {
            toggleMobileMenu();
            event.stopPropagation();
        });
    }
    
    // إغلاق القائمة المنسدلة عند النقر خارجها
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // إضافة مستمع حدث للتمرير السلس لجميع روابط التنقل
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // إضافة تأثير انفجار نجمي عند النقر على الروابط
    navLinks.forEach(link => {
        link.addEventListener('click', createStarburstEffect);
    });
    
    // تهيئة شريط التنقل عند تحميل الصفحة
    handleScroll();
    setActiveLink();
   // createStars();
    
    // إضافة تأثيرات تفاعلية للشعار
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            // تأثير توهج للشعار عند التحويم
            const glow = document.createElement('div');
            glow.classList.add('logo-glow');
            this.appendChild(glow);
            
            setTimeout(() => {
                glow.remove();
            }, 1000);
        });
    }
});
