// ملف JavaScript لاختبار تجاوب الموقع وتوافقه مع مختلف المتصفحات

document.addEventListener('DOMContentLoaded', function() {
    // اختبار تجاوب الموقع مع مختلف أحجام الشاشات
    testResponsiveness();
    
    // اختبار توافق الموقع مع مختلف المتصفحات
    testBrowserCompatibility();
    
    // تحسين تجربة المستخدم
    enhanceUserExperience();
});

// اختبار تجاوب الموقع مع مختلف أحجام الشاشات
function testResponsiveness() {
    // التحقق من حجم الشاشة الحالي وتطبيق التعديلات المناسبة
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    console.log(`اختبار التجاوب: حجم الشاشة الحالي ${screenWidth}x${screenHeight}`);
    
    // تحديد فئة حجم الشاشة
    let screenSizeClass = '';
    if (screenWidth < 576) {
        screenSizeClass = 'xs'; // الهواتف الصغيرة
    } else if (screenWidth < 768) {
        screenSizeClass = 'sm'; // الهواتف الكبيرة
    } else if (screenWidth < 992) {
        screenSizeClass = 'md'; // الأجهزة اللوحية
    } else if (screenWidth < 1200) {
        screenSizeClass = 'lg'; // أجهزة الكمبيوتر المحمولة
    } else {
        screenSizeClass = 'xl'; // أجهزة الكمبيوتر المكتبية
    }
    
    // إضافة فئة حجم الشاشة إلى عنصر الجسم
    document.body.classList.add(`screen-${screenSizeClass}`);
    
    // تعديل حجم العناصر الكبيرة مثل الصور والفيديو بناءً على حجم الشاشة
    adjustLargeElements(screenSizeClass);
    
    // تعديل تأثيرات الرسوم المتحركة بناءً على حجم الشاشة
    adjustAnimations(screenSizeClass);
    
    // الاستماع لتغييرات حجم النافذة
    window.addEventListener('resize', function() {
        // إعادة اختبار التجاوب عند تغيير حجم النافذة
        testResponsiveness();
    });
}

// تعديل حجم العناصر الكبيرة مثل الصور والفيديو بناءً على حجم الشاشة
function adjustLargeElements(screenSizeClass) {
    // تعديل حجم الصور
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // التأكد من أن الصور لا تتجاوز عرض الشاشة
        img.style.maxWidth = '100%';
        
        // تعديل جودة الصور بناءً على حجم الشاشة
        if (screenSizeClass === 'xs' || screenSizeClass === 'sm') {
            // استخدام صور أقل جودة للشاشات الصغيرة لتحسين الأداء
            const smallerSrc = img.getAttribute('data-small-src');
            if (smallerSrc) {
                img.setAttribute('src', smallerSrc);
            }
        }
    });
    
    // تعديل حجم عناصر الفيديو
    const videos = document.querySelectorAll('video, iframe');
    videos.forEach(video => {
        video.style.maxWidth = '100%';
    });
    
    // تعديل حجم الكواكب والعناصر الزخرفية
    const decorativeElements = document.querySelectorAll('.planet, .galaxy-effect');
    decorativeElements.forEach(element => {
        if (screenSizeClass === 'xs') {
            element.style.transform = 'scale(0.6)';
        } else if (screenSizeClass === 'sm') {
            element.style.transform = 'scale(0.8)';
        } else {
            element.style.transform = 'scale(1)';
        }
    });
}

// تعديل تأثيرات الرسوم المتحركة بناءً على حجم الشاشة
function adjustAnimations(screenSizeClass) {
    // تقليل أو تعطيل بعض التأثيرات على الأجهزة المحمولة لتحسين الأداء
    if (screenSizeClass === 'xs' || screenSizeClass === 'sm') {
        // تقليل عدد النجوم والجزيئات
        reduceParticlesCount();
        
        // تعطيل بعض التأثيرات الثقيلة
        disableHeavyEffects();
    } else {
        // تفعيل جميع التأثيرات على الشاشات الكبيرة
        enableAllEffects();
    }
}

// تقليل عدد النجوم والجزيئات
function reduceParticlesCount() {
    // تقليل عدد النجوم
    const starsContainers = document.querySelectorAll('.stars-container');
    starsContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        // إبقاء 30% فقط من النجوم
        for (let i = 0; i < stars.length; i++) {
            if (i % 3 !== 0) {
                stars[i].style.display = 'none';
            }
        }
    });
    
    // تقليل عدد جزيئات الغبار الكوني
    const dustContainers = document.querySelectorAll('.cosmic-dust-container');
    dustContainers.forEach(container => {
        const dustParticles = container.querySelectorAll('.cosmic-dust');
        // إبقاء 50% فقط من الجزيئات
        for (let i = 0; i < dustParticles.length; i++) {
            if (i % 2 !== 0) {
                dustParticles[i].style.display = 'none';
            }
        }
    });
}

