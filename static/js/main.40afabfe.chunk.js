(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(t,e,n){t.exports=n(23)},17:function(t,e,n){},21:function(t,e,n){},23:function(t,e,n){"use strict";n.r(e);var r=n(1),a=n.n(r),o=n(6),s=n.n(o),i=n(7),u=n(8),c=n(10),l=n(9),f=n(11),p=n(3),m=(n(17),n(0)),d=n.n(m),h=n(2),v=n(4),g=(n(21),function(t){return t.preventDefault()}),y=function(t,e){return new Promise(function(n,r){t.addEventListener(e,function t(r){r.target.removeEventListener(e,t,!1),n()},!1)})},w={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function b(t,e){var n=null,r=null,a=null,o=t.offsetLeft,s=t.offsetTop,i=t.offsetHeight,u=t.offsetWidth,c=window.getComputedStyle(t),l=c.marginTop,f=c.marginBottom,p=c.marginLeft,m=c.marginRight,g=[o+u/2,s+i/2],b={width:u+Math.max(parseInt(p),parseInt(m)),height:i+Math.max(parseInt(l),parseInt(f))};return{get element(){return t},get direction(){return a},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){return b},get absoluteCenter(){return[g[0]+this.displacement[0],g[1]+this.displacement[1]]},set position(e){r&&(a=e[1]<r[1]?"up":"down"),r=e,n||(n=r);var o=Object(v.a)(this.displacement,2),s=o[0],i=o[1];t.style.transform="translate(".concat(s,"px,").concat(i,"px)")},get position(){return r},grasp:function(){t.style.willChange="transform",t.style.zIndex=999,t.style.position="relative",t.style.transition=w.grasp,t.classList.add(e.dragClassName),e.raised&&t.classList.add("shadow")},moveIntoPlace:function(){var e=Object(h.a)(d.a.mark(function e(a,o){var s;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r!==n){e.next=2;break}return e.abrupt("return",Promise.resolve());case 2:return s=y(t,"transitionend"),requestAnimationFrame(function(){t.style.transition=w.moveIntoPlace,t.style.transform="translate(0px,".concat(o-t.offsetTop,"px)")}),e.next=6,s;case 6:return e.abrupt("return",s);case 7:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),settleIntoPlace:function(){var n=Object(h.a)(d.a.mark(function n(){var r;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=y(t,"transitionend"),requestAnimationFrame(function(){t.classList.remove(e.dragClassName),t.classList.remove("shadow"),t.style.transition=w.settleIntoPlace}),n.next=4,r;case 4:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}}(),release:function(){var e=Object(h.a)(d.a.mark(function e(n,r){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.moveIntoPlace(n,r);case 2:return e.next=4,this.settleIntoPlace();case 4:t.style.position=null,t.style.zIndex=null,t.style.transition=null,t.style.transform=null;case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}()}}var x=function(t,e){var n,r,a,o,s,i,u;return{grasp:function(i){if(t.style.touchAction="none",i.stopPropagation(),i.preventDefault(),i.target!==t){var c=i.target;console.log("ffffff"),n=new b(c,e),u=setTimeout(function(){u=void 0,n.grasp()},300),o=Array.prototype.slice.call(t.children),r=o.indexOf(n.element),a=r,o.splice(r,1),function(){s=[];for(var t=o.length,e=0;e<t;e++){var n=o[e];s.push({element:n,top:n.offsetTop,height:n.offsetHeight,translateY:0})}}()}},move:function(e){if(t.style.touchAction="none",e.stopPropagation(),e.preventDefault(),n){var r=[e.touches[0].clientX,e.touches[0].clientY],c=r[0],l=r[1];if(u)return clearTimeout(u),u=void 0,void(n=void 0);cancelAnimationFrame(i),i=requestAnimationFrame(function e(){var r=function(){var e=0,r=t,a=r.getBoundingClientRect(),o=n.element.getBoundingClientRect(),s=Math.min(a.bottom,window.innerHeight)-o.bottom,i=o.top-Math.max(a.top,0),u=t.scrollHeight-Math.min(r.clientHeight,window.innerHeight);s<80?e=Math.min(80,80-s):i<80&&(e=Math.max(-80,i-80));var c=Math.max(0,Math.min(u,r.scrollTop+e/4));return r.scrollTop=c,{scrollAmount:c,offset:e}}(),u=r.scrollAmount,p=r.offset;n.position=[c,l+u];var m=n,d=m.direction,h=m.dimensions.height;var v=n.absoluteCenter[1];if("down"===d)for(;a<o.length;a++){var g=s[a];if(g.top>v)break;g.top-=h,g.translateY-=h,f(g)}else if("up"===d)for(;a>0;a--){var y=s[a-1],w=y.top+y.height;if(w<v)break;y.top+=h,y.translateY+=h,f(y)}a<=0||a>=s.length||0===p?cancelAnimationFrame(i):i=requestAnimationFrame(e)})}function f(t){var e=t.element,n=t.translateY,r=void 0===n?0:n;e.style.willChange="transform",e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(r,"px)")}},release:function(){var e=Object(h.a)(d.a.mark(function e(s){var c,l;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.style.touchAction="pan-y",s.stopPropagation(),s.preventDefault(),console.log("sdfsdfsdfsd"),!u){e.next=9;break}return clearTimeout(u),u=void 0,n=void 0,e.abrupt("return",{});case 9:if(cancelAnimationFrame(i),n){e.next=12;break}return e.abrupt("return",{oldIndex:null,newIndex:null});case 12:return c=r,l=a,e.next=16,n.release(0,t.children[a].offsetTop);case 16:return o.forEach(function(t){t.style.transition=null,t.style.transform=null}),e.abrupt("return",{oldIndex:c,newIndex:l});case 18:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}};function I(t){Object(r.useEffect)(function(){return e=new x(n.current,t),null});var e,n=Object(r.useRef)();function o(){return(o=Object(h.a)(d.a.mark(function n(r){var a;return d.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r.stopPropagation(),n.next=3,e.release(r);case 3:a=n.sent,t.onDrop&&t.onDrop(a);case 5:case"end":return n.stop()}},n,this)}))).apply(this,arguments)}return a.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){n.stopPropagation(),e.grasp(n),t.onGrasp&&t.onGrasp()},onTouchMove:function(n){n.stopPropagation(),e.move(n),t.Drag&&t.onDrag()},onTouchEnd:function(t){return o.apply(this,arguments)},onContextMenu:g},t.children)}I.defaultProps={raised:!0,dragClassName:"drag-style"};var k=function(t){return Object(p.a)(Array(t).keys()).map(function(t){return"Item ".concat(t)})},P={reverse:function(t){var e,n=t.items;return{items:(e=n,e.slice().reverse())}},shuffle:function(t){var e,n=t.items;return{items:(e=n,e.map(function(t){return[Math.random(),t]}).sort(function(t,e){return t[0]-e[0]}).map(function(t){return t[1]}))}},move:function(t,e){return function(n){return{items:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===e)return t;if(isNaN(Number(e)||isNaN(Number(n))))return t;var r=Object(p.a)(t),a=null!==e?r.splice(e,1)[0]:null;return null!==n&&r.splice(n,0,a),r}(n.items,t,e)}}}},O=function(t){function e(){var t,n;Object(i.a)(this,e);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(c.a)(this,(t=Object(l.a)(e)).call.apply(t,[this].concat(a)))).state={items:k(80)},n.onDrop=function(t){var e=t.oldIndex,r=t.newIndex;return n.setState(P.move(e,r))},n}return Object(f.a)(e,t),Object(u.a)(e,[{key:"render",value:function(){return a.a.createElement("div",{className:"list"},a.a.createElement(I,{dragClassName:"drag-style",onDrop:this.onDrop},this.state.items.map(function(t){return a.a.createElement("div",{key:t,className:"list-item"},t)})))}}]),e}(r.Component);s.a.render(a.a.createElement(O,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.40afabfe.chunk.js.map