if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),c={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>c[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-f5523f08"],(function(e){"use strict";importScripts("sw-custom.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/colors.lazy-D0RlLrh4.js",revision:null},{url:"assets/index-DrRTcF66.js",revision:null},{url:"assets/index-Dwem2jv5.css",revision:null},{url:"assets/list-BLh7Lzr3.css",revision:null},{url:"assets/list-CwzPrd5i.js",revision:null},{url:"assets/mui-Cl-7HgXY.js",revision:null},{url:"assets/react-C9_qfvjK.js",revision:null},{url:"assets/scanner.lazy-BmVBLTUz.js",revision:null},{url:"assets/swiper-CeyCXhDy.js",revision:null},{url:"assets/vendor-chip-67e_Zk9J.js",revision:null},{url:"index.html",revision:"a418e51828c4e65f59d4e8904b5ecfde"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"sw-custom.js",revision:"4933885cadbab4698c4d8b4059de31e5"},{url:"192.png",revision:"573e5686c58e15502aea81d236655b36"},{url:"favicon.ico",revision:"b42343161a45786d8517953bc28c4ecd"},{url:"logo.webp",revision:"5cd636440df551ca9e859c4ef8418dbf"},{url:"manifest.webmanifest",revision:"983bffd310a088c8e86af59a9622e9ee"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/\/lets\//]})),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
