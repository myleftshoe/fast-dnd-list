(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){},16:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),o=n(6),i=n.n(o),s=n(1),l=n(4),c=(n(12),n(2)),u=n.n(c),f=n(3);n(16);function m(t){t.preventDefault()}n(18);var p={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function d(t,e){var n=null,r=null,a=null,o=t.offsetLeft,i=t.offsetTop,l=t.offsetHeight,c=t.offsetWidth,m=window.getComputedStyle(t),d=m.marginTop,g=m.marginBottom,h=m.marginLeft,v=m.marginRight,w=[o+c/2,i+l/2],y={width:c+Math.max(parseInt(h),parseInt(v)),height:l+Math.max(parseInt(d),parseInt(g))};return{get element(){return t},get direction(){return a},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return y},get absoluteCenter(){return[w[0]+this.displacement[0],w[1]+this.displacement[1]]},get margins(){return{top:parseInt(d),bottom:parseInt(g),left:parseInt(h),right:parseInt(v)}},set position(e){r&&(a=e[1]<r[1]?"up":"down"),r=e,n||(n=r);var o=Object(s.a)(this.displacement,2),i=o[0],l=o[1];t.style.transform="translate(".concat(i,"px,").concat(l,"px)")},get position(){return r},grasp:function(){t.style.willChange="transform",t.style.zIndex=999,t.style.position="relative",t.style.transition=p.grasp,t.classList.add(e.dragClassName),e.raised&&t.classList.add("shadow")},moveIntoPlace:function(e,n){var r=this;return new Promise(function(a){var o=t.getBoundingClientRect(),i=o.left,s=o.top,l=[{transform:"translate(".concat(i-e-r.margins.left,"px,").concat(s-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];t.animate(l,{duration:200,easing:"ease-in-out"}).onfinish=function(){t.style.transition=null,t.style.transform="translate(".concat(0,"px,",0,"px)"),a()}})},settleIntoPlace:function(){var n,r,a=(n=t,r="transitionend",new Promise(function(t,e){n.addEventListener(r,function e(n){n.target.removeEventListener(r,e,!1),t()},!1)}));return requestAnimationFrame(function(){t.classList.remove(e.dragClassName),t.classList.remove("shadow"),t.style.transition=p.settleIntoPlace}),a},release:function(){var e=Object(f.a)(u.a.mark(function e(n,r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.moveIntoPlace(n,r);case 2:return e.next=4,this.settleIntoPlace();case 4:t.style.position=null,t.style.zIndex=null,t.style.transition=null,t.style.transform=null;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}}function g(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];e.push({element:r,top:r.offsetTop,height:r.offsetHeight,translateY:0})}return{get:function(t){return e[t]},get count(){return e.length},removeAt:function(t){e.splice(t,1)},resetStyles:function(){e.forEach(function(t){var e=t.element;e.style.transition=null,e.style.transform=null})},print:function(){console.table(e.map(function(t){return{item:t.element.innerText,top:t.top,translateY:t.translateY}}))}}}var h=function(t,e){var n,r,a,o,i,l=t.parentNode,c=Array.from(t.children),m=new g(c);return{grasp:function(){var o=Object(f.a)(u.a.mark(function o(s){return u.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(s.target!==t&&!n){o.next=2;break}return o.abrupt("return");case 2:n=new d(s.target,e),r=c.indexOf(n.element),a=r,m.removeAt(r),i=setTimeout(function(){i=void 0,l.style.overflowY="hidden",n.grasp()},300);case 7:case"end":return o.stop()}},o,this)}));return function(t){return o.apply(this,arguments)}}(),move:function(t){if(!p()){o=requestAnimationFrame(function t(){var e=function(){var t=l.getBoundingClientRect(),e=n.element.getBoundingClientRect(),r=Math.min(t.bottom,window.innerHeight)-e.bottom,a=e.top-Math.max(t.top,0),o=l.scrollHeight-Math.min(l.clientHeight,window.innerHeight),i=0;r<80?i=Math.min(80,80-r):a<80&&(i=Math.max(-80,a-80));return[Math.max(0,Math.min(o,l.scrollTop+.25*i)),i]}(),u=Object(s.a)(e,2),f=u[0],p=u[1];l.scrollTop=f;n.position=[r,i+f];var d=n,g=d.direction,h=d.dimensions.height,v=Object(s.a)(d.absoluteCenter,2),w=v[1];if("down"===g)for(;a<m.count;a++){var y=m.get(a);if(y.top>w)break;y.top-=h,y.translateY-=h,c(y)}else if("up"===g)for(;a>0;a--){var x=m.get(a-1),b=x.top+x.height;if(b<w)break;x.top+=h,x.translateY+=h,c(x)}a<=0||a>=m.count||0===p?cancelAnimationFrame(o):o=requestAnimationFrame(t)});var e=[t.touches[0].clientX,t.touches[0].clientY],r=e[0],i=e[1]}function c(t){var e=t.element,n=t.translateY,r=void 0===n?0:n;e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(r,"px)")}},release:function(e){if(p())return{};l.style.overflowY="scroll";try{return{oldIndex:r,newIndex:a}}finally{var o=0;"down"===n.direction&&(o=c[a].offsetHeight-n.element.offsetHeight),n.release(0,c[a].offsetTop-l.scrollTop+t.offsetTop+o),m.resetStyles(),n=void 0}}};function p(){return i&&(clearTimeout(i),i=void 0,n=void 0),!n||(cancelAnimationFrame(o),!1)}};function v(t){Object(r.useEffect)(function(){e=new h(n.current,t)});var e,n=Object(r.useRef)();return a.a.createElement("div",{style:{overflowY:"scroll"}},a.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){e.grasp(n),t.onGrasp&&t.onGrasp()},onTouchMove:function(n){e.move(n),t.Drag&&t.onDrag()},onTouchEnd:function(n){var r=e.release(n);t.onDrop&&t.onDrop(r)},onContextMenu:m},t.children))}v.defaultProps={raised:!0,dragClassName:"drag-style"};var w=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===e)return t;if(isNaN(Number(e)||isNaN(Number(n))))return t;var r=Object(l.a)(t),a=null!==e?r.splice(e,1)[0]:null;return null!==n&&r.splice(n,0,a),r},y=function(t){return Object(l.a)(Array(t).keys()).map(function(t){return"Item ".concat(t)})};i.a.render(a.a.createElement(function(){var t=Object(r.useState)(y(80)),e=Object(s.a)(t,2),n=e[0],o=e[1];return a.a.createElement("div",{className:"list"},a.a.createElement(v,{dragClassName:"drag-style",onDrop:function(t){var e=t.oldIndex,r=t.newIndex;return o(w(n,e,r))}},n.map(function(t){return a.a.createElement("div",{key:t,className:"list-item",style:{height:"Item 5"===t?"70px":"Item 9"===t&&"100px"}},t)})))},null),document.getElementById("root"))},7:function(t,e,n){t.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.a7261dc8.chunk.js.map