(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(5),i=n.n(a),s=n(1),c=n(2),l=(n(12),n(3)),u=n.n(l),f=n(6);n(16);function m(e){e.preventDefault()}n(18);var d={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function p(e,t){var n=null,o=null,r=null,a=e.offsetLeft,i=e.offsetTop,c=e.offsetHeight,l=e.offsetWidth,m=window.getComputedStyle(e),p=m.marginTop,v=m.marginBottom,g=m.marginLeft,h=m.marginRight,b=[a+l/2,i+c/2],y={width:l+Math.max(parseInt(g),parseInt(h)),height:c+Math.max(parseInt(p),parseInt(v))};return{get element(){return e},get direction(){return r},get displacement(){return[o[0]-n[0],o[1]-n[1]]},get dimensions(){return y},get absoluteCenter(){return[b[0]+this.displacement[0],b[1]+this.displacement[1]]},get margins(){return{top:parseInt(p),bottom:parseInt(v),left:parseInt(g),right:parseInt(h)}},set position(t){o&&(r=t[1]<o[1]?"up":"down"),o=t,n||(n=o);var a=Object(s.a)(this.displacement,2),i=a[0],c=a[1];e.style.transform="translate(".concat(i,"px,").concat(c,"px)")},get position(){return o},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=d.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(t,n){var o=this;return new Promise(function(r){var a=e.getBoundingClientRect(),i=a.left,s=a.top,c=[{transform:"translate(".concat(i-t-o.margins.left,"px,").concat(s-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];e.animate(c,{duration:200,easing:"ease-in-out"}).onfinish=function(){e.style.transition=null,e.style.transform="translate(".concat(0,"px,",0,"px)"),r()}})},settleIntoPlace:function(){var n,o,r=(n=e,o="transitionend",new Promise(function(e,t){n.addEventListener(o,function t(n){n.target.removeEventListener(o,t,!1),e()},!1)}));return requestAnimationFrame(function(){e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=d.settleIntoPlace}),r},release:function(){var t=Object(f.a)(u.a.mark(function t(n,o){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,o);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.position=null,e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}function v(e){var t=e.map(function(e){return new g(e)});return{get:function(e){return t[e]},get count(){return t.length},removeAt:function(e){t.splice(e,1)},resetStyles:function(){t.forEach(function(e){var t=e.element;t.style.transition=null,t.style.transform=null})},print:function(){console.table(t.map(function(e){return{item:e.element.innerText,top:e.top,translateY:e.translateY}}))}}}function g(e){var t=e.offsetTop,n=e.offsetHeight,o=e.translateY;return{element:e,offsetTop:t,height:n,translateY:void 0===o?0:o,get top(){return this.offsetTop+this.translateY}}}var h=function(e,t){var n,o,r,a,i,c=e.parentNode,l=Array.from(e.children),u=new v(l),f=c.getBoundingClientRect();return{grasp:function(a){a===e||n||(n=new p(a,t),o=l.indexOf(n.element),r=o,u.removeAt(o),i=setTimeout(function(){i=void 0,c.style.overflowY="hidden",n.grasp()},300))},move:function(e,t){function o(e){var t=e.element,n=e.translateY,o=void 0===n?0:n;t.style.transition="transform .2s ease-in-out",t.style.transform="translateY(".concat(o,"px)")}m()||(a=requestAnimationFrame(function i(){var l=function(){var e=n.element.getBoundingClientRect(),t=Math.min(f.bottom,window.innerHeight)-e.bottom,o=e.top-Math.max(f.top,0),r=c.scrollHeight-Math.min(c.clientHeight,window.innerHeight),a=0;t<80?a=Math.min(80,80-t):o<80&&(a=Math.max(-80,o-80));return[Math.max(0,Math.min(r,c.scrollTop+.25*a)),a]}(),m=Object(s.a)(l,2),d=m[0],p=m[1];c.scrollTop=d;n.position=[e,t+d];var v=n,g=v.direction,h=v.dimensions.height,b=Object(s.a)(v.absoluteCenter,2),y=b[1];if("down"===g)for(;r<u.count;r++){var w=u.get(r);if(w.top>y)break;w.translateY-=h,o(w)}else if("up"===g)for(;r>0;r--){var x=u.get(r-1),I=x.top+x.height;if(I<y)break;x.translateY+=h,o(x)}r<=0||r>=u.count||0===p?cancelAnimationFrame(a):a=requestAnimationFrame(i)}))},release:function(t){if(m())return{};c.style.overflowY="scroll";var a=u.get(r)||{top:e.children[r].offsetTop+e.children[r].offsetHeight};try{return{oldIndex:o,newIndex:r}}finally{n.release(0,a.top-n.dimensions.height+function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;return e.offsetTop-t-c.scrollTop}()),u.resetStyles(),n=void 0}}};function m(){return i&&(clearTimeout(i),i=void 0,n=void 0),!n||(cancelAnimationFrame(a),!1)}};function b(e){var t=Object(o.useState)(),n=Object(s.a)(t,2),a=n[0],i=n[1],c=Object(o.useState)(!1),l=Object(s.a)(c,2),u=l[0],f=l[1],d=Object(o.useState)(!0),p=Object(s.a)(d,2),v=p[0],g=p[1],b=Object(o.useRef)();function y(t){f(!0),t.target.parentNode===b.current&&(a.grasp(t.target),e.onGrasp&&e.onGrasp())}function w(t){v?a.move(t.touches[0].clientX,t.touches[0].clientY):a.move(t.clientX,t.clientY),e.Drag&&e.onDrag()}function x(){var t=a.release();f(!1),e.onDrop&&e.onDrop(t)}Object(o.useEffect)(function(){i(new h(b.current,e))},[e.children]),Object(o.useEffect)(function(){return!v&&u&&document.body.addEventListener("mousemove",w),function(){document.body.removeEventListener("mousemove",w)}}),Object(o.useEffect)(function(){return v&&u&&document.body.addEventListener("touchmove",w),function(){document.body.removeEventListener("touchmove",w)}});var I={};return a&&(I=v?{onTouchStart:y,onTouchEnd:x}:{onMouseDown:y,onMouseUp:x}),r.a.createElement("div",Object.assign({style:{overflowY:"scroll"},onPointerDown:function(e){"touch"===e.pointerType?g(!0):g(!1)}},I,{onContextMenu:m}),r.a.createElement("div",{className:"container",ref:b},e.children))}b.defaultProps={raised:!0,dragClassName:"drag-style"};var y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===t)return e;if(isNaN(Number(t)||isNaN(Number(n))))return e;var o=Object(c.a)(e),r=null!==t?o.splice(t,1)[0]:null;return null!==n&&o.splice(n,0,r),o},w=function(e){return Object(c.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})};i.a.render(r.a.createElement(function(){var e=Object(o.useState)(w(18)),t=Object(s.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{className:"list"},r.a.createElement(b,{dragClassName:"drag-style",onDrop:function(e){var t=e.oldIndex,o=e.newIndex;return a(y(n,t,o))}},n.map(function(e){return r.a.createElement("div",{key:e,className:"list-item",style:{height:"Item 2"===e?"70px":"Item 4"===e&&"100px"}},e)})))},null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.bdcc157c.chunk.js.map