// تعطيل بعض التأثيرات الثقيلة
function disableHeavyEffects() {
    // تعطيل تأثيرات الضباب الكوني
    const cosmicFogs = document.querySelectorAll('.cosmic-fog');
    cosmicFogs.forEach(fog => {
        fog.style.display = 'none';
    });
    
    // تعطيل تأثيرات الهولوغرام
    const hologramEffects = document.querySelectorAll('.hologram-effect');
    hologramEffects.forEach(effect => {
        effect.classList.remove('hologram-effect');
    });
    
    // تبسيط تأثيرات البطاقات ثلاثية الأبعاد
    const cards3d = document.querySelectorAll('.card-3d');
    cards3d.forEach(card => {
        card.classList.remove('card-3d');
        card.classList.add('card-simple');
    });
}

// تفعيل جميع التأثيرات على الشاشات الكبيرة
function enableAllEffects() {
    // إعادة عرض جميع النجوم
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.style.display = '';
    });
    
    // إعادة عرض جميع جزيئات الغبار الكوني
    const dustParticles = document.querySelectorAll('.cosmic-dust');
    dustParticles.forEach(particle => {
        particle.style.display = '';
    });
    
    // إعادة تفعيل تأثيرات الضباب الكوني
    const cosmicFogs = document.querySelectorAll('.cosmic-fog');
    cosmicFogs.forEach(fog => {
        fog.style.display = '';
    });
}

// اختبار توافق الموقع مع مختلف المتصفحات
function testBrowserCompatibility() {
    // الكشف عن نوع المتصفح
    const userAgent = navigator.userAgent;
    let browserType = 'unknown';
    
    if (userAgent.indexOf('Chrome') > -1) {
        browserType = 'chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserType = 'safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browserType = 'firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browserType = 'ie';
    } else if (userAgent.indexOf('Edge') > -1) {
        browserType = 'edge';
    }
    
    console.log(`اختبار التوافق: المتصفح المكتشف هو ${browserType}`);
    
    // إضافة فئة نوع المتصفح إلى عنصر الجسم
    document.body.classList.add(`browser-${browserType}`);
    
    // تطبيق إصلاحات خاصة بالمتصفح
    applyBrowserFixes(browserType);
}

// تطبيق إصلاحات خاصة بالمتصفح
function applyBrowserFixes(browserType) {
    // إصلاحات لمتصفح Safari
    if (browserType === 'safari') {
        // إصلاح مشكلة تأثيرات الفلتر في Safari
        const elementsWithFilters = document.querySelectorAll('.galaxy-effect, .cosmic-fog');
        elementsWithFilters.forEach(element => {
            element.style.webkitFilter = element.style.filter;
        });
        
        // إصلاح مشكلة التدرجات في Safari
        const elementsWithGradients = document.querySelectorAll('[class*="gradient"]');
        elementsWithGradients.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const background = computedStyle.getPropertyValue('background-image');
            if (background.includes('gradient')) {
                element.style.webkitBackgroundImage = background;
            }
        });
    }
    
    // إصلاحات لمتصفح Internet Explorer
    if (browserType === 'ie') {
        // استبدال تأثيرات CSS المتقدمة بتأثيرات أبسط
        const advancedEffects = document.querySelectorAll('.text-gradient, .hologram-effect, .wave-background');
        advancedEffects.forEach(element => {
            element.classList.add('ie-simplified');
        });
        
        // إضافة polyfills لدعم الوظائف الحديثة
        loadPolyfills();
    }
    
    // إصلاحات لمتصفح Firefox
    if (browserType === 'firefox') {
        // تعديل بعض تأثيرات الرسوم المتحركة لتعمل بشكل أفضل في Firefox
        const animations = document.querySelectorAll('[class*="animate-"]');
        animations.forEach(element => {
            element.style.animationFillMode = 'forwards';
        });
    }
}

// تحميل polyfills لدعم المتصفحات القديمة
function loadPolyfills() {
    // تحميل polyfill لدعم CSS Variables في IE
    if (!window.CSS || !window.CSS.supports || !window.CSS.supports('--a', '0')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2';
        script.onload = function() {
            cssVars({});
        };
        document.head.appendChild(script);
    }
    
    // تحميل polyfill لدعم Intersection Observer API
    if (!('IntersectionObserver' in window)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/intersection-observer@0.12.0/intersection-observer.js';
        document.head.appendChild(script);
    }
}

// تحسين تجربة المستخدم
function enhanceUserExperience() {
    // تحسين أوقات التحميل
    optimizeLoadingTimes();
    
    // تحسين إمكانية الوصول
    enhanceAccessibility();
    
    // تحسين التفاعل مع المستخدم
    enhanceInteractivity();
}

// تحسين أوقات التحميل
function optimizeLoadingTimes() {
    // تحميل الصور بشكل كسول
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback لتحميل الصور في المتصفحات التي لا تدعم IntersectionObserver
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
    
    // تحميل الخطوط بشكل أمثل
    optimizeFontLoading();
}

