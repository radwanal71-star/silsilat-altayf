const CACHE_NAME = 'physics-app-v1';
const ASSETS = [
  './',
  './index.html', // ضع اسم ملف الـ HTML الخاص بك هنا
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// تثبيت التطبيق وتخزين الملفات
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// جلب الملفات من الذاكرة المؤقتة عند انقطاع الإنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});