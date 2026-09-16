// 1. نختار زر "ابدأ الآن" من الصفحة
const startButton = document.querySelector('.hero .btn');

// 2. نضيف حدث "الضغط" (Click) على الزر
startButton.addEventListener('click', function(event) {
    // 3. نمنع السلوك الافتراضي للرابط (حتى لا يقفز لأعلى الصفحة)
    event.preventDefault();
    
    // 4. نختار قسم الدورات
    const coursesSection = document.querySelector('.courses');
    
    // 5. نقوم بالتمرير بسلاسة إلى قسم الدورات
    coursesSection.scrollIntoView({ behavior: 'smooth' });
});
// 1. نختار زر القائمة والقائمة نفسها
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// 2. نضيف حدث الضغط على الزر
menuToggle.addEventListener('click', function() {
    // 3. نضيف أو نزيل الكلاس 'active' من القائمة
    navMenu.classList.toggle('active');
});