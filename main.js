!function(){var e={930:function(){document.addEventListener("DOMContentLoaded",(()=>{const e=document.querySelectorAll(".addCardBtn");!function(){const e=JSON.parse(localStorage.getItem("kanbanCards"));if(e){const t=document.querySelectorAll(".column");e.forEach(((e,n)=>{const o=t[n].querySelector(".card-container");e.forEach((e=>{const t=document.createElement("div");t.className="card",t.textContent=e;const n=document.createElement("span");n.innerHTML='<i class="fas fa-times"></i>',n.className="delete-btn",n.onclick=e=>{const t=e.target.closest(".card");t.parentNode.removeChild(t),a()},t.appendChild(n),o.appendChild(t)}))}))}}(),e.forEach((e=>{e.addEventListener("click",(e=>{const t=e.currentTarget.previousElementSibling,n=document.createElement("div");n.className="card";const o=document.createElement("input");o.type="text",o.placeholder="Введите текст...",o.className="cardInput",o.addEventListener("keydown",(e=>{if("Enter"===e.key){const e=o.value.trim();e&&(n.textContent=e,n.appendChild(c),t.appendChild(n),a())}}));const c=document.createElement("span");c.innerHTML='<i class="fas fa-times"></i>',c.className="delete-btn",c.onclick=e=>{const t=e.target.closest(".card");t.parentNode.removeChild(t),a()},n.appendChild(o),t.appendChild(n),o.focus()}))}));let t=null,n=0,o=0,c=null;function r(e,c){t.style.left=e-n+"px",t.style.top=c-o+"px"}function a(){const e=document.querySelectorAll(".column"),t=Array.from(e).map((e=>{const t=e.querySelectorAll(".card");return Array.from(t).map((e=>e.textContent.trim()))}));localStorage.setItem("kanbanCards",JSON.stringify(t))}document.addEventListener("mousedown",(e=>{if(e.preventDefault(),e.target.classList.contains("card")){t=e.target;const a=t.getBoundingClientRect();n=e.clientX-a.left,o=e.clientY-a.top;const l=getComputedStyle(t);c=t.parentNode,t.style.width=l.width,t.style.height=l.height,t.classList.add("dragged"),document.documentElement.style.cursor="grabbing",r(e.pageX,e.pageY)}})),document.addEventListener("mousemove",(e=>{t&&(r(e.pageX,e.pageY),document.querySelectorAll(".card, .addCardBtn").forEach((e=>{e!==t&&e.classList.add("no-pointer")})))})),document.addEventListener("mouseup",(e=>{if(e.preventDefault(),document.querySelectorAll(".card, .addCardBtn").forEach((e=>{e.classList.remove("no-pointer")})),t){const n=document.elementFromPoint(e.clientX,e.clientY).closest(".column"),o=n?n.querySelector(".card-container"):null;if(o){const n=document.elementFromPoint(e.clientX,e.clientY);if(n&&n.classList.contains("card")){const c=n.getBoundingClientRect();e.clientY<c.top+c.height/2?o.insertBefore(t,n):o.insertBefore(t,n.nextSibling)}else o.appendChild(t)}else c.appendChild(t);t.classList.remove("dragged"),document.documentElement.style.cursor="",a(),t=null}}))}))}},t={};function n(o){var c=t[o];if(void 0!==c)return c.exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(930)}()}();
//# sourceMappingURL=main.js.map