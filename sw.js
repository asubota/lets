if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,t)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let l={};const o=s=>i(s,r),a={module:{uri:r},exports:l,require:o};e[r]=Promise.all(n.map((s=>a[s]||o(s)))).then((s=>(t(...s),l)))}}define(["./workbox-b833909e"],(function(s){"use strict";importScripts("sw-custom.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/colors.lazy-BwwUYs2_.js",revision:null},{url:"assets/html2canvas-BfYXEYrK.js",revision:null},{url:"assets/index-_krSKhW-.css",revision:null},{url:"assets/index-De_rabC2.js",revision:null},{url:"assets/mui-Cz0g9qid.js",revision:null},{url:"assets/notifications.lazy-DnsegYe7.js",revision:null},{url:"assets/products-DLtr4K4r.js",revision:null},{url:"assets/react-Csw2ODfV.js",revision:null},{url:"assets/scanner.lazy-DexMDMKY.js",revision:null},{url:"assets/stats.lazy-DGOPeB1r.js",revision:null},{url:"assets/swiper-Ct-44qY_.js",revision:null},{url:"assets/tanstack-LPPoSm7Q.js",revision:null},{url:"assets/tesseract-Dw51fQQH.js",revision:null},{url:"index.html",revision:"f3909ca35b6df0f061ee1572cb42334a"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"sw-custom.js",revision:"e060f3f1427d35f5151a3ebd2c7bd206"},{url:"192.png",revision:"573e5686c58e15502aea81d236655b36"},{url:"favicon.ico",revision:"b42343161a45786d8517953bc28c4ecd"},{url:"logo.webp",revision:"5cd636440df551ca9e859c4ef8418dbf"},{url:"manifest.webmanifest",revision:"b5416dda2484738e66e77c8e55dfad80"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{allowlist:[/^\/lets\//]})),s.registerRoute(/^https:\/\/apis\.google\.com\/.*/i,new s.CacheFirst({cacheName:"google-api-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:1814400}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
