var ne={exports:{}},Ae;function or(){return Ae||(Ae=1,function(i){var s=function(t){var f=Object.prototype,c=f.hasOwnProperty,a=Object.defineProperty||function(r,e,n){r[e]=n.value},h,v=typeof Symbol=="function"?Symbol:{},_=v.iterator||"@@iterator",P=v.asyncIterator||"@@asyncIterator",q=v.toStringTag||"@@toStringTag";function k(r,e,n){return Object.defineProperty(r,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),r[e]}try{k({},"")}catch{k=function(e,n,u){return e[n]=u}}function B(r,e,n,u){var o=e&&e.prototype instanceof M?e:M,p=Object.create(o.prototype),L=new H(u||[]);return a(p,"_invoke",{value:X(r,n,L)}),p}t.wrap=B;function N(r,e,n){try{return{type:"normal",arg:r.call(e,n)}}catch(u){return{type:"throw",arg:u}}}var W="suspendedStart",g="suspendedYield",E="executing",C="completed",S={};function M(){}function m(){}function j(){}var Y={};k(Y,_,function(){return this});var J=Object.getPrototypeOf,$=J&&J(J(V([])));$&&$!==f&&c.call($,_)&&(Y=$);var G=j.prototype=M.prototype=Object.create(Y);m.prototype=j,a(G,"constructor",{value:j,configurable:!0}),a(j,"constructor",{value:m,configurable:!0}),m.displayName=k(j,q,"GeneratorFunction");function K(r){["next","throw","return"].forEach(function(e){k(r,e,function(n){return this._invoke(e,n)})})}t.isGeneratorFunction=function(r){var e=typeof r=="function"&&r.constructor;return e?e===m||(e.displayName||e.name)==="GeneratorFunction":!1},t.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,j):(r.__proto__=j,k(r,q,"GeneratorFunction")),r.prototype=Object.create(G),r},t.awrap=function(r){return{__await:r}};function U(r,e){function n(p,L,y,A){var w=N(r[p],r,L);if(w.type==="throw")A(w.arg);else{var Z=w.arg,F=Z.value;return F&&typeof F=="object"&&c.call(F,"__await")?e.resolve(F.__await).then(function(D){n("next",D,y,A)},function(D){n("throw",D,y,A)}):e.resolve(F).then(function(D){Z.value=D,y(Z)},function(D){return n("throw",D,y,A)})}}var u;function o(p,L){function y(){return new e(function(A,w){n(p,L,A,w)})}return u=u?u.then(y,y):y()}a(this,"_invoke",{value:o})}K(U.prototype),k(U.prototype,P,function(){return this}),t.AsyncIterator=U,t.async=function(r,e,n,u,o){o===void 0&&(o=Promise);var p=new U(B(r,e,n,u),o);return t.isGeneratorFunction(e)?p:p.next().then(function(L){return L.done?L.value:p.next()})};function X(r,e,n){var u=W;return function(p,L){if(u===E)throw new Error("Generator is already running");if(u===C){if(p==="throw")throw L;return O()}for(n.method=p,n.arg=L;;){var y=n.delegate;if(y){var A=x(y,n);if(A){if(A===S)continue;return A}}if(n.method==="next")n.sent=n._sent=n.arg;else if(n.method==="throw"){if(u===W)throw u=C,n.arg;n.dispatchException(n.arg)}else n.method==="return"&&n.abrupt("return",n.arg);u=E;var w=N(r,e,n);if(w.type==="normal"){if(u=n.done?C:g,w.arg===S)continue;return{value:w.arg,done:n.done}}else w.type==="throw"&&(u=C,n.method="throw",n.arg=w.arg)}}}function x(r,e){var n=e.method,u=r.iterator[n];if(u===h)return e.delegate=null,n==="throw"&&r.iterator.return&&(e.method="return",e.arg=h,x(r,e),e.method==="throw")||n!=="return"&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+n+"' method")),S;var o=N(u,r.iterator,e.arg);if(o.type==="throw")return e.method="throw",e.arg=o.arg,e.delegate=null,S;var p=o.arg;if(!p)return e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,S;if(p.done)e[r.resultName]=p.value,e.next=r.nextLoc,e.method!=="return"&&(e.method="next",e.arg=h);else return p;return e.delegate=null,S}K(G),k(G,q,"Generator"),k(G,_,function(){return this}),k(G,"toString",function(){return"[object Generator]"});function re(r){var e={tryLoc:r[0]};1 in r&&(e.catchLoc=r[1]),2 in r&&(e.finallyLoc=r[2],e.afterLoc=r[3]),this.tryEntries.push(e)}function I(r){var e=r.completion||{};e.type="normal",delete e.arg,r.completion=e}function H(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(re,this),this.reset(!0)}t.keys=function(r){var e=Object(r),n=[];for(var u in e)n.push(u);return n.reverse(),function o(){for(;n.length;){var p=n.pop();if(p in e)return o.value=p,o.done=!1,o}return o.done=!0,o}};function V(r){if(r){var e=r[_];if(e)return e.call(r);if(typeof r.next=="function")return r;if(!isNaN(r.length)){var n=-1,u=function o(){for(;++n<r.length;)if(c.call(r,n))return o.value=r[n],o.done=!1,o;return o.value=h,o.done=!0,o};return u.next=u}}return{next:O}}t.values=V;function O(){return{value:h,done:!0}}return H.prototype={constructor:H,reset:function(r){if(this.prev=0,this.next=0,this.sent=this._sent=h,this.done=!1,this.delegate=null,this.method="next",this.arg=h,this.tryEntries.forEach(I),!r)for(var e in this)e.charAt(0)==="t"&&c.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=h)},stop:function(){this.done=!0;var r=this.tryEntries[0],e=r.completion;if(e.type==="throw")throw e.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var e=this;function n(A,w){return p.type="throw",p.arg=r,e.next=A,w&&(e.method="next",e.arg=h),!!w}for(var u=this.tryEntries.length-1;u>=0;--u){var o=this.tryEntries[u],p=o.completion;if(o.tryLoc==="root")return n("end");if(o.tryLoc<=this.prev){var L=c.call(o,"catchLoc"),y=c.call(o,"finallyLoc");if(L&&y){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(L){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else if(y){if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(r,e){for(var n=this.tryEntries.length-1;n>=0;--n){var u=this.tryEntries[n];if(u.tryLoc<=this.prev&&c.call(u,"finallyLoc")&&this.prev<u.finallyLoc){var o=u;break}}o&&(r==="break"||r==="continue")&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var p=o?o.completion:{};return p.type=r,p.arg=e,o?(this.method="next",this.next=o.finallyLoc,S):this.complete(p)},complete:function(r,e){if(r.type==="throw")throw r.arg;return r.type==="break"||r.type==="continue"?this.next=r.arg:r.type==="return"?(this.rval=this.arg=r.arg,this.method="return",this.next="end"):r.type==="normal"&&e&&(this.next=e),S},finish:function(r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===r)return this.complete(n.completion,n.afterLoc),I(n),S}},catch:function(r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===r){var u=n.completion;if(u.type==="throw"){var o=u.arg;I(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(r,e,n){return this.delegate={iterator:V(r),resultName:e,nextLoc:n},this.method==="next"&&(this.arg=h),S}},t}(i.exports);try{regeneratorRuntime=s}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=s:Function("r","regeneratorRuntime = r")(s)}}(ne)),ne.exports}var oe,Te;function ke(){return Te||(Te=1,oe=(i,s)=>`${i}-${s}-${Math.random().toString(16).slice(3,8)}`),oe}var ie,_e;function Ze(){if(_e)return ie;_e=1;const i=ke();let s=0;return ie=({id:t,action:f,payload:c={}})=>{let a=t;return typeof a>"u"&&(a=i("Job",s),s+=1),{id:a,action:f,payload:c}},ie}var Q={},qe;function Oe(){if(qe)return Q;qe=1;let i=!1;return Q.logging=i,Q.setLogging=s=>{i=s},Q.log=(...s)=>i?console.log.apply(this,s):null,Q}var se,je;function ir(){if(je)return se;je=1;const i=Ze(),{log:s}=Oe(),t=ke();let f=0;return se=()=>{const c=t("Scheduler",f),a={},h={};let v=[];f+=1;const _=()=>v.length,P=()=>Object.keys(a).length,q=()=>{if(v.length!==0){const g=Object.keys(a);for(let E=0;E<g.length;E+=1)if(typeof h[g[E]]>"u"){v[0](a[g[E]]);break}}},k=(g,E)=>new Promise((C,S)=>{const M=i({action:g,payload:E});v.push(async m=>{v.shift(),h[m.id]=M;try{C(await m[g].apply(this,[...E,M.id]))}catch(j){S(j)}finally{delete h[m.id],q()}}),s(`[${c}]: Add ${M.id} to JobQueue`),s(`[${c}]: JobQueue length=${v.length}`),q()});return{addWorker:g=>(a[g.id]=g,s(`[${c}]: Add ${g.id}`),s(`[${c}]: Number of workers=${P()}`),q(),g.id),addJob:async(g,...E)=>{if(P()===0)throw Error(`[${c}]: You need to have at least one worker before adding jobs`);return k(g,E)},terminate:async()=>{Object.keys(a).forEach(async g=>{await a[g].terminate()}),v=[]},getQueueLen:_,getNumWorkers:P}},se}function sr(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ae,Pe;function ar(){if(Pe)return ae;Pe=1;function i(){return!!(typeof window<"u"&&typeof window.process=="object"&&window.process.type==="renderer"||typeof process<"u"&&typeof process.versions=="object"&&process.versions.electron||typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Electron")>=0)}return ae=i,ae}var ce,Ie;function cr(){if(Ie)return ce;Ie=1;const i=ar();return ce=s=>{const t={};return typeof WorkerGlobalScope<"u"?t.type="webworker":i()?t.type="electron":typeof document=="object"?t.type="browser":typeof process=="object"&&typeof sr=="function"&&(t.type="node"),typeof s>"u"?t:t[s]},ce}var ue,Ne;function ur(){if(Ne)return ue;Ne=1;const s=cr()("type")==="browser"?t=>new URL(t,window.location.href).href:t=>t;return ue=t=>{const f={...t};return["corePath","workerPath","langPath"].forEach(c=>{t[c]&&(f[c]=s(f[c]))}),f},ue}var le,Ce;function lr(){return Ce||(Ce=1,le=i=>{const s=[],t=[],f=[],c=[],a=[];return i.blocks&&i.blocks.forEach(h=>{h.paragraphs.forEach(v=>{v.lines.forEach(_=>{_.words.forEach(P=>{P.symbols.forEach(q=>{a.push({...q,page:i,block:h,paragraph:v,line:_,word:P})}),c.push({...P,page:i,block:h,paragraph:v,line:_})}),f.push({..._,page:i,block:h,paragraph:v})}),t.push({...v,page:i,block:h})}),s.push({...h,page:i})}),{...i,blocks:s,paragraphs:t,lines:f,words:c,symbols:a}}),le}var fe,Me;function Qe(){return Me||(Me=1,fe={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3}),fe}const fr="tesseract.js",dr="5.1.1",hr="Pure Javascript Multilingual OCR",pr="src/index.js",vr="src/index.d.ts",gr="dist/tesseract.min.js",mr="dist/tesseract.min.js",wr={start:"node scripts/server.js",build:"rimraf dist && webpack --config scripts/webpack.config.prod.js && rollup -c scripts/rollup.esm.mjs","profile:tesseract":"webpack-bundle-analyzer dist/tesseract-stats.json","profile:worker":"webpack-bundle-analyzer dist/worker-stats.json",prepublishOnly:"npm run build",wait:"rimraf dist && wait-on http://localhost:3000/dist/tesseract.min.js",test:"npm-run-all -p -r start test:all","test:all":"npm-run-all wait test:browser:* test:node:all","test:node":"nyc mocha --exit --bail --require ./scripts/test-helper.js","test:node:all":"npm run test:node -- ./tests/*.test.js","test:browser-tpl":"mocha-headless-chrome -a incognito -a no-sandbox -a disable-setuid-sandbox -a disable-logging -t 300000","test:browser:detect":"npm run test:browser-tpl -- -f ./tests/detect.test.html","test:browser:recognize":"npm run test:browser-tpl -- -f ./tests/recognize.test.html","test:browser:scheduler":"npm run test:browser-tpl -- -f ./tests/scheduler.test.html","test:browser:FS":"npm run test:browser-tpl -- -f ./tests/FS.test.html",lint:"eslint src","lint:fix":"eslint --fix src",postinstall:"opencollective-postinstall || true"},yr={"./src/worker/node/index.js":"./src/worker/browser/index.js"},br="",Lr=["jeromewu"],Er="Apache-2.0",Sr={"@babel/core":"^7.21.4","@babel/eslint-parser":"^7.21.3","@babel/preset-env":"^7.21.4","@rollup/plugin-commonjs":"^24.1.0",acorn:"^8.8.2","babel-loader":"^9.1.2",buffer:"^6.0.3",cors:"^2.8.5",eslint:"^7.32.0","eslint-config-airbnb-base":"^14.2.1","eslint-plugin-import":"^2.27.5","expect.js":"^0.3.1",express:"^4.18.2",mocha:"^10.2.0","mocha-headless-chrome":"^4.0.0","npm-run-all":"^4.1.5",nyc:"^15.1.0",rimraf:"^5.0.0",rollup:"^3.20.7","wait-on":"^7.0.1",webpack:"^5.79.0","webpack-bundle-analyzer":"^4.8.0","webpack-cli":"^5.0.1","webpack-dev-middleware":"^6.0.2","rollup-plugin-sourcemaps":"^0.6.3"},Rr={"bmp-js":"^0.1.0","idb-keyval":"^6.2.0","is-electron":"^2.2.2","is-url":"^1.2.4","node-fetch":"^2.6.9","opencollective-postinstall":"^2.0.3","regenerator-runtime":"^0.13.3","tesseract.js-core":"^5.1.1","wasm-feature-detect":"^1.2.11",zlibjs:"^0.3.1"},kr={"@rollup/pluginutils":"^5.0.2"},Or={type:"git",url:"https://github.com/naptha/tesseract.js.git"},Ar={url:"https://github.com/naptha/tesseract.js/issues"},Tr="https://github.com/naptha/tesseract.js",_r={type:"opencollective",url:"https://opencollective.com/tesseractjs"},qr={name:fr,version:dr,description:hr,main:pr,types:vr,unpkg:gr,jsdelivr:mr,scripts:wr,browser:yr,author:br,contributors:Lr,license:Er,devDependencies:Sr,dependencies:Rr,overrides:kr,repository:Or,bugs:Ar,homepage:Tr,collective:_r};var de,Ge;function jr(){return Ge||(Ge=1,de={workerBlobURL:!0,logger:()=>{}}),de}var he,De;function Pr(){if(De)return he;De=1;const i=qr.version;return he={...jr(),workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${i}/dist/worker.min.js`},he}var pe,ze;function Ir(){return ze||(ze=1,pe=({workerPath:i,workerBlobURL:s})=>{let t;if(Blob&&URL&&s){const f=new Blob([`importScripts("${i}");`],{type:"application/javascript"});t=new Worker(URL.createObjectURL(f))}else t=new Worker(i);return t}),pe}var ve,$e;function Nr(){return $e||($e=1,ve=i=>{i.terminate()}),ve}var ge,Ue;function Cr(){return Ue||(Ue=1,ge=(i,s)=>{i.onmessage=({data:t})=>{s(t)}}),ge}var me,We;function Mr(){return We||(We=1,me=async(i,s)=>{i.postMessage(s)}),me}var we,Fe;function Gr(){if(Fe)return we;Fe=1;const i=t=>new Promise((f,c)=>{const a=new FileReader;a.onload=()=>{f(a.result)},a.onerror=({target:{error:{code:h}}})=>{c(Error(`File could not be read! Code=${h}`))},a.readAsArrayBuffer(t)}),s=async t=>{let f=t;if(typeof t>"u")return"undefined";if(typeof t=="string")/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(t)?f=atob(t.split(",")[1]).split("").map(c=>c.charCodeAt(0)):f=await(await fetch(t)).arrayBuffer();else if(typeof HTMLElement<"u"&&t instanceof HTMLElement)t.tagName==="IMG"&&(f=await s(t.src)),t.tagName==="VIDEO"&&(f=await s(t.poster)),t.tagName==="CANVAS"&&await new Promise(c=>{t.toBlob(async a=>{f=await i(a),c()})});else if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const c=await t.convertToBlob();f=await i(c)}else(t instanceof File||t instanceof Blob)&&(f=await i(t));return new Uint8Array(f)};return we=s,we}var ye,Be;function Dr(){if(Be)return ye;Be=1;const i=Pr(),s=Ir(),t=Nr(),f=Cr(),c=Mr(),a=Gr();return ye={defaultOptions:i,spawnWorker:s,terminateWorker:t,onMessage:f,send:c,loadImage:a},ye}var be,Ye;function Xe(){if(Ye)return be;Ye=1;const i=ur(),s=lr(),t=Ze(),{log:f}=Oe(),c=ke(),a=Qe(),{defaultOptions:h,spawnWorker:v,terminateWorker:_,onMessage:P,loadImage:q,send:k}=Dr();let B=0;return be=async(N="eng",W=a.LSTM_ONLY,g={},E={})=>{const C=c("Worker",B),{logger:S,errorHandler:M,...m}=i({...h,...g}),j={},Y={},J=typeof N=="string"?N.split("+"):N;let $=W,G=E;const K=[a.DEFAULT,a.LSTM_ONLY].includes(W)&&!m.legacyCore;let U,X;const x=new Promise((l,d)=>{X=l,U=d}),re=l=>{U(l.message)};let I=v(m);I.onerror=re,B+=1;const H=(l,d)=>{j[l]=d},V=(l,d)=>{Y[l]=d},O=({id:l,action:d,payload:b})=>new Promise((T,R)=>{f(`[${C}]: Start ${l}, action=${d}`);const z=`${d}-${l}`;H(z,T),V(z,R),k(I,{workerId:C,jobId:l,action:d,payload:b})}),r=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),e=l=>O(t({id:l,action:"load",payload:{options:{lstmOnly:K,corePath:m.corePath,logging:m.logging}}})),n=(l,d,b)=>O(t({id:b,action:"FS",payload:{method:"writeFile",args:[l,d]}})),u=(l,d)=>O(t({id:d,action:"FS",payload:{method:"readFile",args:[l,{encoding:"utf8"}]}})),o=(l,d)=>O(t({id:d,action:"FS",payload:{method:"unlink",args:[l]}})),p=(l,d,b)=>O(t({id:b,action:"FS",payload:{method:l,args:d}})),L=()=>console.warn("`loadLanguage` is depreciated and should be removed from code (workers now come with language pre-loaded)"),y=(l,d)=>O(t({id:d,action:"loadLanguage",payload:{langs:l,options:{langPath:m.langPath,dataPath:m.dataPath,cachePath:m.cachePath,cacheMethod:m.cacheMethod,gzip:m.gzip,lstmOnly:[a.DEFAULT,a.LSTM_ONLY].includes($)&&!m.legacyLang}}})),A=()=>console.warn("`initialize` is depreciated and should be removed from code (workers now come pre-initialized)"),w=(l,d,b,T)=>O(t({id:T,action:"initialize",payload:{langs:l,oem:d,config:b}})),Z=(l="eng",d,b,T)=>{if(K&&[a.TESSERACT_ONLY,a.TESSERACT_LSTM_COMBINED].includes(d))throw Error("Legacy model requested but code missing.");const R=d||$;$=R;const z=b||G;G=z;const te=(typeof l=="string"?l.split("+"):l).filter(nr=>!J.includes(nr));return J.push(...te),te.length>0?y(te,T).then(()=>w(l,R,z,T)):w(l,R,z,T)},F=(l={},d)=>O(t({id:d,action:"setParameters",payload:{params:l}})),D=async(l,d={},b={blocks:!0,text:!0,hocr:!0,tsv:!0},T)=>O(t({id:T,action:"recognize",payload:{image:await q(l),options:d,output:b}})),xe=(l="Tesseract OCR Result",d=!1,b)=>(console.log("`getPDF` function is depreciated. `recognize` option `savePDF` should be used instead."),O(t({id:b,action:"getPDF",payload:{title:l,textonly:d}}))),er=async(l,d)=>{if(K)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return O(t({id:d,action:"detect",payload:{image:await q(l)}}))},rr=async()=>(I!==null&&(_(I),I=null),Promise.resolve());P(I,({workerId:l,jobId:d,status:b,action:T,data:R})=>{const z=`${T}-${d}`;if(b==="resolve"){f(`[${l}]: Complete ${d}`);let ee=R;T==="recognize"?ee=s(R):T==="getPDF"&&(ee=Array.from({...R,length:Object.keys(R).length})),j[z]({jobId:d,data:ee})}else if(b==="reject")if(Y[z](R),T==="load"&&U(R),M)M(R);else throw Error(R);else b==="progress"&&S({...R,userJobId:d})});const tr={id:C,worker:I,setResolve:H,setReject:V,load:r,writeText:n,readText:u,removeFile:o,FS:p,loadLanguage:L,initialize:A,reinitialize:Z,setParameters:F,recognize:D,getPDF:xe,detect:er,terminate:rr};return e().then(()=>y(N)).then(()=>w(N,W,E)).then(()=>X(tr)).catch(()=>{}),x},be}var Le,Je;function zr(){if(Je)return Le;Je=1;const i=Xe();return Le={recognize:async(f,c,a)=>{const h=await i(c,1,a);return h.recognize(f).finally(async()=>{await h.terminate()})},detect:async(f,c)=>{const a=await i("osd",0,c);return a.detect(f).finally(async()=>{await a.terminate()})}},Le}var Ee,Ke;function $r(){return Ke||(Ke=1,Ee={AFR:"afr",AMH:"amh",ARA:"ara",ASM:"asm",AZE:"aze",AZE_CYRL:"aze_cyrl",BEL:"bel",BEN:"ben",BOD:"bod",BOS:"bos",BUL:"bul",CAT:"cat",CEB:"ceb",CES:"ces",CHI_SIM:"chi_sim",CHI_TRA:"chi_tra",CHR:"chr",CYM:"cym",DAN:"dan",DEU:"deu",DZO:"dzo",ELL:"ell",ENG:"eng",ENM:"enm",EPO:"epo",EST:"est",EUS:"eus",FAS:"fas",FIN:"fin",FRA:"fra",FRK:"frk",FRM:"frm",GLE:"gle",GLG:"glg",GRC:"grc",GUJ:"guj",HAT:"hat",HEB:"heb",HIN:"hin",HRV:"hrv",HUN:"hun",IKU:"iku",IND:"ind",ISL:"isl",ITA:"ita",ITA_OLD:"ita_old",JAV:"jav",JPN:"jpn",KAN:"kan",KAT:"kat",KAT_OLD:"kat_old",KAZ:"kaz",KHM:"khm",KIR:"kir",KOR:"kor",KUR:"kur",LAO:"lao",LAT:"lat",LAV:"lav",LIT:"lit",MAL:"mal",MAR:"mar",MKD:"mkd",MLT:"mlt",MSA:"msa",MYA:"mya",NEP:"nep",NLD:"nld",NOR:"nor",ORI:"ori",PAN:"pan",POL:"pol",POR:"por",PUS:"pus",RON:"ron",RUS:"rus",SAN:"san",SIN:"sin",SLK:"slk",SLV:"slv",SPA:"spa",SPA_OLD:"spa_old",SQI:"sqi",SRP:"srp",SRP_LATN:"srp_latn",SWA:"swa",SWE:"swe",SYR:"syr",TAM:"tam",TEL:"tel",TGK:"tgk",TGL:"tgl",THA:"tha",TIR:"tir",TUR:"tur",UIG:"uig",UKR:"ukr",URD:"urd",UZB:"uzb",UZB_CYRL:"uzb_cyrl",VIE:"vie",YID:"yid"}),Ee}var Se,He;function Ur(){return He||(He=1,Se={OSD_ONLY:"0",AUTO_OSD:"1",AUTO_ONLY:"2",AUTO:"3",SINGLE_COLUMN:"4",SINGLE_BLOCK_VERT_TEXT:"5",SINGLE_BLOCK:"6",SINGLE_LINE:"7",SINGLE_WORD:"8",CIRCLE_WORD:"9",SINGLE_CHAR:"10",SPARSE_TEXT:"11",SPARSE_TEXT_OSD:"12",RAW_LINE:"13"}),Se}var Re,Ve;function Wr(){if(Ve)return Re;Ve=1,or();const i=ir(),s=Xe(),t=zr(),f=$r(),c=Qe(),a=Ur(),{setLogging:h}=Oe();return Re={languages:f,OEM:c,PSM:a,createScheduler:i,createWorker:s,setLogging:h,...t},Re}export{Wr as r};
