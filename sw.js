if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let t={};const o=s=>i(s,r),u={module:{uri:r},exports:t,require:o};e[r]=Promise.all(l.map((s=>u[s]||o(s)))).then((s=>(n(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";importScripts("src/sw2.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/colors.lazy-ewBTTUVA.js",revision:null},{url:"assets/createSvgIcon-DC2NCxUz.js",revision:null},{url:"assets/index-BLh7Lzr3.css",revision:null},{url:"assets/index-Dwem2jv5.css",revision:null},{url:"assets/index-eRxboswl.js",revision:null},{url:"assets/index.lazy-DLcyljKQ.js",revision:null},{url:"assets/link-ChO8H-3I.js",revision:null},{url:"assets/mui-C7jVnYTO.js",revision:null},{url:"assets/react-C9_qfvjK.js",revision:null},{url:"assets/scanner.lazy-O8VYIM6v.js",revision:null},{url:"assets/swiper-CeyCXhDy.js",revision:null},{url:"assets/vendor-chip-DaLivFPZ.js",revision:null},{url:"index.html",revision:"6a284a2a984e57078c73836e6ad52f7a"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"manifest.webmanifest",revision:"26f2c88ed0798bf5f0f0f1223d80552e"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{allowlist:[]}))}));
