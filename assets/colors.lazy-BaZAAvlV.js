import{w as V,x as K,g as A,c as E,h as g,s as F,y as q,e as P,a as y,_ as S,z as Q,i as w,j as i,k as I,n as U,A as X,D as Y,E as Z,F as ee,G as te,H as oe,M as re,B as L,J as se,K as ae,S as ne,V as _,t as le,C as ie,v as de}from"./index-Cs9TdRZ2.js";function ce(e,t=0,r=1){return K(e,t,r)}function ue(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(o=>o+o)),r?`rgb${r.length===4?"a":""}(${r.map((o,d)=>d<3?parseInt(o,16):Math.round(parseInt(o,16)/255*1e3)/1e3).join(", ")})`:""}function D(e){if(e.type)return e;if(e.charAt(0)==="#")return D(ue(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error(V(9,e));let o=e.substring(t+1,e.length-1),d;if(r==="color"){if(o=o.split(" "),d=o.shift(),o.length===4&&o[3].charAt(0)==="/"&&(o[3]=o[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(d)===-1)throw new Error(V(10,d))}else o=o.split(",");return o=o.map(n=>parseFloat(n)),{type:r,values:o,colorSpace:d}}function pe(e){const{type:t,colorSpace:r}=e;let{values:o}=e;return t.indexOf("rgb")!==-1?o=o.map((d,n)=>n<3?parseInt(d,10):d):t.indexOf("hsl")!==-1&&(o[1]=`${o[1]}%`,o[2]=`${o[2]}%`),t.indexOf("color")!==-1?o=`${r} ${o.join(" ")}`:o=`${o.join(", ")}`,`${t}(${o})`}function G(e,t){return e=D(e),t=ce(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,pe(e)}function ge(e){return E("MuiToggleButton",e)}const O=A("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]),H=g.createContext({}),J=g.createContext(void 0);function fe(e,t){return t===void 0||e===void 0?!1:Array.isArray(t)?t.indexOf(e)>=0:e===t}const xe=["value"],be=["children","className","color","disabled","disableFocusRipple","fullWidth","onChange","onClick","selected","size","value"],Ce=e=>{const{classes:t,fullWidth:r,selected:o,disabled:d,size:n,color:C}=e,h={root:["root",o&&"selected",d&&"disabled",r&&"fullWidth",`size${P(n)}`,C]};return U(h,ge,t)},he=F(q,{name:"MuiToggleButton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`size${P(r.size)}`]]}})(({theme:e,ownerState:t})=>{let r=t.color==="standard"?e.palette.text.primary:e.palette[t.color].main,o;return e.vars&&(r=t.color==="standard"?e.vars.palette.text.primary:e.vars.palette[t.color].main,o=t.color==="standard"?e.vars.palette.text.primaryChannel:e.vars.palette[t.color].mainChannel),y({},e.typography.button,{borderRadius:(e.vars||e).shape.borderRadius,padding:11,border:`1px solid ${(e.vars||e).palette.divider}`,color:(e.vars||e).palette.action.active},t.fullWidth&&{width:"100%"},{[`&.${O.disabled}`]:{color:(e.vars||e).palette.action.disabled,border:`1px solid ${(e.vars||e).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`:G(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${O.selected}`]:{color:r,backgroundColor:e.vars?`rgba(${o} / ${e.vars.palette.action.selectedOpacity})`:G(r,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${o} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:G(r,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${o} / ${e.vars.palette.action.selectedOpacity})`:G(r,e.palette.action.selectedOpacity)}}}},t.size==="small"&&{padding:7,fontSize:e.typography.pxToRem(13)},t.size==="large"&&{padding:15,fontSize:e.typography.pxToRem(15)})}),N=g.forwardRef(function(t,r){const o=g.useContext(H),{value:d}=o,n=S(o,xe),C=g.useContext(J),h=Q(y({},n,{selected:fe(t.value,d)}),t),v=w({props:h,name:"MuiToggleButton"}),{children:p,className:f,color:j="standard",disabled:B=!1,disableFocusRipple:u=!1,fullWidth:W=!1,onChange:$,onClick:x,selected:R,size:k="medium",value:m}=v,T=S(v,be),z=y({},v,{color:j,disabled:B,disableFocusRipple:u,fullWidth:W,size:k}),l=Ce(z),s=b=>{x&&(x(b,m),b.defaultPrevented)||$&&$(b,m)},c=C||"";return i.jsx(he,y({className:I(n.className,l.root,f,c),disabled:B,focusRipple:!u,ref:r,onClick:s,onChange:$,value:m,ownerState:z,"aria-pressed":R},T,{children:p}))});function ve(e){return E("MuiToggleButtonGroup",e)}const a=A("MuiToggleButtonGroup",["root","selected","horizontal","vertical","disabled","grouped","groupedHorizontal","groupedVertical","fullWidth","firstButton","lastButton","middleButton"]),Be=["children","className","color","disabled","exclusive","fullWidth","onChange","orientation","size","value"],$e=e=>{const{classes:t,orientation:r,fullWidth:o,disabled:d}=e,n={root:["root",r==="vertical"&&"vertical",o&&"fullWidth"],grouped:["grouped",`grouped${P(r)}`,d&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return U(n,ve,t)},me=F("div",{name:"MuiToggleButtonGroup",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[{[`& .${a.grouped}`]:t.grouped},{[`& .${a.grouped}`]:t[`grouped${P(r.orientation)}`]},{[`& .${a.firstButton}`]:t.firstButton},{[`& .${a.lastButton}`]:t.lastButton},{[`& .${a.middleButton}`]:t.middleButton},t.root,r.orientation==="vertical"&&t.vertical,r.fullWidth&&t.fullWidth]}})(({ownerState:e,theme:t})=>y({display:"inline-flex",borderRadius:(t.vars||t).shape.borderRadius},e.orientation==="vertical"&&{flexDirection:"column"},e.fullWidth&&{width:"100%"},{[`& .${a.grouped}`]:y({},e.orientation==="horizontal"?{[`&.${a.selected} + .${a.grouped}.${a.selected}`]:{borderLeft:0,marginLeft:0}}:{[`&.${a.selected} + .${a.grouped}.${a.selected}`]:{borderTop:0,marginTop:0}})},e.orientation==="horizontal"?{[`& .${a.firstButton},& .${a.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${a.lastButton},& .${a.middleButton}`]:{marginLeft:-1,borderLeft:"1px solid transparent",borderTopLeftRadius:0,borderBottomLeftRadius:0}}:{[`& .${a.firstButton},& .${a.middleButton}`]:{borderBottomLeftRadius:0,borderBottomRightRadius:0},[`& .${a.lastButton},& .${a.middleButton}`]:{marginTop:-1,borderTop:"1px solid transparent",borderTopLeftRadius:0,borderTopRightRadius:0}},e.orientation==="horizontal"?{[`& .${a.lastButton}.${O.disabled},& .${a.middleButton}.${O.disabled}`]:{borderLeft:"1px solid transparent"}}:{[`& .${a.lastButton}.${O.disabled},& .${a.middleButton}.${O.disabled}`]:{borderTop:"1px solid transparent"}})),ye=g.forwardRef(function(t,r){const o=w({props:t,name:"MuiToggleButtonGroup"}),{children:d,className:n,color:C="standard",disabled:h=!1,exclusive:v=!1,fullWidth:p=!1,onChange:f,orientation:j="horizontal",size:B="medium",value:u}=o,W=S(o,Be),$=y({},o,{disabled:h,fullWidth:p,orientation:j,size:B}),x=$e($),R=g.useCallback((s,c)=>{if(!f)return;const b=u&&u.indexOf(c);let M;u&&b>=0?(M=u.slice(),M.splice(b,1)):M=u?u.concat(c):[c],f(s,M)},[f,u]),k=g.useCallback((s,c)=>{f&&f(s,u===c?null:c)},[f,u]),m=g.useMemo(()=>({className:x.grouped,onChange:v?k:R,value:u,size:B,fullWidth:p,color:C,disabled:h}),[x.grouped,v,k,R,u,B,p,C,h]),T=X(d),z=T.length,l=s=>{const c=s===0,b=s===z-1;return c&&b?"":c?x.firstButton:b?x.lastButton:x.middleButton};return i.jsx(me,y({role:"group",className:I(x.root,n),ref:r,ownerState:$},W,{children:i.jsx(H.Provider,{value:m,children:T.map((s,c)=>i.jsx(J.Provider,{value:l(c),children:s},c))})}))}),Re=()=>{var m,T,z;const e=Y(),t=Z(),[r,o]=g.useState(""),d=ee(),[n,C]=g.useState(""),h=te(),v=oe(),[p,f]=g.useState(v),j=({hex:l})=>{if(!n)return;const s={...p[n]};switch(x){case"both":s.color=l,s.borderColor=l;break;case"color":s.color=l;break;case"bg":s.backgroundColor=l;break;case"borderColor":s.borderColor=l;break}f(c=>({...c,[n]:s})),o(l)},B=l=>{C(l),o("")},u=()=>{f(({[n]:l,...s})=>s)},W=()=>{d(p),C(""),h({to:"/"})},$=()=>{C(""),f(v),R("both"),h({to:"/"})},[x,R]=g.useState("both"),k=(l,s)=>{s!==null&&R(s)};return i.jsxs(re,{open:!0,title:"",onSave:W,onClose:$,children:[i.jsxs(L,{sx:{mt:"20px",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"},children:[i.jsx(se,{color:r,onChange:j}),i.jsx(ae,{color:r,onChange:j}),i.jsxs(ne,{direction:"row",sx:{display:"flex",gap:"10px",alignItems:"center"},children:[n&&i.jsx(_,{source:"preview",vendor:n,color:(m=p[n])==null?void 0:m.color,borderColor:(T=p[n])==null?void 0:T.borderColor,backgroundColor:(z=p[n])==null?void 0:z.backgroundColor}),i.jsx(le,{variant:"contained",size:"small",onClick:u,children:"reset"})]}),i.jsxs(ye,{exclusive:!0,value:x,onChange:k,size:"small",children:[i.jsx(N,{size:"small",value:"both",sx:{textTransform:"none"},children:"text + border"}),i.jsx(N,{size:"small",value:"color",sx:{textTransform:"none"},children:"text"}),i.jsx(N,{size:"small",value:"borderColor",sx:{textTransform:"none"},children:"border"}),i.jsx(N,{size:"small",value:"bg",sx:{textTransform:"none"},children:"fill"})]})]}),t&&i.jsx(L,{sx:{mt:"20px",display:"flex",justifyContent:"center"},children:i.jsx(ie,{color:"primary"})}),!t&&i.jsx(L,{sx:{gap:"10px",display:"flex",justifyContent:"flex-start",flexWrap:"wrap",mt:"40px",maxWidth:"300px",alignSelf:"center"},children:e.map(l=>{var s,c,b;return i.jsx(L,{onClick:()=>B(l),sx:{cursor:"pointer"},children:i.jsx(_,{source:"preview",vendor:l,color:(s=p[l])==null?void 0:s.color,borderColor:(c=p[l])==null?void 0:c.borderColor,backgroundColor:(b=p[l])==null?void 0:b.backgroundColor})},l)})})]})},ze=de("/colors")({component:Re});export{ze as Route};
