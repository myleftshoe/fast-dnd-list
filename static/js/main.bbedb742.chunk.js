(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(t,e,n){},17:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),a=n(6),i=n.n(a),s=n(1),l=n(4),c=(n(13),n(2)),u=n.n(c),f=n(3);n(17);function m(t){t.preventDefault()}n(19);var p={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function d(t,e){var n=null,r=null,o=null,a=t.offsetLeft,i=t.offsetTop,l=t.offsetHeight,c=t.offsetWidth,m=window.getComputedStyle(t),d=m.marginTop,g=m.marginBottom,h=m.marginLeft,v=m.marginRight,w=[a+c/2,i+l/2],y={width:c+Math.max(parseInt(h),parseInt(v)),height:l+Math.max(parseInt(d),parseInt(g))};return{get element(){return t},get direction(){return o},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return y},get absoluteCenter(){return[w[0]+this.displacement[0],w[1]+this.displacement[1]]},get margins(){return{top:parseInt(d),bottom:parseInt(g),left:parseInt(h),right:parseInt(v)}},set position(e){r&&(o=e[1]<r[1]?"up":"down"),r=e,n||(n=r);var a=Object(s.a)(this.displacement,2),i=a[0],l=a[1];t.style.transform="translate(".concat(i,"px,").concat(l,"px)")},get position(){return r},grasp:function(){t.style.willChange="transform",t.style.zIndex=999,t.style.position="relative",t.style.transition=p.grasp,t.classList.add(e.dragClassName),e.raised&&t.classList.add("shadow")},moveIntoPlace:function(e,n){var r=this;return new Promise(function(o){var a=t.getBoundingClientRect(),i=a.left,s=a.top,l=[{transform:"translate(".concat(i-e-r.margins.left,"px,").concat(s-n+r.dimensions.height+r.margins.top,"px)")},{transform:"translate(".concat(0,"px,",0,"px)")}];t.animate(l,{duration:200,easing:"ease-in-out"}).onfinish=function(){t.style.transition=null,t.style.transform="translate(".concat(0,"px,",0,"px)"),o()}})},settleIntoPlace:function(){var n,r,o=(n=t,r="transitionend",new Promise(function(t,e){n.addEventListener(r,function e(n){n.target.removeEventListener(r,e,!1),t()},!1)}));return requestAnimationFrame(function(){t.classList.remove(e.dragClassName),t.classList.remove("shadow"),t.style.transition=p.settleIntoPlace}),o},release:function(){var e=Object(f.a)(u.a.mark(function e(n,r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.moveIntoPlace(n,r);case 2:return e.next=4,this.settleIntoPlace();case 4:t.style.position=null,t.style.zIndex=null,t.style.transition=null,t.style.transform=null;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}}function g(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];e.push({element:r,top:r.offsetTop,height:r.offsetHeight,translateY:0})}return{get:function(t){return e[t]},get count(){return e.length},removeAt:function(t){e.splice(t,1)},resetStyles:function(){e.forEach(function(t){var e=t.element;e.style.transition=null,e.style.transform=null})},print:function(){console.table(e.map(function(t){return{item:t.element.innerText,top:t.top,translateY:t.translateY}}))}}}function h(t){return{get element(){return t},get geometry(){return{left:t.offsetLeft,top:t.offsetTop,right:t.offsetLeft+t.offsetWidth,bottom:t.offsetTop+t.offsetHeight,height:t.offsetHeight,width:t.offsetWidth}}}}var v=n(7),w=n.n(v),y=function(t,e){var n,r,o,a,i,l=new h(t),c=l.element.parentNode,m=Array.from(l.element.children),p=new g(m);return{grasp:function(){var t=Object(f.a)(u.a.mark(function t(a){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a.target!==l.element&&!n){t.next=2;break}return t.abrupt("return");case 2:n=new d(a.target,e),r=m.indexOf(n.element),o=r,p.removeAt(r),i=setTimeout(function(){i=void 0,c.style.overflowY="hidden",n.grasp()},300);case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),move:function(t){if(!v()){a=requestAnimationFrame(function t(){var e=function(){var t=c.getBoundingClientRect(),e=n.element.getBoundingClientRect(),r=Math.min(t.bottom,window.innerHeight)-e.bottom,o=e.top-Math.max(t.top,0),a=c.scrollHeight-Math.min(c.clientHeight,window.innerHeight),i=0;r<80?i=Math.min(80,80-r):o<80&&(i=Math.max(-80,o-80));return[Math.max(0,Math.min(a,c.scrollTop+.25*i)),i]}(),f=Object(s.a)(e,2),m=f[0],d=f[1];c.scrollTop=m;n.position=[r,i+m];var g=n,h=g.direction,v=g.dimensions.height,w=Object(s.a)(g.absoluteCenter,2),y=w[0],x=w[1];if(y>l.geometry.right||y<l.geometry.left)return void(a=requestAnimationFrame(t));if("down"===h)for(;o<p.count;o++){var b=p.get(o);if(b.top>x)break;b.top-=v,b.translateY-=v,u(b)}else if("up"===h)for(;o>0;o--){var I=p.get(o-1),N=I.top+I.height;if(N<x)break;I.top+=v,I.translateY+=v,u(I)}o<=0||o>=p.count||0===d?cancelAnimationFrame(a):a=requestAnimationFrame(t)});var e=[t.touches[0].clientX,t.touches[0].clientY],r=e[0],i=e[1]}function u(t){var e=t.element,n=t.translateY,r=void 0===n?0:n;e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(r,"px)")}},release:function(t){return v()?{}:(c.style.overflowY="scroll",p.resetStyles(),{oldIndex:r,newIndex:o})},drop:function(){if(v())return{};n.release(0,p.get(o).top-c.scrollTop+l.geometry.top),w()(n.element),n=void 0}};function v(){return i&&(clearTimeout(i),i=void 0,n=void 0),!n||(cancelAnimationFrame(a),!1)}};function x(t){Object(r.useEffect)(function(){e=new y(n.current,t)});var e,n=Object(r.useRef)();return o.a.createElement("div",{style:{overflowY:"scroll"}},o.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){e.grasp(n),t.onGrasp&&t.onGrasp()},onTouchMove:function(n){e.move(n),t.Drag&&t.onDrag()},onTouchEnd:function(n){var r=e.release(n);t.onDrop&&t.onDrop(r),e.drop()},onContextMenu:m},t.children))}x.defaultProps={raised:!0,dragClassName:"drag-style"};var b=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===e)return t;if(isNaN(Number(e)||isNaN(Number(n))))return t;var r=Object(l.a)(t),o=null!==e?r.splice(e,1)[0]:null;return null!==n&&r.splice(n,0,o),r},I=function(t){return Object(l.a)(Array(t).keys()).map(function(t){return"Item ".concat(t)})};i.a.render(o.a.createElement(function(){var t=Object(r.useState)(I(80)),e=Object(s.a)(t,2),n=e[0],a=e[1];return o.a.createElement("div",{className:"list"},o.a.createElement(x,{dragClassName:"drag-style",onDrop:function(t){var e=t.oldIndex,r=t.newIndex;return a(b(n,e,r))}},n.map(function(t){return o.a.createElement("div",{key:t,className:"list-item"},t)})))},null),document.getElementById("root"))},8:function(t,e,n){t.exports=n(20)}},[[8,2,1]]]);
//# sourceMappingURL=main.bbedb742.chunk.js.map