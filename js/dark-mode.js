// ملف JavaScript لتبديل الوضع الليلي/النهاري

document.addEventListener('DOMContentLoaded', function() {
    // عناصر تبديل الوضع
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const html = document.documentElement;
    
    // التحقق من الوضع المخزن محليًا
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else if (savedTheme === 'light') {
      disableDarkMode();  
    } else {
        // التحقق من تفضيلات النظام إذا لم يتم تعيين وضع مخصص
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
        }
    }
    
    // إضافة مستمع حدث لزر تبديل الوضع
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // تبديل الوضع
    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
           
            enableDarkMode();
        } else {
             disableDarkMode();
        }
        
        // إضافة تأثير انتقالي للصفحة
        body.classList.add('theme-transition');
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 1000);
        
        // إنشاء تأثير انفجار نجمي عند النقر
        createThemeToggleEffect(event);
    }
    
    // تفعيل الوضع الليلي
    function enableDarkMode() {
        body.classList.add('dark-mode');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        
        // تحديث نص الزر
        updateThemeButtonText('light');
        
        // تحديث العناصر المرئية
        updateVisualElements('dark');
    }
    
    // تعطيل الوضع الليلي
    function disableDarkMode() {
        body.classList.remove('dark-mode');
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        
        // تحديث نص الزر
        updateThemeButtonText('dark');
        
        // تحديث العناصر المرئية
        updateVisualElements('light');
    }
    
    // تحديث نص زر تبديل الوضع
    function updateThemeButtonText(mode) {
        const currentLang = document.documentElement.lang || 'ar';
        const themeText = currentLang === 'ar' ? 
            (mode === 'dark' ? 'وضع الليل' : 'وضع النهار') : 
            (mode === 'dark' ? 'Dark Mode' : 'Light Mode');
        
        const themeIcon = mode === 'dark' ? 'fa-moon' : 'fa-sun';
        
        if (themeToggle) {
            const textSpan = themeToggle.querySelector('span');
            const icon = themeToggle.querySelector('i');
            
            if (textSpan) textSpan.textContent = themeText;
            if (icon) {
                icon.className = '';
                icon.classList.add('fas', themeIcon);
            }
        }
        
        if (mobileThemeToggle) {
            const textSpan = mobileThemeToggle.querySelector('span');
            const icon = mobileThemeToggle.querySelector('i');
            
            if (textSpan) textSpan.textContent = themeText;
            if (icon) {
                icon.className = '';
                icon.classList.add('fas', themeIcon);
            }
        }
    }
    
    // تحديث العناصر المرئية حسب الوضع
    function updateVisualElements(mode) {
        // تحديث لون النجوم
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            if (mode === 'dark') {
                star.style.boxShadow = '0 0 4px var(--space-accent-2)';
            } else {
                star.style.boxShadow = 'none';
            }
        });
        
        // تحديث تأثيرات الكواكب
        const planets = document.querySelectorAll('.planet-effect');
        planets.forEach(planet => {
            if (mode === 'dark') {
                planet.classList.add('dark-planet');
            } else {
                planet.classList.remove('dark-planet');
            }
        });
    }
    
    // إنشاء تأثير خاص عند تبديل الوضع
    function createThemeToggleEffect(event) {
        const toggleButton = event.currentTarget;
        const rect = toggleButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // إنشاء تأثير انفجار نجمي
        const starburst = document.createElement('div');
        starburst.classList.add('theme-toggle-effect');
        
        starburst.style.left = `${x}px`;
        starburst.style.top = `${y}px`;
        
        document.body.appendChild(starburst);
        
        // إزالة العنصر بعد انتهاء التأثير
        setTimeout(() => {
            starburst.remove();
        }, 1500);
    }
    
    // الاستماع لتغييرات تفضيلات النظام
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (e.matches) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }
});
