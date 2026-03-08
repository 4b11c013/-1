// Service Worker for PWA
const CACHE_NAME = 'medical-care-v1';
const urlsToCache = [
  './',
  './index.html',
  './page2.html',
  './page3.html',
  './page4.html',
  './page5.html',
  './page6.html',
  './page7.html',
  './page8.html',
  './manifest.json',
  // 添加常用资源
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
  'https://cdn.tailwindcss.com?plugins=forms,typography,container-queries',
  // 图片和视频资源
  './5.jpg',
  './胃.jpg',
  './到水.png',
  './倒食物.png',
  './妝管.png',
  './過濾食物.png',
  './拔管.png',
  './床頭抬高.jpg',
  './刷牙.png',
  './清鼻.png',
  './LOGO 去背.png'
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache failed:', error);
      })
  );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 如果在缓存中找到，返回缓存版本
        if (response) {
          return response;
        }
        // 否则从网络获取
        return fetch(event.request).then((response) => {
          // 检查响应是否有效
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // 克隆响应
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
      .catch(() => {
        // 如果网络请求失败，可以返回一个离线页面
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      })
  );
});

