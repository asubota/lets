if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-7dtRBumN.js",revision:null},{url:"assets/index-Dv1f9OAv.css",revision:null},{url:"assets/mui-WzyBCyJO.js",revision:null},{url:"assets/react-C9_qfvjK.js",revision:null},{url:"assets/swiper-B3TjkHbN.js",revision:null},{url:"index.html",revision:"6baef032f0e0037f3da01a380782cbde"},{url:"registerSW.js",revision:"7b4dde73e3a5760265872aa598068d49"},{url:"manifest.webmanifest",revision:"26f2c88ed0798bf5f0f0f1223d80552e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
