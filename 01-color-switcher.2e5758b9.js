!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]");function o(){window.document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}n.disabled=!0,e.style.cursor="pointer",n.style.cursor="pointer",e.addEventListener("click",(function(){t=setInterval(o,1e3),e.disabled=!0,n.disabled=!1})),n.addEventListener("click",(function(){clearInterval(t),e.disabled=!1,n.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.2e5758b9.js.map