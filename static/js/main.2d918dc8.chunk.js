(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){},16:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(5),i=n.n(a),s=n(1),l=n(2),c=(n(12),n(3)),u=n.n(c),m=n(6);n(16);function f(t){t.preventDefault()}n(18);var d={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function p(t,e){var n=null,r=null,o=null,a=t.offsetLeft,i=t.offsetTop,l=t.offsetHeight,c=t.offsetWidth,f=window.getComputedStyle(t),p=f.marginTop,v=f.marginBottom,h=f.marginLeft,g=f.marginRight,b=[a+c/2,i+l/2],w={width:c+Math.max(parseInt(h),parseInt(g)),height:l+Math.max(parseInt(p),parseInt(v))};return{get element(){return t},get direction(){return o},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return w},get absoluteCenter(){return[b[0]+this.displacement[0],b[1]+this.displacement[1]]},get margins(){return{top:parseInt(p),bottom:parseInt(v),left:parseInt(h),right:parseInt(g)}},set position(e){r&&(o=e[1]<r[1]?"up":"down"),r=e,n||(n=r);var a=Object(s.a)(this.displacement,2),i=a[0],l=a[1];t.style.transform="translate(".concat(i,"px,").concat(l,"px)")},get position(){return r},grasp:function(){t.style.willChange="transform",t.style.zIndex=999,t.style.position="relative",t.style.transition=d.grasp,t.classList.add(e.dragClassName),e.raised&&t.classList.add("shadow")},moveIntoPlace:function(e,n){var r=this;return new Promise(function(o){var a=t.getBoundingClientRect(),i=a.left,s=a.top,l=[{transform:"translate(".concat(i-e-r.margins.left,"px,").concat(s-n,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];t.animate(l,{duration:200,easing:"ease-in-out"}).onfinish=function(){t.style.transition=null,t.style.transform="translate(".concat(0,"px,",0,"px)"),o()}})},settleIntoPlace:function(){var n,r,o=(n=t,r="transitionend",new Promise(function(t,e){n.addEventListener(r,function e(n){n.target.removeEventListener(r,e,!1),t()},!1)}));return requestAnimationFrame(function(){t.classList.remove(e.dragClassName),t.classList.remove("shadow"),t.style.transition=d.settleIntoPlace}),o},release:function(){var e=Object(m.a)(u.a.mark(function e(n,r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.moveIntoPlace(n,r);case 2:return e.next=4,this.settleIntoPlace();case 4:t.style.position=null,t.style.zIndex=null,t.style.transition=null,t.style.transform=null;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}}function v(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];e.push({element:r,top:r.offsetTop,height:r.offsetHeight,translateY:0})}return{get:function(t){return e[t]},get count(){return e.length},removeAt:function(t){e.splice(t,1)},resetStyles:function(){e.forEach(function(t){var e=t.element;e.style.transition=null,e.style.transform=null})},print:function(){console.table(e.map(function(t){return{item:t.element.innerText,top:t.top,translateY:t.translateY}}))}}}var h=function(t,e){var n,r,o,a,i,l=t.parentNode,c=Array.from(t.children),u=new v(c);return{grasp:function(a){if(a.target!==t){var s=[a.touches[0].clientX,a.touches[0].clientY],m=s[0],f=s[1];n&&n.element!==a.target?this.drop():(n=new p(a.target,e),r=c.indexOf(n.element),o=r,u.removeAt(r),i=setTimeout(function(){i=void 0,l.classList.remove("scrollable"),l.classList.add("scrollable-disable-scroll"),console.log(l.classList),console.log(window.getComputedStyle(l).overflow),setTimeout(function(){return function(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;try{(e=document.createEvent("TouchEvent")).initTouchEvent("touchmove",!0,!0)}catch(o){try{(e=document.createEvent("UIEvent")).initUIEvent("touchmove",!0,!0)}catch(a){(e=document.createEvent("Event")).initEvent("touchmove",!0,!0)}}e.touches=[{clientX:n,clientY:r}],t.dispatchEvent(e)}(n.element,m,f)},3e3),requestAnimationFrame(function(){return n.grasp()})},300))}},move:function(t){if(!m()){var e=[t.touches[0].clientX,t.touches[0].clientY],r=e[0],i=e[1];a=requestAnimationFrame(function t(){var e=function(){var t=l.getBoundingClientRect(),e=n.element.getBoundingClientRect(),r=Math.min(t.bottom,window.innerHeight)-e.bottom,o=e.top-Math.max(t.top,0),a=l.scrollHeight-Math.min(l.clientHeight,window.innerHeight),i=0;r<80?i=Math.min(80,80-r):o<80&&(i=Math.max(-80,o-80));return[Math.max(0,Math.min(a,l.scrollTop+.25*i)),i]}(),m=Object(s.a)(e,2),f=m[0],d=m[1];l.scrollTop=f;n.position=[r,i+f];var p=n,v=p.direction,h=p.dimensions.height,g=Object(s.a)(p.absoluteCenter,2),b=g[1];if("down"===v)for(;o<u.count;o++){var w=u.get(o);if(w.top>b)break;w.top-=h,w.translateY-=h,c(w)}else if("up"===v)for(;o>0;o--){var y=u.get(o-1),x=y.top+y.height;if(x<b)break;y.top+=h,y.translateY+=h,c(y)}o<=0||o>=u.count||0===d?cancelAnimationFrame(a):a=requestAnimationFrame(t)})}function c(t){var e=t.element,n=t.translateY,r=void 0===n?0:n;e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(r,"px)")}},release:function(e){if(m())return{};l.classList.add("scrollable"),l.classList.remove("scrollable-disable-scroll");try{return{oldIndex:r,newIndex:o}}finally{var a=0;"down"===n.direction&&(a=c[o].offsetHeight-n.element.offsetHeight),n.release(0,c[o].offsetTop-l.scrollTop+t.offsetTop+a),u.resetStyles(),n=void 0}}};function m(){return i&&(clearTimeout(i),i=void 0,n=void 0),!n||(cancelAnimationFrame(a),!1)}};function g(t){Object(r.useEffect)(function(){e=new h(n.current,t)});var e,n=Object(r.useRef)();return o.a.createElement("div",{className:"scrollable"},o.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){e.grasp(n),t.onGrasp&&t.onGrasp()},onTouchMove:function(n){e.move(n),t.Drag&&t.onDrag()},onTouchEnd:function(n){var r=e.release(n);t.onDrop&&t.onDrop(r)},onContextMenu:f},t.children))}g.defaultProps={raised:!0,dragClassName:"drag-style"};var b=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===e)return t;if(isNaN(Number(e)||isNaN(Number(n))))return t;var r=Object(l.a)(t),o=null!==e?r.splice(e,1)[0]:null;return null!==n&&r.splice(n,0,o),r},w=function(t){return Object(l.a)(Array(t).keys()).map(function(t){return"Item ".concat(t)})};i.a.render(o.a.createElement(function(){var t=Object(r.useState)(w(80)),e=Object(s.a)(t,2),n=e[0],a=e[1];return o.a.createElement("div",{className:"list"},o.a.createElement(g,{dragClassName:"drag-style",onDrop:function(t){var e=t.oldIndex,r=t.newIndex;return a(b(n,e,r))}},n.map(function(t){return o.a.createElement("div",{key:t,className:"list-item",style:{height:"Item 5"===t?"70px":"Item 9"===t&&"100px"}},t)})))},null),document.getElementById("root"))},7:function(t,e,n){t.exports=n(19)}},[[7,2,1]]]);
//# sourceMappingURL=main.2d918dc8.chunk.js.map