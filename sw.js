if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,t)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let r={};const o=s=>i(s,l),a={module:{uri:l},exports:r,require:o};e[l]=Promise.all(n.map((s=>a[s]||o(s)))).then((s=>(t(...s),r)))}}define(["./workbox-f5523f08"],(function(s){"use strict";importScripts("sw-custom.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/colors.lazy-BqDQdHDU.js",revision:null},{url:"assets/html2canvas-BfYXEYrK.js",revision:null},{url:"assets/index-BCjTh7Kj.js",revision:null},{url:"assets/index-DK9jMLOs.css",revision:null},{url:"assets/list-BLh7Lzr3.css",revision:null},{url:"assets/list-CbUza5AN.js",revision:null},{url:"assets/mui-CnM2NOip.js",revision:null},{url:"assets/notifications.lazy-CAb-D5OU.js",revision:null},{url:"assets/react-BtIrUdbE.js",revision:null},{url:"assets/scanner.lazy-DmzFonuX.js",revision:null},{url:"assets/swiper-BXd3IUGD.js",revision:null},{url:"assets/tanstack-BOdhr6Pk.js",revision:null},{url:"assets/vendor-chip-CkDD_rvE.js",revision:null},{url:"index.html",revision:"823f339e0eef1b1b55e97e7da9bab897"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"sw-custom.js",revision:"84f5f2fb6017b4c206c84c34c7d896c2"},{url:"192.png",revision:"573e5686c58e15502aea81d236655b36"},{url:"favicon.ico",revision:"b42343161a45786d8517953bc28c4ecd"},{url:"logo.webp",revision:"5cd636440df551ca9e859c4ef8418dbf"},{url:"manifest.webmanifest",revision:"983bffd310a088c8e86af59a9622e9ee"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{allowlist:[/^\/lets\//]})),s.registerRoute(/^https:\/\/apis\.google\.com\/.*/i,new s.CacheFirst({cacheName:"google-api-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:1814400}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
