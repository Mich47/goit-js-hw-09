const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let d;function o(){window.document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}e.disabled=!0,t.style.cursor="pointer",e.style.cursor="pointer",t.addEventListener("click",(()=>{d=setInterval(o,1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(()=>{clearInterval(d),t.disabled=!1,e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.a8d0fc6d.js.map
