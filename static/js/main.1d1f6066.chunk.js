(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(6),s=n.n(a),i=n(1),c=n(3),l=(n(12),n(2)),u=n.n(l),f=n(4);n(16);function d(e){e.preventDefault()}n(18);var m={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function p(e,t){var n=null,o=null,r=null,a=e.offsetLeft,s=e.offsetTop,c=e.offsetHeight,l=e.offsetWidth,d=window.getComputedStyle(e),p=d.marginTop,g=d.marginBottom,v=d.marginLeft,h=d.marginRight,b=[a+l/2,s+c/2],y={width:l+Math.max(parseInt(v),parseInt(h)),height:c+Math.max(parseInt(p),parseInt(g))};return{get element(){return e},get direction(){return r},get displacement(){return[o[0]-n[0],o[1]-n[1]]},get dimensions(){return y},get absoluteCenter(){return[b[0]+this.displacement[0],b[1]+this.displacement[1]]},get margins(){return{top:parseInt(p),bottom:parseInt(g),left:parseInt(v),right:parseInt(h)}},set position(t){o&&(console.log(o[1],t[1]),r=t[1]<o[1]?"up":"down"),o=t,n||(n=o);var a=Object(i.a)(this.displacement,2),s=a[0],c=a[1];e.style.transform="translate(".concat(s,"px,").concat(c,"px)")},get position(){return o},get hasMoved(){return n!==o},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=m.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(t,n){var o=this;return new Promise(function(r){var a=e.getBoundingClientRect(),s=a.left,i=a.top,c=[{transform:"translate(".concat(s-t-o.margins.left,"px,").concat(i-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];e.animate(c,{duration:200,easing:"ease-in-out"}).onfinish=function(){e.style.transition=null,e.style.transform="translate(".concat(0,"px,",0,"px)"),r()}})},settleIntoPlace:function(){var n,o,r=(n=e,o="transitionend",new Promise(function(e,t){n.addEventListener(o,function t(n){n.target.removeEventListener(o,t,!1),e()},!1)}));return requestAnimationFrame(function(){e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=m.settleIntoPlace}),r},release:function(){var t=Object(f.a)(u.a.mark(function t(n,o){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,o);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.position=null,e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}var g={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function v(e,t){var n=e.map(function(e){return new o(e)});return{get:function(e){return n[e]},find:function(e){return n.find(function(t){return t.element===e})},get count(){return n.length},removeAt:function(e){n.splice(e,1)},resetStyles:function(){n.forEach(function(e){var t=e.element;t.style.transition=null,t.style.transform=null})},getSelected:function(){return n.filter(function(e){return e.selected})},getSelectedIndexes:function(){var t=[];return n.forEach(function(n){var o=n.element,r=n.selected,a=e.indexOf(o);r&&a>-1&&t.push(a)}),t},print:function(){console.table(n.map(function(e){return{item:e.element.innerText,top:e.top,translateY:e.translateY}}))}};function o(e){var n=e.offsetTop,o=e.offsetHeight,r=e.translateY;return{element:e,offsetTop:n,height:o,translateY:void 0===r?0:r,selected:null,get top(){return this.offsetTop+this.translateY},select:function(){this.selected=!0,e.style.transition=g.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},deselect:function(){this.selected=!1,e.style.transition=g.settleIntoPlace,e.classList.remove(t.dragClassName),e.classList.remove("shadow")},toggle:function(){this.selected?this.deselect():this.select()}}}}var h=function(e,t){var n,o,r,a,s,c=e.parentNode,l=Array.from(e.children),d=new v(l,t),m=c.getBoundingClientRect(),g=function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;return e.offsetTop-t-c.scrollTop};return{grasp:function(t){if(t!==e)return d.getSelected().length?(clearTimeout(s),d.find(t).toggle(),void(n=void 0)):void(s=setTimeout(function(){s=void 0,d.find(t).toggle(),n=void 0},300))},move:function(e,u,f){if(!s){n||(n=new p(e,t),o=l.indexOf(n.element),r=o,d.removeAt(o),c.style.overflowY="hidden",n.grasp()),a=requestAnimationFrame(function e(){var t=function(){var e=n.element.getBoundingClientRect(),t=Math.min(m.bottom,window.innerHeight)-e.bottom,o=e.top-Math.max(m.top,0),r=c.scrollHeight-Math.min(c.clientHeight,window.innerHeight),a=0;t<80?a=Math.min(80,80-t):o<80&&(a=Math.max(-80,o-80));return[Math.max(0,Math.min(r,Math.round(c.scrollTop+.25*a))),a]}(),o=Object(i.a)(t,2),s=o[0],l=o[1];var p=f+s;if(p===g)return;c.scrollTop=s;n.position=[u,p];g=p;var h=n,b=h.direction,y=h.dimensions.height,w=Object(i.a)(h.absoluteCenter,2),x=w[1];if("down"===b)for(;r<d.count;r++){var I=d.get(r);if(I.top>x)break;console.log(b,I.element.innerText),I.translateY-=y,v(I)}else if("up"===b)for(;r>0;r--){var E=d.get(r-1),O=E.top+E.height;if(O<x)break;console.log(b,E.element.innerText),E.translateY+=y,v(E)}r<=0||r>=d.count||0===l?cancelAnimationFrame(a):a=requestAnimationFrame(e)});var g=null}function v(e){var t=e.element,n=e.translateY,o=void 0===n?0:n;t.style.transition="transform .2s ease-in-out",t.style.transform="translateY(".concat(o,"px)")}},release:function(){if(function(){s&&(clearTimeout(s),s=void 0,n=void 0);return!n||(cancelAnimationFrame(a),!1)}())return null;c.style.overflowY="scroll";var t=d.get(r)||{top:e.children[r].offsetTop+e.children[r].offsetHeight},i=d.getSelectedIndexes();i.unshift(o),console.log("moving ".concat(i," to ").concat(r));try{return{indexes:i,toIndex:r}}finally{(function(){var e=Object(f.a)(u.a.mark(function e(){var o;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.release(0,t.top-n.dimensions.height+g()),d.resetStyles(),o=new Promise(function(e,t){d.getSelected().forEach(function(e){return e.select()}),setTimeout(function(){return d.getSelected().forEach(function(e){return e.deselect()})},1e3),e()}),e.next=5,o;case 5:n=void 0;case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}})()()}}}};function b(e){var t=Object(o.useState)(),n=Object(i.a)(t,2),a=n[0],s=n[1],c=Object(o.useState)(!1),l=Object(i.a)(c,2),u=l[0],f=l[1],m=Object(o.useState)(!0),p=Object(i.a)(m,2),g=p[0],v=p[1],b=Object(o.useRef)();function y(t){f(!0),t.target.parentNode===b.current&&(a.grasp(t.target),e.onGrasp&&e.onGrasp())}function w(t){g?a.move(t.target,t.touches[0].clientX,t.touches[0].clientY):a.move(t.target,t.clientX,t.clientY),e.Drag&&e.onDrag()}function x(t){var n=a.release();f(!1),n&&e.onDrop&&e.onDrop(n)}Object(o.useEffect)(function(){console.log("new Handler!!"),s(new h(b.current,e))},[e.children]),Object(o.useEffect)(function(){return!g&&u?document.body.addEventListener("mousemove",w):document.body.removeEventListener("mousemove",w),function(){document.body.removeEventListener("mousemove",w)}}),Object(o.useEffect)(function(){return g&&u?document.body.addEventListener("touchmove",w):document.body.removeEventListener("touchmove",w),function(){document.body.removeEventListener("touchmove",w)}});var I={};return a&&(I=g?{onTouchStart:y,onTouchEnd:x}:{onMouseDown:y,onMouseUp:x}),r.a.createElement("div",Object.assign({style:{overflowY:"scroll"},onPointerDown:function(e){"touch"===e.pointerType?v(!0):v(!1)}},I,{onContextMenu:d}),r.a.createElement("div",{className:"container",ref:b},e.children))}b.defaultProps={raised:!0,dragClassName:"drag-style"};var y=function(e){return Object(c.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})};s.a.render(r.a.createElement(function(){var e=Object(o.useState)(y(18)),t=Object(i.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{className:"list"},r.a.createElement(b,{dragClassName:"drag-style",onDrop:function(e){var t=e.indexes,o=e.toIndex;return a(function(e,t,n){var o=e[n],r=e.filter(function(e,n){return t.includes(n)}),a=e.filter(function(e,n){return!t.includes(n)});console.table(r),console.table(a);var s=a.indexOf(o);return a.splice.apply(a,[s,0].concat(Object(c.a)(r))),console.table(a),a}(n,t,o))}},n.map(function(e){return r.a.createElement("div",{key:e,className:"list-item",style:{height:"Item 2"===e?"70px":"Item 4"===e&&"100px"}},e)})))},null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.1d1f6066.chunk.js.map