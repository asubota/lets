if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const u=s=>i(s,l),o={module:{uri:l},exports:t,require:u};e[l]=Promise.all(n.map((s=>o[s]||u(s)))).then((s=>(r(...s),t)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/colors.lazy-DW6ZP5wX.js",revision:null},{url:"assets/createSvgIcon-D-X7AIqt.js",revision:null},{url:"assets/index-BLh7Lzr3.css",revision:null},{url:"assets/index-CX9599_r.js",revision:null},{url:"assets/index-Dwem2jv5.css",revision:null},{url:"assets/index.lazy-BErZR7ZD.js",revision:null},{url:"assets/link-CONDhXuC.js",revision:null},{url:"assets/mui-Kqx5AAYE.js",revision:null},{url:"assets/react-C9_qfvjK.js",revision:null},{url:"assets/scanner.lazy-BsQCCuqQ.js",revision:null},{url:"assets/swiper-CeyCXhDy.js",revision:null},{url:"assets/vendor-chip-CpyS4REJ.js",revision:null},{url:"index.html",revision:"ec1774c3aaea01323a86e7ab5d85e0e1"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"manifest.webmanifest",revision:"26f2c88ed0798bf5f0f0f1223d80552e"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
