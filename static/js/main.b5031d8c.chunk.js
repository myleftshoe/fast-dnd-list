(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),s=n.n(o),i=n(1),l=n(2),c=(n(12),n(3)),u=n.n(c),m=n(6);n(16);function f(e){e.preventDefault()}n(18);var d={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function p(e,t){var n=null,r=null,a=null,o=e.offsetLeft,s=e.offsetTop,l=e.offsetHeight,c=e.offsetWidth,f=window.getComputedStyle(e),p=f.marginTop,g=f.marginBottom,h=f.marginLeft,v=f.marginRight,y=[o+c/2,s+l/2],w={width:c+Math.max(parseInt(h),parseInt(v)),height:l+Math.max(parseInt(p),parseInt(g))};return{get element(){return e},get direction(){return a},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return w},get absoluteCenter(){return[y[0]+this.displacement[0],y[1]+this.displacement[1]]},get margins(){return{top:parseInt(p),bottom:parseInt(g),left:parseInt(h),right:parseInt(v)}},set position(t){r&&(a=t[1]<r[1]?"up":"down"),r=t,n||(n=r);var o=Object(i.a)(this.displacement,2),s=o[0],l=o[1];e.style.transform="translate(".concat(s,"px,").concat(l,"px)")},get position(){return r},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=d.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(t,n){var r=this;return new Promise(function(a){var o=e.getBoundingClientRect(),s=o.left,i=o.top,l=[{transform:"translate(".concat(s-t-r.margins.left,"px,").concat(i-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];e.animate(l,{duration:200,easing:"ease-in-out"}).onfinish=function(){e.style.transition=null,e.style.transform="translate(".concat(0,"px,",0,"px)"),a()}})},settleIntoPlace:function(){var n,r,a=(n=e,r="transitionend",new Promise(function(e,t){n.addEventListener(r,function t(n){n.target.removeEventListener(r,t,!1),e()},!1)}));return requestAnimationFrame(function(){e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=d.settleIntoPlace}),a},release:function(){var t=Object(m.a)(u.a.mark(function t(n,r){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,r);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.position=null,e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}function g(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push({element:r,top:r.offsetTop,height:r.offsetHeight,translateY:0})}return{get:function(e){return t[e]},get count(){return t.length},removeAt:function(e){t.splice(e,1)},resetStyles:function(){t.forEach(function(e){var t=e.element;t.style.transition=null,t.style.transform=null})},print:function(){console.table(t.map(function(e){return{item:e.element.innerText,top:e.top,translateY:e.translateY}}))}}}var h=function(e,t){var n,r,a,o,s,l=e.parentNode,c=Array.from(e.children),u=new g(c);return{grasp:function(o){o!==e&&(n=new p(o,t),r=c.indexOf(n.element),a=r,u.removeAt(r),s=setTimeout(function(){s=void 0,l.style.overflowY="hidden",n.grasp()},300))},move:function(e,r){if(n&&console.log(n.element.innerText),!n||"Item 4"===n.element.innerText){if(n&&"Item 4"===n.element.innerText){var s=u.get(0);s.element.classList.add(t.dragClassName),s.element.classList.add("shadow"),s.element.style.transition="transform .2s ease-in-out",s.element.style.transform="translateY(272px)",(s=u.get(7)).element.classList.add(t.dragClassName),s.element.classList.add("shadow"),s.element.style.transition="transform .2s ease-in-out",s.element.style.transform="translateY(-290px)"}m()||(o=requestAnimationFrame(function t(){var s=function(){var e=l.getBoundingClientRect(),t=n.element.getBoundingClientRect(),r=Math.min(e.bottom,window.innerHeight)-t.bottom,a=t.top-Math.max(e.top,0),o=l.scrollHeight-Math.min(l.clientHeight,window.innerHeight),s=0;r<80?s=Math.min(80,80-r):a<80&&(s=Math.max(-80,a-80));return[Math.max(0,Math.min(o,l.scrollTop+.25*s)),s]}(),m=Object(i.a)(s,2),f=m[0],d=m[1];l.scrollTop=f;n.position=[e,r+f];var p=n,g=p.direction,h=p.dimensions.height,v=Object(i.a)(p.absoluteCenter,2),y=v[1];if("down"===g)for(;a<u.count;a++){var w=u.get(a);if(w.top>y)break;w.top-=h,w.translateY-=h,c(w)}else if("up"===g)for(;a>0;a--){var x=u.get(a-1),b=x.top+x.height;if(b<y)break;x.top+=h,x.translateY+=h,c(x)}a<=0||a>=u.count||0===d?cancelAnimationFrame(o):o=requestAnimationFrame(t)}))}function c(e){var t=e.element,n=e.translateY,r=void 0===n?0:n;t.style.transition="transform .2s ease-in-out",t.style.transform="translateY(".concat(r,"px)")}},release:function(t){if(m())return{};l.style.overflowY="scroll";try{return{oldIndex:r,newIndex:a}}finally{var o=0;"down"===n.direction&&(o=c[a].offsetHeight-n.element.offsetHeight),n.release(0,c[a].offsetTop-l.scrollTop+e.offsetTop+o),u.resetStyles(),n=void 0}}};function m(){return s&&(clearTimeout(s),s=void 0,n=void 0),!n||(cancelAnimationFrame(o),!1)}};function v(e){var t=Object(r.useState)(),n=Object(i.a)(t,2),o=n[0],s=n[1],l=Object(r.useState)(!1),c=Object(i.a)(l,2),u=c[0],m=c[1],d=Object(r.useState)(!0),p=Object(i.a)(d,2),g=p[0],v=p[1],y=Object(r.useRef)();function w(t){m(!0),t.target!==y.current&&(o.grasp(t.target),e.onGrasp&&e.onGrasp())}function x(t){g?o.move(t.touches[0].clientX,t.touches[0].clientY):o.move(t.clientX,t.clientY),e.Drag&&e.onDrag()}function b(){var t=o.release();m(!1),e.onDrop&&e.onDrop(t)}Object(r.useEffect)(function(){s(new h(y.current,e))},[e.children]);var I={};return o&&(I=g?{onTouchStart:w,onTouchMove:x,onTouchEnd:b}:{onMouseDown:w,onMouseMove:u?x:null,onMouseUp:b}),a.a.createElement("div",{style:{overflowY:"scroll"}},a.a.createElement("div",Object.assign({className:"container",ref:y,onPointerDown:function(e){"touch"===e.pointerType?v(!0):v(!1)}},I,{onContextMenu:f}),e.children))}v.defaultProps={raised:!0,dragClassName:"drag-style"};var y=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===t)return e;if(isNaN(Number(t)||isNaN(Number(n))))return e;var r=Object(l.a)(e),a=null!==t?r.splice(t,1)[0]:null;return null!==n&&r.splice(n,0,a),r},w=function(e){return Object(l.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})};s.a.render(a.a.createElement(function(){var e=Object(r.useState)(w(80)),t=Object(i.a)(e,2),n=t[0],o=t[1];return a.a.createElement("div",{className:"list"},a.a.createElement(v,{dragClassName:"drag-style",onDrop:function(e){var t=e.oldIndex,r=e.newIndex;return o(y(n,t,r))}},n.map(function(e){return a.a.createElement("div",{key:e,className:"list-item",style:{height:"Item 5"===e?"70px":"Item 9"===e&&"100px"}},e)})))},null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.b5031d8c.chunk.js.map