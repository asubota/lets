if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const t=s||("document"in self?document.currentScript.src:"")||location.href;if(e[t])return;let r={};const o=s=>l(s,t),a={module:{uri:t},exports:r,require:o};e[t]=Promise.all(i.map((s=>a[s]||o(s)))).then((s=>(n(...s),r)))}}define(["./workbox-b833909e"],(function(s){"use strict";importScripts("sw-custom.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/cart.lazy-Ho29oh0s.js",revision:null},{url:"assets/colors.lazy-D8UFeRmN.js",revision:null},{url:"assets/Delete-EIwHHIly.js",revision:null},{url:"assets/details-Bnboni95.js",revision:null},{url:"assets/details-C2ntg9Mj.css",revision:null},{url:"assets/favorites._favoriteId.notes.lazy-C1RRhXeL.js",revision:null},{url:"assets/favorites._id.details.lazy-BgueblGS.js",revision:null},{url:"assets/favorites.lazy-DySnNYeh.js",revision:null},{url:"assets/House-BjZrhFN6.js",revision:null},{url:"assets/html2canvas-BfYXEYrK.js",revision:null},{url:"assets/index-BPZPc-q_.js",revision:null},{url:"assets/index-BT7M2hRi.css",revision:null},{url:"assets/index.esm-kPrhTTbm.js",revision:null},{url:"assets/list._id.details.lazy-xvcfPorb.js",revision:null},{url:"assets/list._id.percents.lazy-DzQMPR8x.js",revision:null},{url:"assets/list.lazy-DwFYPmMC.js",revision:null},{url:"assets/mui-DBxVcJ6g.js",revision:null},{url:"assets/notifications-DMgXVDV_.js",revision:null},{url:"assets/notifications.lazy-BtLX5VQ6.js",revision:null},{url:"assets/products-CGfYEKjK.js",revision:null},{url:"assets/react-Csw2ODfV.js",revision:null},{url:"assets/scanner.lazy-Rj5MSHMs.js",revision:null},{url:"assets/stats.lazy-COIWblkA.js",revision:null},{url:"assets/swiper-Ct-44qY_.js",revision:null},{url:"assets/tanstack-B1QI3o30.js",revision:null},{url:"assets/tesseract-BMdbIYWr.js",revision:null},{url:"assets/use-no-scroll-B88LyvgJ.js",revision:null},{url:"assets/vendor-chip-CmV0Cenn.js",revision:null},{url:"index.html",revision:"42632481d22dd81b354c1aedd9d10778"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"sw-custom.js",revision:"c89c98d3bfb698131c799a307cb9f433"},{url:"192.png",revision:"573e5686c58e15502aea81d236655b36"},{url:"favicon.ico",revision:"b42343161a45786d8517953bc28c4ecd"},{url:"logo.webp",revision:"5cd636440df551ca9e859c4ef8418dbf"},{url:"manifest.webmanifest",revision:"b5416dda2484738e66e77c8e55dfad80"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{allowlist:[/^\/lets\//]})),s.registerRoute(/^https:\/\/apis\.google\.com\/.*/i,new s.CacheFirst({cacheName:"google-api-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:1814400}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new s.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new s.ExpirationPlugin({maxEntries:8,maxAgeSeconds:2592e4}),new s.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
