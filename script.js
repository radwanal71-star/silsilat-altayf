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
// ===== نظام إنشاء حساب جديد (لصفحة signup.html فقط) =====
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    // التحقق من وجود النموذج قبل تنفيذ الكود
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // الحصول على القيم
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const message = document.getElementById('message');
            
            // مسح الرسالة السابقة
            message.textContent = '';
            message.className = 'message';
            
            // 1. التحقق من الاسم
            if (name.length < 3) {
                message.textContent = '⚠️ الرجاء إدخال الاسم الكامل (3 أحرف على الأقل).';
                message.classList.add('error');
                return;
            }
            
            // 2. التحقق من البريد الإلكتروني
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                message.textContent = '⚠️ الرجاء إدخال بريد إلكتروني صحيح.';
                message.classList.add('error');
                return;
            }
            
            // 3. التحقق من كلمة المرور
            if (password.length < 6) {
                message.textContent = '⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
                message.classList.add('error');
                return;
            }
            
            // 4. التحقق من تطابق كلمتي المرور
            if (password !== confirmPassword) {
                message.textContent = '⚠️ كلمتا المرور غير متطابقتين.';
                message.classList.add('error');
                return;
            }
            
            // 5. نجاح
            message.textContent = '✅ تم إنشاء الحساب بنجاح! جاري توجيهك لتسجيل الدخول...';
            message.classList.add('success');
            
            // توجيه المستخدم لصفحة تسجيل الدخول بعد ثانيتين
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});