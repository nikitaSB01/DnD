!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);var r=function e(t,n,r,o,a,d,c){const l=document.createElement("div");for(n.forEach((n,i)=>{const s=document.createElement("div");s.className="column",s.setAttribute("data-column",i);const u=document.createElement("h3");u.textContent=n.title,s.appendChild(u);const f=document.createElement("div");f.className="card-container",t[n.key].forEach(l=>{const i=document.createElement("div");i.className="card",i.textContent=l.text;const s=document.createElement("span");s.textContent="",s.className="delete-btn",s.onclick=()=>{c(t,l.text,n.key,r,e)},i.appendChild(s),f.appendChild(i),i.draggable=!0,i.ondragstart=e=>o(e,i,n.key),i.ondragover=a,i.ondrop=o=>d(o,n.key,t,r,e,c)}),s.appendChild(f),l.appendChild(s)});r.firstChild;)r.removeChild(r.firstChild);r.appendChild(l)};var o=(e,t,n,r)=>{const o=prompt("Enter card text:");o&&(e[t].push({text:o}),localStorage.setItem("boardData",JSON.stringify(e)),r(e,n))};var a=(e,t,n,r,o)=>{const a={...e};a[n]=a[n].filter(e=>e.text!==t),localStorage.setItem("boardData",JSON.stringify(a)),o(a,r)};const d=JSON.parse(localStorage.getItem("boardData"))||{todo:[],inProgress:[],done:[]},c=document.getElementById("board");r(d,[{title:"To Do",key:"todo"},{title:"In Progress",key:"inProgress"},{title:"Done",key:"done"}],c,(e,t,n)=>{e.dataTransfer.setData("text/plain",JSON.stringify({text:t.textContent,columnKey:n}))},e=>{e.preventDefault()},(e,t,n,r,o,a)=>{e.preventDefault();const{text:d,columnKey:c}=JSON.parse(e.dataTransfer.getData("text/plain"));a(n,d,c,r,o),n[t].push({text:d}),localStorage.setItem("boardData",JSON.stringify(n)),o(n,r)},a),document.getElementById("add-card-todo").addEventListener("click",()=>o(d,"todo",c,r)),document.getElementById("add-card-in-progress").addEventListener("click",()=>o(d,"inProgress",c,r)),document.getElementById("add-card-done").addEventListener("click",()=>o(d,"done",c,r))}]);
//# sourceMappingURL=main.js.map