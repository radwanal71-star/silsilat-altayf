// ===== كود الهامبرغر (لجميع الصفحات) =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

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
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const message = document.getElementById('message');
            
            message.textContent = '';
            message.className = 'message';
            
            // 1. التحقق من البريد الإلكتروني
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                message.textContent = '⚠️ الرجاء إدخال بريد إلكتروني صحيح.';
                message.classList.add('error');
                return;
            }
            
            // 2. التحقق من كلمة المرور
            if (password.length < 6) {
                message.textContent = '⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
                message.classList.add('error');
                return;
            }
            
            // 3. التحقق من بيانات المستخدم في localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (!user) {
                message.textContent = '⚠️ البريد الإلكتروني أو كلمة المرور غير صحيحة.';
                message.classList.add('error');
                return;
            }
            
            // 4. النجاح
            message.textContent = '✅ تم تسجيل الدخول بنجاح! جاري التوجيه...';
            message.classList.add('success');
            
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', user.email);
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }
});

// ===== نظام إنشاء حساب جديد (لصفحة signup.html فقط) =====
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const message = document.getElementById('message');
            
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
            
            // 5. قراءة قائمة المستخدمين الحالية
            let users = JSON.parse(localStorage.getItem('users')) || [];
            
            // 6. التحقق من أن البريد غير مسجل مسبقاً
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                message.textContent = '⚠️ هذا البريد الإلكتروني مسجل مسبقاً.';
                message.classList.add('error');
                return;
            }
            
            // 7. إضافة المستخدم الجديد
            const newUser = {
                name: name,
                email: email,
                password: password
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // 8. النجاح
            message.textContent = '✅ تم إنشاء الحساب بنجاح! جاري توجيهك لتسجيل الدخول...';
            message.classList.add('success');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});

// ===== كود لوحة التحكم (لصفحة dashboard.html فقط) =====
document.addEventListener('DOMContentLoaded', function() {
    const userNameElement = document.getElementById('user-name');
    
    if (userNameElement) {
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        if (userName) {
            userNameElement.textContent = userName;
        } else {
            window.location.href = 'login.html';
            return;
        }
        
        // عرض الدورات المسجل فيها
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(u => u.email === userEmail);
        
        if (currentUser && currentUser.courses && currentUser.courses.length > 0) {
            const container = document.getElementById('my-courses-container');
            const emptyMsg = document.getElementById('empty-courses');
            const coursesCount = document.getElementById('courses-count');
            
            // إخفاء رسالة "لم تسجل في أي دورة"
            if (emptyMsg) emptyMsg.style.display = 'none';
            
            // تحديث عدد الدورات
            if (coursesCount) coursesCount.textContent = currentUser.courses.length;
            
            // إضافة بطاقة لكل دورة
            currentUser.courses.forEach((courseName, index) => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'enrolled-course';
                courseDiv.innerHTML = `
                    <div class="course-info">
                        <h3>${courseName}</h3>
                        <p>قيد التقدم • 0% مكتمل</p>
                    </div>
                    <span class="course-badge">جديد</span>
                `;
                container.appendChild(courseDiv);
            });
        }
    }
});

// ===== كود تسجيل الخروج =====
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    const logoutBtnBottom = document.getElementById('logout-btn-bottom');
    
    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    }
    
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (logoutBtnBottom) logoutBtnBottom.addEventListener('click', handleLogout);
});
// ===== كود التسجيل في الدورات (لصفحات course-details) =====
document.addEventListener('DOMContentLoaded', function() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    
    if (enrollButtons.length > 0) {
        enrollButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                const messageEl = document.getElementById('enroll-message');
                const userEmail = localStorage.getItem('userEmail');
                
                // 1. التحقق من تسجيل الدخول
                if (!userEmail) {
                    if (messageEl) {
                        messageEl.textContent = '⚠️ الرجاء تسجيل الدخول أولاً للتسجيل في الدورة. جاري توجيهك...';
                        messageEl.className = 'message error';
                    }
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                    return;
                }
                
                const courseName = button.getAttribute('data-course-name');
                
                // 2. قراءة قائمة المستخدمين
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.email === userEmail);
                
                if (userIndex === -1) {
                    if (messageEl) {
                        messageEl.textContent = '⚠️ حدث خطأ. الرجاء تسجيل الدخول مرة أخرى.';
                        messageEl.className = 'message error';
                    }
                    return;
                }
                
                // 3. التأكد من وجود مصفوفة الدورات
                if (!users[userIndex].courses) {
                    users[userIndex].courses = [];
                }
                
                // 4. التحقق من عدم التسجيل المسبق
                if (users[userIndex].courses.includes(courseName)) {
                    if (messageEl) {
                        messageEl.textContent = '⚠️ أنت مسجل بالفعل في هذه الدورة!';
                        messageEl.className = 'message error';
                    }
                    return;
                }
                
                // 5. إضافة الدورة
                users[userIndex].courses.push(courseName);
                localStorage.setItem('users', JSON.stringify(users));
                
                // 6. عرض رسالة النجاح
                if (messageEl) {
                    messageEl.textContent = '✅ تم تسجيلك في الدورة بنجاح! يمكنك مراجعة لوحة التحكم.';
                    messageEl.className = 'message success';
                }
            });
        });
    }
});