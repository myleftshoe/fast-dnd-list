(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),o=n(6),s=n.n(o),i=n(3),u=n(4),c=(n(12),n(0)),l=n.n(c),f=n(2),p=(n(16),function(t){return t.preventDefault()}),m=function(t,e){return new Promise(function(n,r){t.addEventListener(e,function t(r){r.target.removeEventListener(e,t,!1),n()},!1)})},d={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function h(t,e){var n=null,r=null,a=null,o=t.offsetLeft,s=t.offsetTop,u=t.offsetHeight,c=t.offsetWidth,p=window.getComputedStyle(t),h=p.marginTop,v=p.marginBottom,g=p.marginLeft,b=p.marginRight,w=[o+c/2,s+u/2],x={width:c+Math.max(parseInt(g),parseInt(b)),height:u+Math.max(parseInt(h),parseInt(v))};return{get element(){return t},get direction(){return a},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return x},get absoluteCenter(){return[w[0]+this.displacement[0],w[1]+this.displacement[1]]},set position(e){r&&(a=e[1]<r[1]?"up":"down"),r=e,n||(n=r);var o=Object(i.a)(this.displacement,2),s=o[0],u=o[1];t.style.transform="translate(".concat(s,"px,").concat(u,"px)")},get position(){return r},grasp:function(){t.style.willChange="transform",t.style.zIndex=999,t.style.position="relative",t.style.transition=d.grasp,t.classList.add(e.dragClassName),e.raised&&t.classList.add("shadow")},moveIntoPlace:function(){var e=Object(f.a)(l.a.mark(function e(a,o){var s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r!==n){e.next=2;break}return e.abrupt("return",Promise.resolve());case 2:return s=m(t,"transitionend"),requestAnimationFrame(function(){t.style.transition=d.moveIntoPlace,t.style.transform="translate(0px,".concat(o-t.offsetTop,"px)")}),e.next=6,s;case 6:return e.abrupt("return",s);case 7:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),settleIntoPlace:function(){var n=Object(f.a)(l.a.mark(function n(){var r;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=m(t,"transitionend"),requestAnimationFrame(function(){t.classList.remove(e.dragClassName),t.classList.remove("shadow"),t.style.transition=d.settleIntoPlace}),n.next=4,r;case 4:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}}(),release:function(){var e=Object(f.a)(l.a.mark(function e(n,r){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.moveIntoPlace(n,r);case 2:return e.next=4,this.settleIntoPlace();case 4:t.style.position=null,t.style.zIndex=null,t.style.transition=null,t.style.transform=null;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}}function v(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];e.push({element:r,top:r.offsetTop,height:r.offsetHeight,translateY:0})}return{get:function(t){return e[t]},get count(){return e.length},removeAt:function(t){e.splice(t,1)},resetStyles:function(){e.forEach(function(t){var e=t.element;e.style.transition=null,e.style.transform=null})},print:function(){console.table(e.map(function(t){return{item:t.element.innerText,top:t.top,translateY:t.translateY}}))}}}var g=function(t,e){var n,r,a,o,s,u=Array.from(t.children),c=new v(u);return{grasp:function(){var o=Object(f.a)(l.a.mark(function o(i){return l.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:if(i.target!==t&&!n){o.next=2;break}return o.abrupt("return");case 2:n=new h(i.target,e),r=u.indexOf(n.element),a=r,c.removeAt(r),s=setTimeout(function(){s=void 0,t.addEventListener("touchmove",p),n.grasp()},300);case 7:case"end":return o.stop()}},o,this)}));return function(t){return o.apply(this,arguments)}}(),move:function(e){if(!m()){o=requestAnimationFrame(function e(){var r=function(){var e=t.getBoundingClientRect(),r=n.element.getBoundingClientRect(),a=Math.min(e.bottom,window.innerHeight)-r.bottom,o=r.top-Math.max(e.top,0),s=t.scrollHeight-Math.min(t.clientHeight,window.innerHeight),i=0;a<80?i=Math.min(80,80-a):o<80&&(i=Math.max(-80,o-80));return[Math.max(0,Math.min(s,t.scrollTop+.25*i)),i]}(),f=Object(i.a)(r,2),p=f[0],m=f[1];t.scrollTop=p;n.position=[s,u+p];var d=n,h=d.direction,v=d.dimensions.height,g=Object(i.a)(d.absoluteCenter,2),b=g[1];if("down"===h)for(;a<c.count;a++){var w=c.get(a);if(w.top>b)break;w.top-=v,w.translateY-=v,l(w)}else if("up"===h)for(;a>0;a--){var x=c.get(a-1),y=x.top+x.height;if(y<b)break;x.top+=v,x.translateY+=v,l(x)}a<=0||a>=c.count||0===m?cancelAnimationFrame(o):o=requestAnimationFrame(e)});var r=[e.touches[0].clientX,e.touches[0].clientY],s=r[0],u=r[1]}function l(t){var e=t.element,n=t.translateY,r=void 0===n?0:n;e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(r,"px)")}},release:function(){var e=Object(f.a)(l.a.mark(function e(o){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!m()){e.next=2;break}return e.abrupt("return",{});case 2:return t.removeEventListener("touchmove",p),e.next=5,n.release(0,t.children[a].offsetTop);case 5:return c.resetStyles(),n=void 0,e.abrupt("return",{oldIndex:r,newIndex:a});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()};function m(){return s&&(clearTimeout(s),s=void 0,n=void 0),!n||(cancelAnimationFrame(o),!1)}};function b(t){Object(r.useEffect)(function(){e=new g(n.current,t)});var e,n=Object(r.useRef)();function o(){return(o=Object(f.a)(l.a.mark(function n(r){var a;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.release(r);case 2:a=n.sent,t.onDrop&&t.onDrop(a);case 4:case"end":return n.stop()}},n,this)}))).apply(this,arguments)}return a.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){e.grasp(n),t.onGrasp&&t.onGrasp()},onTouchMove:function(n){e.move(n),t.Drag&&t.onDrag()},onTouchEnd:function(t){return o.apply(this,arguments)},onContextMenu:p},t.children)}b.defaultProps={raised:!0,dragClassName:"drag-style"};var w=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===e)return t;if(isNaN(Number(e)||isNaN(Number(n))))return t;var r=Object(u.a)(t),a=null!==e?r.splice(e,1)[0]:null;return null!==n&&r.splice(n,0,a),r},x=function(t){return Object(u.a)(Array(t).keys()).map(function(t){return"Item ".concat(t)})};s.a.render(a.a.createElement(function(){var t=Object(r.useState)(x(80)),e=Object(i.a)(t,2),n=e[0],o=e[1];return a.a.createElement("div",{className:"list"},a.a.createElement(b,{dragClassName:"drag-style",onDrop:function(t){var e=t.oldIndex,r=t.newIndex;return o(w(n,e,r))}},n.map(function(t){return a.a.createElement("div",{key:t,className:"list-item"},t)})))},null),document.getElementById("root"))},7:function(t,e,n){t.exports=n(18)}},[[7,2,1]]]);
//# sourceMappingURL=main.55c0fc82.chunk.js.map