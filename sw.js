if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let t={};const o=e=>i(e,l),u={module:{uri:l},exports:t,require:o};s[l]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";importScripts("sw-4.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/colors.lazy-BJB-0Z97.js",revision:null},{url:"assets/index-C80x7e9J.js",revision:null},{url:"assets/index-wJ90an7I.css",revision:null},{url:"assets/mui-DuDkKenD.js",revision:null},{url:"assets/react-C9_qfvjK.js",revision:null},{url:"assets/scanner.lazy-DN4Xnl-5.js",revision:null},{url:"assets/swiper-CeyCXhDy.js",revision:null},{url:"index.html",revision:"881bcb2352e0e40dc653aeed9ab6f9ed"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"sw-4.js",revision:"e64bf09703a87d6dd4c47c64cb2791e3"},{url:"manifest.webmanifest",revision:"26f2c88ed0798bf5f0f0f1223d80552e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{allowlist:[/\/lets\//]}))}));
