import{e as i,i as c}from"./use-data-CHqrcJc_.js";import{i as u}from"./index-CtUd9ZlL.js";import{r as m}from"./react-BtIrUdbE.js";const e=()=>{const{data:o=[]}=u();return o.filter(s=>s.min||s.max).reduce((s,t)=>{const r=t.favoriteId.split(":")[0];return{...s,[r]:{min:t.min,max:t.max,read:t.read}}},{})},d=()=>{const o=i(),s=e();return m.useMemo(()=>o.filter(t=>t.sku in s&&!!t.stock).filter(t=>{const r=parseInt(t.stock||"",10),n=s[t.sku].min,a=s[t.sku].max;if(n!==void 0&&r<=n||a!==void 0&&r>=a)return t}),[o,s])},k=(o="all")=>{const s=e(),t=d(),r=c(t,s);return o==="unread"?r.filter(n=>!n.read):r};export{d as a,k as u};
