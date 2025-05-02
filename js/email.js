// ============== تهيئة المكتبات ==============
function initLibraries() {
  // تهيئة AOS للرسوم المتحركة
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
  }
}

// ============== وظائف عامة ==============
function updateCopyrightYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============== إدارة المهارات ==============
// function setupSkillsAnimation() {
//   const skillsSection = document.getElementById('skills');
  
//   if (!skillsSection) return;

//   const animateSkillBars = () => {
//     document.querySelectorAll('.skill-progress-bar').forEach(bar => {
//       bar.style.width = bar.dataset.width + '%';
//     });
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateSkillBars();
//         observer.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.2 });

//   observer.observe(skillsSection);
// }

// ============== إدارة نموذج الاتصال ==============
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // عناصر DOM
  const elements = {
    form: contactForm,
    submitButton: contactForm.querySelector('button[type="submit"]'),
    successMessage: document.getElementById('success-message'),
    errorMessage: document.getElementById('error-message'),
    fields: {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      subject: document.getElementById('subject'),
      message: document.getElementById('message')
    }
  };

  // أحداث النموذج
  elements.form.addEventListener('submit', handleSubmit);

  // أحداث الحقول
  Object.values(elements.fields).forEach(field => {
    if (field) {
      field.addEventListener('input', () => clearError(field));
    }
  });
}

function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  console.log(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;

  // التحقق من الصحة
  if (!validateForm(form)) return;

  // حالة التحميل
  submitButton.disabled = true;
  submitButton.innerHTML = '<i class="mr-2 fas fa-spinner fa-spin"></i>جاري الإرسال...';

  // إرسال النموذج
  sendFormData(form)
    .then(() => {
      showSuccess();
      form.reset();
    })
    .catch(error => {
      showError(error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    });
}

function validateForm(form) {
  let isValid = true;
  const fields = {
    name: form.querySelector('#name'),
    email: form.querySelector('#email'),
    subject: form.querySelector('#subject'),
    message: form.querySelector('#message')
  };

  // التحقق من الحقول
  if (!fields.name.value.trim()) {
    showError(fields.name, 'الاسم مطلوب');
    isValid = false;
  }

  if (!fields.email.value.trim()) {
    showError(fields.email, 'البريد الإلكتروني مطلوب');
    isValid = false;
  } else if (!isValidEmail(fields.email.value)) {
    showError(fields.email, 'بريد إلكتروني غير صالح');
    isValid = false;
  }

  if (!fields.subject.value.trim()) {
    showError(fields.subject, 'الموضوع مطلوب');
    isValid = false;
  }

  if (!fields.message.value.trim()) {
    showError(fields.message, 'الرسالة مطلوبة');
    isValid = false;
  }

  return isValid;
}

async function sendFormData(form) {
  // إعداد FormSubmit
//   form.action = 'https://formsubmit.co/m.bander.it@gmail.com';
//   form.method = 'POST';
  
  // إضافة حقول مخفية
  form.insertAdjacentHTML('beforeend', `
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://portfolio-tlnz.vercel.app">
  `);

  // إرسال عبر EmailJS
  if (typeof emailjs !== 'undefined') {
    await emailjs.sendForm(
      'service_w5aymqc', 
      'template_bvxoe5q', 
      form
    );
  } else {
    throw new Error('EmailJS غير محمل');
  }
}

// ============== وظائف المساعدة ==============
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  const formGroup = input.parentElement;
  let errorElement = formGroup.querySelector('.error-message');

  input.classList.add('invalid');
  input.classList.remove('valid');

  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');

  if (errorElement) {
    errorElement.remove();
  }

  input.classList.remove('invalid');
  input.classList.add('valid');
}

function showSuccess() {
  const successMessage = document.getElementById('success-message');
  if (successMessage) {
    successMessage.style.display = 'block';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 5000);
    
    createSuccessEffect();
  }
}

function createSuccessEffect() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const starburst = document.createElement('div');
      starburst.className = 'starburst-effect';
      starburst.style.left = `${Math.random() * window.innerWidth}px`;
      starburst.style.top = `${Math.random() * (window.innerHeight / 2) + window.innerHeight / 4}px`;
      document.body.appendChild(starburst);
      
      setTimeout(() => starburst.remove(), 1000);
    }, i * 200);
  }
}

// ============== التمرير السلس ==============
function setupSmoothScrolling() {
  // زر التمرير لأعلى
  const scrollToTopButton = document.getElementById('scroll-to-top');

  window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
          scrollToTopButton.classList.remove('opacity-0', 'invisible');
          scrollToTopButton.classList.add('opacity-100', 'visible');
      } else {
          scrollToTopButton.classList.remove('opacity-100', 'visible');
          scrollToTopButton.classList.add('opacity-0', 'invisible');
      }
  });

  scrollToTopButton.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  // روابط التنقل
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============== تهيئة الصفحة ==============
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
  initLibraries();
  updateCopyrightYear();
//   setupSkillsAnimation();
  setupContactForm();
 
});