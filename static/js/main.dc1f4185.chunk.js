(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(5),i=n.n(a),s=n(1),c=n(2),l=(n(12),n(3)),u=n.n(l),f=n(6);n(16);function m(e){e.preventDefault()}n(18);var d={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function p(e,t){var n=null,r=null,o=null,a=e.offsetLeft,i=e.offsetTop,c=e.offsetHeight,l=e.offsetWidth,m=window.getComputedStyle(e),p=m.marginTop,h=m.marginBottom,v=m.marginLeft,g=m.marginRight,y={top:parseInt(p),bottom:parseInt(h),left:parseInt(v),right:parseInt(g)},b=[a+l/2,i+c/2],x={width:l+Math.max(y.left,y.right),height:c+Math.max(y.top,y.bottom)};return{get element(){return e},get direction(){return o},get displacement(){return r&&n?[r[0]-n[0],r[1]-n[1]]:null},get dimensions(){return x},get center(){var t,n,r;return t=this.absoluteCenter[1],n=0,r=e.parentNode.clientHeight,Math.max(Math.min(t,r),n)-e.parentNode.scrollTop},get absoluteCenter(){return this.displacement?[b[0]+this.displacement[0],b[1]+this.displacement[1]]:[b[0],b[1]]},get margins(){return y},set position(t){r&&(o=t[1]<r[1]?"up":"down"),r=t,n||(n=r);var a=Object(s.a)(this.displacement,2),i=a[0],c=a[1];e.style.transform="translate3d(".concat(i,"px,").concat(c,"px,0px)")},get position(){return r},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=d.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(t,n){var r=this;return new Promise(function(o){var a=e.getBoundingClientRect(),i=a.left,s=a.top,c=[{transform:"translate(".concat(i-t-r.margins.left,"px,").concat(s-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];e.animate(c,{duration:200,easing:"ease-in-out"}).onfinish=function(){e.style.transition=null,e.style.transform="translate(".concat(0,"px,",0,"px)"),o()}})},settleIntoPlace:function(){var n,r,o=(n=e,r="transitionend",new Promise(function(e,t){n.addEventListener(r,function t(n){n.target.removeEventListener(r,t,!1),e()},!1)}));return requestAnimationFrame(function(){e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=d.settleIntoPlace}),o},release:function(){var t=Object(f.a)(u.a.mark(function t(n,r){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,r);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 7:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}function h(e){var t=e.map(function(e){return new v(e)});return{get:function(e){return t[e]},find:function(e){return t.find(function(t){return t.element===e})},indexOf:function(e){return t.findIndex(function(t){return t.element===e})},get count(){return t.length},removeAt:function(e){t.splice(e,1)},resetStyles:function(){t.forEach(function(e){var t=e.element;t.style.transition=null,t.style.transform=null})},print:function(){console.table(t.map(function(e){return{item:e.element.innerText,top:e.top,translateY:e.translateY}}))}}}function v(e){var t=e.offsetTop,n=e.offsetHeight,r=e.translateY;return{element:e,offsetTop:t,height:n,translateY:void 0===r?0:r,get top(){return this.offsetTop+this.translateY}}}var g=function(e,t,n){return Math.max(Math.min(e,n),t)},y=function(e,t){var n,r,o,a,i,c=e.parentNode,l=new h(Array.from(e.children)),u=c.scrollHeight,f=c.clientHeight,m=c.scrollTop,d=null;return{grasp:function(a){a===e||n||(n=new p(a,t),r=l.indexOf(n.element),o=r,i=setTimeout(function(){i=void 0,c.style.overflowY="hidden",n.grasp()},300))},move:function(e,t){function r(e){var t=e.element,n=e.translateY,r=void 0===n?0:n;t.style.transition="transform .2s ease-in-out",t.style.transform="translateY(".concat(r,"px)")}v()||(a=requestAnimationFrame(function i(){var p=n,h=p.direction,v=p.dimensions.height,y=Object(s.a)(p.absoluteCenter,2),b=y[1];!function(){var e=f-80+m,t=80+m,r=n.absoluteCenter[1],o=0;r>e?o=r-e:r<t&&m>0&&(o=r-t);m+=.25*o,c.scrollTop=m}();n.position=[e,g(t+m,0,u-n.dimensions.height)];if(Math.trunc(b)===Math.trunc(d))return;d=b;if("down"===h)for(;o<l.count-1;o++){var x=l.get(o);if(x.element!==n.element){if(x.top>b)break;x.translateY-=v,r(x)}}else if("up"===h)for(;o>0;o--){var w=l.get(o-1);if(w.element!==n.element){var O=w.top+w.height;if(O<b)break;w.translateY+=v,r(w)}}a=requestAnimationFrame(i)}))},release:function(t){if(v())return null;c.style.overflowY="scroll";var a=l.get(o).top+function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;return e.offsetTop-t-c.scrollTop}();o!==r&&(a-=n.dimensions.height);try{return o===r?null:{indexes:[r],toIndex:o}}finally{n.release(0,a),l.resetStyles(),n=void 0}}};function v(){return i&&(clearTimeout(i),i=void 0,n=void 0),!n||(cancelAnimationFrame(a),!1)}};function b(e){var t=Object(r.useState)(),n=Object(s.a)(t,2),a=n[0],i=n[1],c=Object(r.useState)(!1),l=Object(s.a)(c,2),u=l[0],f=l[1],d=Object(r.useState)(!0),p=Object(s.a)(d,2),h=p[0],v=p[1],g=Object(r.useRef)();function b(t){f(!0),t.target.parentNode===g.current&&(a.grasp(t.target),e.onGrasp&&e.onGrasp())}function x(t){h?a.move(t.touches[0].clientX,t.touches[0].clientY):a.move(t.clientX,t.clientY),e.Drag&&e.onDrag()}function w(){var t=a.release();f(!1),t&&e.onDrop&&e.onDrop(t)}Object(r.useEffect)(function(){i(new y(g.current,e))},[e.children]),Object(r.useEffect)(function(){return!h&&u&&document.body.addEventListener("mousemove",x),function(){document.body.removeEventListener("mousemove",x)}}),Object(r.useEffect)(function(){return h&&u&&document.body.addEventListener("touchmove",x),function(){document.body.removeEventListener("touchmove",x)}});var O={};return a&&(O=h?{onTouchStart:b,onTouchEnd:w}:{onMouseDown:b,onMouseUp:w}),o.a.createElement("div",Object.assign({style:{overflowY:"scroll"},onPointerDown:function(e){"touch"===e.pointerType?v(!0):v(!1)}},O,{onContextMenu:m}),o.a.createElement("div",{className:"container",ref:g},e.children,o.a.cloneElement(e.children[0],{style:{visibility:"hidden"}},null)))}b.defaultProps={raised:!0,dragClassName:"drag-style"};var x=function(e){return Object(c.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})};i.a.render(o.a.createElement(function(){var e=Object(r.useState)(x(18)),t=Object(s.a)(e,2),n=t[0],a=t[1];return o.a.createElement("div",{className:"list"},o.a.createElement(b,{dragClassName:"drag-style",onDrop:function(e){var t=e.indexes,r=e.toIndex;return a(function(e,t,n){var r=e[n],o=e.filter(function(e,n){return t.includes(n)}),a=e.filter(function(e,n){return!t.includes(n)}),i=a.indexOf(r);return i>-1?a.splice.apply(a,[i,0].concat(Object(c.a)(o))):a.push.apply(a,Object(c.a)(o)),a}(n,t,r))}},n.map(function(e){return o.a.createElement("div",{key:e,className:"list-item",style:{height:"Item 2"===e?"70px":"Item 4"===e&&"100px"}},e)})))},null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.dc1f4185.chunk.js.map