import{r as l,n as E,j as e,q as F}from"./tanstack-AplOXKy-.js";import{b as I,c as L,M,H as P,C as A}from"./index-71yzFCyr.js";import{u as G,a as H,V as S}from"./vendor-chip-Bj3KYxvA.js";import{B as a,g as W,f as _,J as q,K as c,h as D}from"./mui-DsPg5CaI.js";import"./html2canvas-BfYXEYrK.js";import"./react-18Fyy8LS.js";const J=()=>{var h,j,k;const y=I(),u=L(),[C,p]=l.useState(""),[s,i]=l.useState(null),m=E(),{mutate:z}=G(),d=H(),[t,x]=l.useState(d);l.useEffect(()=>{x(d)},[d]);const g=({hex:o})=>{if(!s)return;const r={...t[s]};switch(b){case"both":r.color=o,r.borderColor=o;break;case"color":r.color=o;break;case"bg":r.backgroundColor=o;break;case"borderColor":r.borderColor=o;break}x(n=>({...n,[s]:r})),p(o)},T=o=>{i(o),p("")},B=()=>{s&&x(({[s]:o,...r})=>r)},V=()=>{z(t),i(null),m({to:"/"})},w=()=>{i(""),f("both"),m({to:"/"})},[b,f]=l.useState("both"),R=(o,r)=>{r!==null&&f(r)};return e.jsxs(M,{open:!0,title:"",onSave:V,onClose:w,children:[e.jsxs(a,{sx:{mt:"20px",display:"flex",flexDirection:"column",alignItems:"center",gap:"20px"},children:[e.jsx(P,{color:C,onChange:g}),e.jsx(A,{color:C,onChange:g}),e.jsxs(W,{direction:"row",sx:{display:"flex",gap:"10px",alignItems:"center"},children:[s&&e.jsx(S,{source:"preview",vendor:s,color:(h=t[s])==null?void 0:h.color,borderColor:(j=t[s])==null?void 0:j.borderColor,backgroundColor:(k=t[s])==null?void 0:k.backgroundColor}),e.jsx(_,{variant:"contained",size:"small",onClick:B,children:"reset"})]}),e.jsxs(q,{exclusive:!0,value:b,onChange:R,size:"small",children:[e.jsx(c,{size:"small",value:"both",sx:{textTransform:"none"},children:"text + border"}),e.jsx(c,{size:"small",value:"color",sx:{textTransform:"none"},children:"text"}),e.jsx(c,{size:"small",value:"borderColor",sx:{textTransform:"none"},children:"border"}),e.jsx(c,{size:"small",value:"bg",sx:{textTransform:"none"},children:"fill"})]})]}),u&&e.jsx(a,{sx:{mt:"20px",display:"flex",justifyContent:"center"},children:e.jsx(D,{color:"primary"})}),!u&&e.jsx(a,{sx:{gap:"10px",display:"flex",justifyContent:"flex-start",flexWrap:"wrap",mt:"40px",maxWidth:"300px",alignSelf:"center"},children:y.map(o=>{var r,n,v;return e.jsx(a,{onClick:()=>T(o),sx:{cursor:"pointer"},children:e.jsx(S,{source:"preview",vendor:o,color:(r=t[o])==null?void 0:r.color,borderColor:(n=t[o])==null?void 0:n.borderColor,backgroundColor:(v=t[o])==null?void 0:v.backgroundColor})},o)})})]})},Y=F("/colors")({component:J});export{Y as Route};
