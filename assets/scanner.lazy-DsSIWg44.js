import{j as t,L as b,k as R}from"./tanstack-fTfDZCpD.js";import{r as a}from"./react-BtIrUdbE.js";import{s as z}from"./list-Kp4YoUz9.js";import"./html2canvas-BfYXEYrK.js";import{h as y,B as n,P as E,I as W,g as w,A as H,i as L}from"./mui-C0rr871i.js";import"./index-CtUd9ZlL.js";const B=y(t.jsx("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack"),M=y([t.jsx("circle",{cx:"12",cy:"12",r:"3.2"},"0"),t.jsx("path",{d:"M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"},"1")],"CameraAlt"),O=y(t.jsx("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search"),v=140,f=32,D=async()=>await z.createWorker(["ukr","eng"],1),P=async()=>{try{return await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment"}})}catch{return await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user"}})}},U=e=>{const d=e.videoWidth,l=e.videoHeight,x=e.clientWidth,p=e.clientHeight,u=x/d,g=p/l,j=v*u,h=f*g,m=(x-v)/2,r=(p-f)/2-120;return{x:m,y:r,width:j,height:h}},V=({cropArea:e,output:d})=>t.jsx(n,{sx:{position:"absolute",left:e.x,top:e.y+f+30,zIndex:1,minWidth:e.width},children:t.jsx(E,{sx:{pl:"4px",pr:"4px"},children:d})}),A=({cropArea:e})=>t.jsxs(n,{component:"svg",sx:{width:"100%",height:"100%",position:"absolute",top:0,left:0,pointerEvents:"none"},children:[t.jsx("defs",{children:t.jsxs("mask",{id:"mask",children:[t.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),t.jsx("rect",{x:e.x,y:e.y,width:e.width,height:e.height,fill:"black"})]})}),t.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",mask:"url(#mask)",fill:"rgba(0, 0, 0, 0.5)"})]}),X=({cropArea:e})=>t.jsx(n,{sx:{position:"absolute",border:"1px solid",borderColor:"primary.main",boxSizing:"border-box",pointerEvents:"none",left:e.x,top:e.y,width:e.width,height:e.height}}),_=()=>t.jsx(W,{component:b,to:"/",sx:{zIndex:1,position:"absolute",top:"15px",left:"15px",color:"primary.main"},children:t.jsx(B,{})}),F=()=>{const[e,d]=a.useState(!1),[l,x]=a.useState(""),[p,u]=a.useState(!1),[g,j]=a.useState(null),h=a.useRef(null),m=a.useRef(null),[r,k]=a.useState({x:0,y:0,width:v,height:f});a.useEffect(()=>{const i=(async()=>{try{const s=await P(),c=h.current;return c&&(c.srcObject=s,c.onloadedmetadata=()=>{c.play(),k(U(c)),d(!0)}),s}catch(s){console.error("Error accessing webcam: ",s),j(s==null?void 0:s.toString())}})();return()=>{i.then(s=>{s&&s.getTracks().forEach(c=>c.stop())})}},[]);const S=()=>{const o=m.current,i=h.current;if(o&&i){const s=o.getContext("2d");o.width=i.videoWidth,o.height=i.videoHeight,s&&(s.drawImage(i,0,0,o.width,o.height),C(o.toDataURL("image/jpeg")))}},C=async o=>{u(!0);try{const i=await D(),{data:{text:s}}=await i.recognize(o,{rectangle:{top:r.y,left:r.x,width:r.width,height:r.height}});x(s.trim()),await i.terminate()}catch(i){console.log("## e",i)}u(!1)},I=t.jsxs(n,{sx:{position:"absolute",bottom:"80px",left:"50%",transform:"translateX(-50%)",zIndex:1,display:"flex",gap:"20px"},children:[t.jsx(w,{variant:"contained",onClick:S,disabled:p,children:t.jsx(M,{})}),t.jsx(w,{component:b,to:"/",search:l.length?{s:l}:{},variant:"contained",children:t.jsx(O,{})})]});return t.jsxs(n,{sx:{overflow:"hidden",position:"relative"},children:[!!g&&t.jsx(n,{sx:{p:3,position:"absolute",top:"200px"},children:t.jsx(H,{severity:"error",children:g.toString()})}),!e&&t.jsx(n,{sx:{position:"absolute",top:"0",height:"150px",width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"center"},children:t.jsx(L,{sx:{color:"primary.main"}})}),t.jsx(_,{}),e&&I,t.jsx(n,{sx:{display:"flex",justifyContent:"center"},children:t.jsxs(n,{sx:{position:"relative"},children:[e&&t.jsx(V,{cropArea:r,output:l}),e&&t.jsx(A,{cropArea:r}),e&&t.jsx(X,{cropArea:r}),t.jsx(n,{component:"video",ref:h,playsInline:!0,muted:!0,sx:{visibility:e?"visible":"hidden"}})]})}),t.jsx(n,{component:"canvas",ref:m,sx:{display:"none"}})]})},N=R("/scanner")({component:F});export{N as Route};