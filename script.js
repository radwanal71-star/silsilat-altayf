// ===== كود الهامبرغر (للصفحة الرئيسية فقط) =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // التحقق من وجود العنصرين قبل تنفيذ الكود
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند الضغط على أي رابط
        const navLinks = document.querySelectorAll('#nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===== كود تسجيل الدخول (لصفحة login.html فقط) =====
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    
    // التحقق من وجود النموذج قبل تنفيذ الكود
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');
            
            message.textContent = '';
            message.className = 'message';
            
            // التحقق من البريد الإلكتروني
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                message.textContent = '⚠️ الرجاء إدخال بريد إلكتروني صحيح.';
                message.classList.add('error');
                return;
            }
            
            // التحقق من كلمة المرور
            if (password.length < 6) {
                message.textContent = '⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
                message.classList.add('error');
                return;
            }
            
            // نجاح
            message.textContent = '✅ تم تسجيل الدخول بنجاح! جاري التوجيه...';
            message.classList.add('success');
            
            setTimeout(() => {
                message.textContent = '🎉 أهلاً بك في منصة سلسلة الطيف!';
            }, 2000);
        });
    }
});