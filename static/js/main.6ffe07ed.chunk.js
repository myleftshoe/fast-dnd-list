(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(5),s=n.n(a),i=n(1),c=n(2),l=(n(12),n(3)),u=n.n(l),m=n(6);n(16);function f(e){e.preventDefault()}function d(e,t){return new Promise(function(n,o){e.addEventListener(t,function e(o){o.target.removeEventListener(t,e,!1),n()},!1)})}n(18);var p={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function v(e,t){var n=null,o=null,r=null,a=e.offsetLeft,s=e.offsetTop,c=e.offsetHeight,l=e.offsetWidth,f=window.getComputedStyle(e),v=f.marginTop,h=f.marginBottom,g=f.marginLeft,y=f.marginRight,b=[a+l/2,s+c/2],w={width:l+Math.max(parseInt(g),parseInt(y)),height:c+Math.max(parseInt(v),parseInt(h))};return{get element(){return e},get direction(){return r},get displacement(){return[o[0]-n[0],o[1]-n[1]]},get dimensions(){return w},get absoluteCenter(){return[b[0]+this.displacement[0],b[1]+this.displacement[1]]},get margins(){return{top:parseInt(v),bottom:parseInt(h),left:parseInt(g),right:parseInt(y)}},set position(t){o&&(r=t[1]<o[1]?"up":"down"),o=t,n||(n=o);var a=Object(i.a)(this.displacement,2),s=a[0],c=a[1];e.style.transform="translate(".concat(s,"px,").concat(c,"px)")},get position(){return o},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=p.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(t,n){var o=e.getBoundingClientRect(),r=o.left,a=o.top;e.style.transition=null,e.style.transform="".concat(r-t-this.margins.left,"px,").concat(a-n,"px)");var s=d(e,"transitionend");return e.style.transition="translate 0.2s ease-in-out",e.style.transform="translate(".concat(0,"px,",0,"px)"),s},settleIntoPlace:function(){var n=d(e,"transitionend");return requestAnimationFrame(function(){e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=p.settleIntoPlace}),n},release:function(){var t=Object(m.a)(u.a.mark(function t(n,o){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,o);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.position=null,e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}function h(e){for(var t=[],n=0;n<e.length;n++){var o=e[n];t.push({element:o,top:o.offsetTop,height:o.offsetHeight,translateY:0})}return{get:function(e){return t[e]},get count(){return t.length},removeAt:function(e){t.splice(e,1)},resetStyles:function(){t.forEach(function(e){var t=e.element;t.style.transition=null,t.style.transform=null})},print:function(){console.table(t.map(function(e){return{item:e.element.innerText,top:e.top,translateY:e.translateY}}))}}}var g=function(e,t){var n,o,r,a,s,c=e.parentNode,l=Array.from(e.children),u=new h(l),m=c.getBoundingClientRect();return{grasp:function(a){a===e||n||(n=new v(a,t),o=l.indexOf(n.element),r=o,u.removeAt(o),s=setTimeout(function(){s=void 0,c.style.overflowY="hidden",n.grasp()},300))},move:function(e,t){function o(e){var t=e.element,n=e.translateY,o=void 0===n?0:n;t.style.transition="transform .2s ease-in-out",t.style.transform="translateY(".concat(o,"px)")}f()||(a=requestAnimationFrame(function s(){var l=function(){var e=n.element.getBoundingClientRect(),t=Math.min(m.bottom,window.innerHeight)-e.bottom,o=e.top-Math.max(m.top,0),r=c.scrollHeight-Math.min(c.clientHeight,window.innerHeight),a=0;t<80?a=Math.min(80,80-t):o<80&&(a=Math.max(-80,o-80));return[Math.max(0,Math.min(r,c.scrollTop+.25*a)),a]}(),f=Object(i.a)(l,2),d=f[0],p=f[1];c.scrollTop=d;n.position=[e,t+d];var v=n,h=v.direction,g=v.dimensions.height,y=Object(i.a)(v.absoluteCenter,2),b=y[1];if("down"===h)for(;r<u.count;r++){var w=u.get(r);if(w.top>b)break;w.top-=g,w.translateY-=g,o(w)}else if("up"===h)for(;r>0;r--){var x=u.get(r-1),I=x.top+x.height;if(I<b)break;x.top+=g,x.translateY+=g,o(x)}r<=0||r>=u.count||0===p?cancelAnimationFrame(a):a=requestAnimationFrame(s)}))},release:function(t){if(f())return{};c.style.overflowY="scroll";var a=u.get(r)||{top:e.children[r].offsetTop+e.children[r].offsetHeight};try{return{oldIndex:o,newIndex:r}}finally{n.release(0,a.top-n.dimensions.height-c.scrollTop+e.offsetTop),u.resetStyles(),n=void 0}}};function f(){return s&&(clearTimeout(s),s=void 0,n=void 0),!n||(cancelAnimationFrame(a),!1)}};function y(e){var t=Object(o.useState)(),n=Object(i.a)(t,2),a=n[0],s=n[1],c=Object(o.useState)(!1),l=Object(i.a)(c,2),u=l[0],m=l[1],d=Object(o.useState)(!0),p=Object(i.a)(d,2),v=p[0],h=p[1],y=Object(o.useRef)();function b(t){m(!0),t.target.parentNode===y.current&&(a.grasp(t.target),e.onGrasp&&e.onGrasp())}function w(t){v?a.move(t.touches[0].clientX,t.touches[0].clientY):a.move(t.clientX,t.clientY),e.Drag&&e.onDrag()}function x(){var t=a.release();m(!1),e.onDrop&&e.onDrop(t)}Object(o.useEffect)(function(){s(new g(y.current,e))},[e.children]),Object(o.useEffect)(function(){return!v&&u?document.body.addEventListener("mousemove",w):document.body.removeEventListener("mousemove",w),function(){document.body.removeEventListener("mousemove",w)}}),Object(o.useEffect)(function(){return v&&u?document.body.addEventListener("touchmove",w):document.body.removeEventListener("touchmove",w),function(){document.body.removeEventListener("touchmove",w)}});var I={};return a&&(I=v?{onTouchStart:b,onTouchEnd:x}:{onMouseDown:b,onMouseUp:x}),r.a.createElement("div",Object.assign({style:{overflowY:"scroll"},onPointerDown:function(e){"touch"===e.pointerType?h(!0):h(!1)}},I,{onContextMenu:f}),r.a.createElement("div",{className:"container",ref:y},e.children))}y.defaultProps={raised:!0,dragClassName:"drag-style"};var b=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===t)return e;if(isNaN(Number(t)||isNaN(Number(n))))return e;var o=Object(c.a)(e),r=null!==t?o.splice(t,1)[0]:null;return null!==n&&o.splice(n,0,r),o},w=function(e){return Object(c.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})};s.a.render(r.a.createElement(function(){var e=Object(o.useState)(w(18)),t=Object(i.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{className:"list"},r.a.createElement(y,{dragClassName:"drag-style",onDrop:function(e){var t=e.oldIndex,o=e.newIndex;return a(b(n,t,o))}},n.map(function(e){return r.a.createElement("div",{key:e,className:"list-item",style:{height:"Item 2"===e?"70px":"Item 4"===e&&"100px"}},e)})))},null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.6ffe07ed.chunk.js.map