// تحسين تحميل الخطوط
function optimizeFontLoading() {
    // إضافة preconnect للخطوط
    if (!document.querySelector('link[rel="preconnect"][href="https://fonts.googleapis.com"]')) {
        const preconnectGoogle = document.createElement('link');
        preconnectGoogle.rel = 'preconnect';
        preconnectGoogle.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnectGoogle);
        
        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = 'preconnect';
        preconnectGstatic.href = 'https://fonts.gstatic.com';
        preconnectGstatic.crossOrigin = 'anonymous';
        document.head.appendChild(preconnectGstatic);
    }
}

// تحسين إمكانية الوصول
function enhanceAccessibility() {
    // إضافة سمات ARIA للعناصر التفاعلية
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    interactiveElements.forEach(element => {
        // التأكد من أن جميع الأزرار لها نص وصفي
        if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label') && element.textContent.trim() === '') {
            const iconElement = element.querySelector('i[class*="fa-"]');
            if (iconElement) {
                const iconClass = Array.from(iconElement.classList).find(cls => cls.startsWith('fa-'));
                if (iconClass) {
                    const iconName = iconClass.replace('fa-', '');
                    element.setAttribute('aria-label', iconName);
                }
            }
        }
        
        // التأكد من أن جميع الروابط لها نص وصفي
        if (element.tagName === 'A' && !element.getAttribute('aria-label') && element.textContent.trim() === '') {
            element.setAttribute('aria-label', element.getAttribute('href') || 'رابط');
        }
    });
    
    // تحسين تباين الألوان للنصوص
    enhanceColorContrast();
}

// تحسين تباين الألوان للنصوص
function enhanceColorContrast() {
    // تحديد العناصر التي قد تحتاج إلى تحسين التباين
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, label');
    
    textElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const backgroundColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        
        // تحويل الألوان إلى قيم RGB للمقارنة
        const bgRGB = getRGBValues(backgroundColor);
        const textRGB = getRGBValues(color);
        
        if (bgRGB && textRGB) {
            // حساب نسبة التباين
            const contrast = calculateContrast(bgRGB, textRGB);
            
            // إذا كان التباين منخفضًا، قم بتحسينه
            if (contrast < 4.5) {
                element.classList.add('enhanced-contrast');
            }
        }
    });
}

// استخراج قيم RGB من نص CSS
function getRGBValues(colorString) {
    if (!colorString || colorString === 'transparent' || colorString === 'rgba(0, 0, 0, 0)') {
        return null;
    }
    
    const rgbMatch = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1]),
            g: parseInt(rgbMatch[2]),
            b: parseInt(rgbMatch[3])
        };
    }
    
    return null;
}

// حساب نسبة التباين بين لونين
function calculateContrast(rgb1, rgb2) {
    // حساب نسبة السطوع النسبي
    const luminance1 = calculateLuminance(rgb1);
    const luminance2 = calculateLuminance(rgb2);
    
    // حساب نسبة التباين
    const brighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    
    return (brighter + 0.05) / (darker + 0.05);
}

// حساب السطوع النسبي للون
function calculateLuminance(rgb) {
    const { r, g, b } = rgb;
    
    // تحويل قيم RGB إلى نسب
    const rsrgb = r / 255;
    const gsrgb = g / 255;
    const bsrgb = b / 255;
    
    // حساب السطوع النسبي
    const r1 = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
    const g1 = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
    const b1 = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);
    
    return 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
}

// تحسين التفاعل مع المستخدم
function enhanceInteractivity() {
    // إضافة تأثيرات تفاعلية للأزرار
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
        
        button.addEventListener('click', function() {
            // إضافة تأثير النقر
            this.classList.add('click-effect');
            
            // إزالة التأثير بعد انتهاء الرسوم المتحركة
            setTimeout(() => {
                this.classList.remove('click-effect');
            }, 300);
        });
    });
    
    // تحسين التفاعل مع النماذج
    enhanceFormInteraction();
}

// تحسين التفاعل مع النماذج
function enhanceFormInteraction() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // إضافة تأثيرات التركيز
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
            
            // إضافة فئة للإشارة إلى أن الحقل تم ملؤه
            if (this.value.trim() !== '') {
                this.classList.add('input-filled');
            } else {
                this.classList.remove('input-filled');
            }
        });
        
        // التحقق من صحة المدخلات في الوقت الفعلي
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
    
    // إضافة التحقق من صحة النموذج عند الإرسال
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
            }
        });
    });
}

// التحقق من صحة حقل الإدخال
function validateInput(input) {
    // إزالة رسائل الخطأ السابقة
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // التحقق من نوع الحقل وتطبيق التحقق المناسب
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && input.value.trim() === '') {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    } else if (input.type === 'email' && input.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    } else if (input.type === 'tel' && input.value.trim() !== '') {
        const phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(input.value.replace(/\D/g, ''))) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم هاتف صحيح';
        }
    }
    
    // إضافة فئة CSS بناءً على صحة الإدخال
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        
        // إضافة رسالة خطأ
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = errorMessage;
        input.parentElement.appendChild(errorElement);
    }
    
    return isValid;
}

// التحقق من صحة النموذج بالكامل
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateInput(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}
