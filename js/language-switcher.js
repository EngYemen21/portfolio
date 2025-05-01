// ملف JavaScript محسّن لتبديل اللغة

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة نظام الترجمة
    const translations = {
        ar: null,
        en: null
    };
    
    // الحصول على اللغة المفضلة من التخزين المحلي أو استخدام العربية كلغة افتراضية
    let currentLang = localStorage.getItem('language') || 'ar';
    
    // تحميل ملفات الترجمة
    async function loadTranslations() {
        try {
            const arResponse = await fetch('/locales/ar/translation.json');
            const enResponse = await fetch('/locales/en/translation.json');
            
            translations.ar = await arResponse.json();
            translations.en = await enResponse.json();
            
            // تطبيق الترجمة الأولية
            applyTranslation(currentLang);
            
            // تحديث واجهة المستخدم لتعكس اللغة الحالية
            updateUI(currentLang);
            
            // إضافة تأثير انتقالي للصفحة
            document.body.classList.add('language-loaded');
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }
    
    // تطبيق الترجمة على العناصر
    function applyTranslation(lang) {
        if (!translations[lang]) {
            console.error(`Translation for ${lang} not loaded yet.`);
            return;
        }
        
        // تحديث عناصر الصفحة بناءً على مفاتيح الترجمة
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations[lang], key);
            
            if (translation) {
                // التعامل مع العناصر المختلفة
                if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text' || 
                    element.tagName === 'INPUT' && element.getAttribute('type') === 'email' || 
                    element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                    element.alt = translation;
                } else if (element.tagName === 'META' && element.hasAttribute('content')) {
                    element.content = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // تحديث عنوان الصفحة
        const titleKey = document.documentElement.getAttribute('data-i18n-title');
        if (titleKey) {
            const titleTranslation = getNestedTranslation(translations[lang], titleKey);
            if (titleTranslation) {
                document.title = titleTranslation;
            }
        }
        
        // تحديث العناصر ذات السمات المترجمة
        document.querySelectorAll('[data-i18n-attr]').forEach(element => {
            const attrData = element.getAttribute('data-i18n-attr').split(',');
            
            attrData.forEach(item => {
                const [attr, key] = item.trim().split(':');
                if (attr && key) {
                    const translation = getNestedTranslation(translations[lang], key);
                    if (translation) {
                        element.setAttribute(attr, translation);
                    }
                }
            });
        });
        
        // تحديث اتجاه الصفحة بناءً على اللغة
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }
    
    // الحصول على ترجمة متداخلة باستخدام مسار المفتاح (مثل "common.nav.home")
    function getNestedTranslation(obj, path) {
        const keys = path.split('.');
        let result = obj;
        
        for (const key of keys) {
            if (result && typeof result === 'object' && key in result) {
                result = result[key];
            } else {
                return null;
            }
        }
        
        return result;
    }
    
    // تحديث واجهة المستخدم لتعكس اللغة الحالية
    function updateUI(lang) {
        // تحديث زر تبديل اللغة
        const langToggle = document.getElementById('language-toggle');
        const mobileLangToggle = document.getElementById('mobile-language-toggle');
        
        if (langToggle) {
            updateLanguageToggle(langToggle, lang);
        }
        
        if (mobileLangToggle) {
            updateLanguageToggle(mobileLangToggle, lang);
        }
        
        // إضافة فئة CSS للغة الحالية
        document.body.classList.remove('lang-ar', 'lang-en');
        document.body.classList.add(`lang-${lang}`);
        
        // تحديث اتجاه الفلكس والهوامش للتوافق مع اتجاه اللغة
        const rtlSpecificElements = document.querySelectorAll('.rtl-specific');
        rtlSpecificElements.forEach(element => {
            if (lang === 'ar') {
                element.classList.add('rtl-active');
            } else {
                element.classList.remove('rtl-active');
            }
        });
        
        // تحديث الخطوط حسب اللغة
        if (lang === 'ar') {
            document.body.style.fontFamily = 'var(--font-body-ar)';
        } else {
            document.body.style.fontFamily = 'var(--font-body-en)';
        }
    }
    
    // تحديث زر تبديل اللغة
    function updateLanguageToggle(button, currentLang) {
        const oppositeLanguage = currentLang === 'ar' ? 'en' : 'ar';
        const textSpan = button.querySelector('span');
        
        if (textSpan) {
            textSpan.textContent = translations[currentLang]?.common?.language?.[oppositeLanguage] || 
                                  (oppositeLanguage === 'ar' ? 'العربية' : 'English');
        }
        
        button.setAttribute('data-lang', oppositeLanguage);
    }
    
    // تبديل اللغة
    function toggleLanguage(event) {
        // الحصول على اللغة المستهدفة من زر التبديل
        const targetLang = event.currentTarget.getAttribute('data-lang');
        
        if (targetLang && (targetLang === 'ar' || targetLang === 'en')) {
            currentLang = targetLang;
            localStorage.setItem('language', currentLang);
            
            // إضافة تأثير انتقالي للصفحة
            document.body.classList.add('language-transition');
            
            // تطبيق الترجمة بعد تأخير قصير للسماح بالتأثير الانتقالي
            setTimeout(() => {
                applyTranslation(currentLang);
                updateUI(currentLang);
                document.body.classList.remove('language-transition');
                
                // إنشاء تأثير انتقالي للعناصر
                animateTranslationChange();
            }, 300);
            
            // إنشاء تأثير انفجار نجمي عند النقر
            createLanguageToggleEffect(event);
        }
    }
    
    // إنشاء تأثير خاص عند تبديل اللغة
    function createLanguageToggleEffect(event) {
        const toggleButton = event.currentTarget;
        const rect = toggleButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // إنشاء تأثير انفجار نجمي
        const starburst = document.createElement('div');
        starburst.classList.add('language-toggle-effect');
        
        starburst.style.left = `${x}px`;
        starburst.style.top = `${y}px`;
        
        document.body.appendChild(starburst);
        
        // إزالة العنصر بعد انتهاء التأثير
        setTimeout(() => {
            starburst.remove();
        }, 1500);
    }
    
    // تأثير انتقالي للعناصر عند تغيير اللغة
    function animateTranslationChange() {
        // تحديد العناصر التي ستتأثر
        const elements = document.querySelectorAll('.animate-on-language-change');
        
        elements.forEach((element, index) => {
            // إعادة تعيين التأثير
            element.style.animation = 'none';
            element.offsetHeight; // إعادة تدفق
            
            // تطبيق التأثير مع تأخير تدريجي
            element.style.animation = `fadeInTranslation 0.5s ease forwards ${index * 0.1}s`;
        });
    }
    
    // إضافة مستمعات الأحداث لأزرار تبديل اللغة
    function addLanguageToggleListeners() {
        const languageToggle = document.getElementById('language-toggle');
        const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
        
        if (languageToggle) {
            languageToggle.addEventListener('click', toggleLanguage);
        }
        
        if (mobileLanguageToggle) {
            mobileLanguageToggle.addEventListener('click', toggleLanguage);
        }
    }
    
    // تحميل الترجمات وإضافة مستمعات الأحداث
    loadTranslations();
    addLanguageToggleListeners();
    
    // تصدير الوظائف للاستخدام العام
    window.i18n = {
        getCurrentLanguage: () => currentLang,
        translate: (key) => getNestedTranslation(translations[currentLang], key),
        changeLanguage: (lang) => {
            if (lang === 'ar' || lang === 'en') {
                currentLang = lang;
                localStorage.setItem('language', currentLang);
                applyTranslation(currentLang);
                updateUI(currentLang);
            }
        }
    };
});
