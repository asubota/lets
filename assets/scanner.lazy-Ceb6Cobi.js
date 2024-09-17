import{_ as P,r as ot,m as st,a as g,u as nt,b as rt,g as at,c as it,d as M,j as e,s as _,P as Z,e as $,f as F,l as T,h as j,i as lt,I as Y,k as ct,n as dt,o as L,p as E,q as pt,B as x,L as G,t as N,C as ut,v as xt}from"./index-Cs9TdRZ2.js";const gt=["className","elementType","ownerState","externalForwardedProps","getSlotOwnerState","internalForwardedProps"],vt=["component","slots","slotProps"],ft=["component"];function D(t,s){const{className:n,elementType:o,ownerState:c,externalForwardedProps:p,getSlotOwnerState:h,internalForwardedProps:m}=s,v=P(s,gt),{component:f,slots:l={[t]:void 0},slotProps:w={[t]:void 0}}=p,b=P(p,vt),y=l[t]||o,C=ot(w[t],c),a=st(g({className:n},v,{externalForwardedProps:t==="root"?b:void 0,externalSlotProps:C})),{props:{component:i},internalRef:r}=a,d=P(a.props,ft),k=nt(r,C==null?void 0:C.ref,s.ref),u=h?h(d):{},S=g({},c,u),I=t==="root"?i||f:i,A=rt(y,g({},t==="root"&&!f&&!l[t]&&m,t!=="root"&&!l[t]&&m,d,I&&{as:I},{ref:k}),S);return Object.keys(u).forEach(z=>{delete A[z]}),[y,A]}function ht(t){return it("MuiAlert",t)}const U=at("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),mt=M(e.jsx("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),jt=M(e.jsx("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),yt=M(e.jsx("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),Ct=M(e.jsx("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),St=M(e.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close"),wt=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],bt=t=>{const{variant:s,color:n,severity:o,classes:c}=t,p={root:["root",`color${$(n||o)}`,`${s}${$(n||o)}`,`${s}`],icon:["icon"],message:["message"],action:["action"]};return dt(p,ht,c)},It=_(Z,{name:"MuiAlert",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:n}=t;return[s.root,s[n.variant],s[`${n.variant}${$(n.color||n.severity)}`]]}})(({theme:t})=>{const s=t.palette.mode==="light"?F:T,n=t.palette.mode==="light"?T:F;return g({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(t.palette).filter(([,o])=>o.main&&o.light).map(([o])=>({props:{colorSeverity:o,variant:"standard"},style:{color:t.vars?t.vars.palette.Alert[`${o}Color`]:s(t.palette[o].light,.6),backgroundColor:t.vars?t.vars.palette.Alert[`${o}StandardBg`]:n(t.palette[o].light,.9),[`& .${U.icon}`]:t.vars?{color:t.vars.palette.Alert[`${o}IconColor`]}:{color:t.palette[o].main}}})),...Object.entries(t.palette).filter(([,o])=>o.main&&o.light).map(([o])=>({props:{colorSeverity:o,variant:"outlined"},style:{color:t.vars?t.vars.palette.Alert[`${o}Color`]:s(t.palette[o].light,.6),border:`1px solid ${(t.vars||t).palette[o].light}`,[`& .${U.icon}`]:t.vars?{color:t.vars.palette.Alert[`${o}IconColor`]}:{color:t.palette[o].main}}})),...Object.entries(t.palette).filter(([,o])=>o.main&&o.dark).map(([o])=>({props:{colorSeverity:o,variant:"filled"},style:g({fontWeight:t.typography.fontWeightMedium},t.vars?{color:t.vars.palette.Alert[`${o}FilledColor`],backgroundColor:t.vars.palette.Alert[`${o}FilledBg`]}:{backgroundColor:t.palette.mode==="dark"?t.palette[o].dark:t.palette[o].main,color:t.palette.getContrastText(t.palette[o].main)})}))]})}),Mt=_("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(t,s)=>s.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),At=_("div",{name:"MuiAlert",slot:"Message",overridesResolver:(t,s)=>s.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),q=_("div",{name:"MuiAlert",slot:"Action",overridesResolver:(t,s)=>s.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),V={success:e.jsx(mt,{fontSize:"inherit"}),warning:e.jsx(jt,{fontSize:"inherit"}),error:e.jsx(yt,{fontSize:"inherit"}),info:e.jsx(Ct,{fontSize:"inherit"})},Pt=j.forwardRef(function(s,n){const o=lt({props:s,name:"MuiAlert"}),{action:c,children:p,className:h,closeText:m="Close",color:v,components:f={},componentsProps:l={},icon:w,iconMapping:b=V,onClose:y,role:C="alert",severity:a="success",slotProps:i={},slots:r={},variant:d="standard"}=o,k=P(o,wt),u=g({},o,{color:v,severity:a,variant:d,colorSeverity:v||a}),S=bt(u),I={slots:g({closeButton:f.CloseButton,closeIcon:f.CloseIcon},r),slotProps:g({},l,i)},[A,z]=D("closeButton",{elementType:Y,externalForwardedProps:I,ownerState:u}),[tt,et]=D("closeIcon",{elementType:St,externalForwardedProps:I,ownerState:u});return e.jsxs(It,g({role:C,elevation:0,ownerState:u,className:ct(S.root,h),ref:n},k,{children:[w!==!1?e.jsx(Mt,{ownerState:u,className:S.icon,children:w||b[a]||V[a]}):null,e.jsx(At,{ownerState:u,className:S.message,children:p}),c!=null?e.jsx(q,{ownerState:u,className:S.action,children:c}):null,c==null&&y?e.jsx(q,{ownerState:u,className:S.action,children:e.jsx(A,g({size:"small","aria-label":m,title:m,color:"inherit",onClick:y},z,{children:e.jsx(tt,g({fontSize:"small"},et))}))}):null]}))});var W={},Rt=E;Object.defineProperty(W,"__esModule",{value:!0});var J=W.default=void 0,_t=Rt(L()),X=e;J=W.default=(0,_t.default)([(0,X.jsx)("circle",{cx:"12",cy:"12",r:"3.2"},"0"),(0,X.jsx)("path",{d:"M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"},"1")],"CameraAlt");var B={},kt=E;Object.defineProperty(B,"__esModule",{value:!0});var K=B.default=void 0,zt=kt(L()),$t=e;K=B.default=(0,zt.default)((0,$t.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search");const O=140,R=32,Ot=async()=>await pt.createWorker(["ukr","eng"],1),Lt=async()=>{try{return await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"environment"}})}catch{return await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user"}})}},Et=t=>{const s=t.videoWidth,n=t.videoHeight,o=t.clientWidth,c=t.clientHeight,p=o/s,h=c/n,m=O*p,v=R*h,f=(o-O)/2,l=(c-R)/2-120;return{x:f,y:l,width:m,height:v}},Wt=({cropArea:t,output:s})=>e.jsx(x,{sx:{position:"absolute",left:t.x,top:t.y+R+30,zIndex:1,minWidth:t.width},children:e.jsx(Z,{sx:{pl:"4px",pr:"4px"},children:s})}),Bt=({cropArea:t})=>e.jsxs(x,{width:"100%",height:"100%",component:"svg",sx:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"},children:[e.jsx("defs",{children:e.jsxs("mask",{id:"mask",children:[e.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",fill:"white"}),e.jsx("rect",{x:t.x,y:t.y,width:t.width,height:t.height,fill:"black"})]})}),e.jsx("rect",{x:"0",y:"0",width:"100%",height:"100%",mask:"url(#mask)",fill:"rgba(0, 0, 0, 0.5)"})]}),Ht=({cropArea:t})=>e.jsx(x,{sx:{position:"absolute",border:"1px solid",borderColor:"primary.main",boxSizing:"border-box",pointerEvents:"none",left:t.x,top:t.y,width:t.width,height:t.height}});var H={},Ft=E;Object.defineProperty(H,"__esModule",{value:!0});var Q=H.default=void 0,Tt=Ft(L()),Nt=e;Q=H.default=(0,Tt.default)((0,Nt.jsx)("path",{d:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"}),"ArrowBack");const Dt=()=>e.jsx(Y,{component:G,to:"/",sx:{zIndex:1,position:"absolute",top:"15px",left:"15px",color:"primary.main"},children:e.jsx(Q,{})}),Ut=()=>{const[t,s]=j.useState(!1),[n,o]=j.useState(""),[c,p]=j.useState(!1),[h,m]=j.useState(null),v=j.useRef(null),f=j.useRef(null),[l,w]=j.useState({x:0,y:0,width:O,height:R});j.useEffect(()=>{const i=(async()=>{try{const r=await Lt(),d=v.current;return d&&(d.srcObject=r,d.onloadedmetadata=()=>{d.play(),w(Et(d)),s(!0)}),r}catch(r){console.error("Error accessing webcam: ",r),m(r==null?void 0:r.toString())}})();return()=>{i.then(r=>{r&&r.getTracks().forEach(d=>d.stop())})}},[]);const b=()=>{const a=f.current,i=v.current;if(a&&i){const r=a.getContext("2d");a.width=i.videoWidth,a.height=i.videoHeight,r&&(r.drawImage(i,0,0,a.width,a.height),y(a.toDataURL("image/jpeg")))}},y=async a=>{p(!0);try{const i=await Ot(),{data:{text:r}}=await i.recognize(a,{rectangle:{top:l.y,left:l.x,width:l.width,height:l.height}});o(r.trim()),await i.terminate()}catch(i){console.log("## e",i)}p(!1)},C=e.jsxs(x,{sx:{position:"absolute",bottom:"80px",left:"50%",transform:"translateX(-50%)",zIndex:1,display:"flex",gap:"20px"},children:[e.jsx(N,{variant:"contained",onClick:b,disabled:c,children:e.jsx(J,{})}),e.jsx(N,{component:G,to:"/",search:n.length?{s:n}:{},variant:"contained",children:e.jsx(K,{})})]});return e.jsxs(x,{sx:{overflow:"hidden",position:"relative"},children:[!!h&&e.jsx(x,{sx:{p:3,position:"absolute",top:"200px"},children:e.jsx(Pt,{severity:"error",children:h.toString()})}),!t&&e.jsx(x,{sx:{position:"absolute",top:"0",height:"150px",width:"100%",display:"flex",alignItems:"flex-end",justifyContent:"center"},children:e.jsx(ut,{sx:{color:"primary.main"}})}),e.jsx(Dt,{}),t&&C,e.jsx(x,{sx:{display:"flex",justifyContent:"center"},children:e.jsxs(x,{sx:{position:"relative"},children:[t&&e.jsx(Wt,{cropArea:l,output:n}),t&&e.jsx(Bt,{cropArea:l}),t&&e.jsx(Ht,{cropArea:l}),e.jsx(x,{component:"video",ref:v,playsInline:!0,muted:!0,sx:{visibility:t?"visible":"hidden"}})]})}),e.jsx(x,{component:"canvas",ref:f,sx:{display:"none"}})]})},Vt=xt("/scanner")({component:Ut});export{Vt as Route};
