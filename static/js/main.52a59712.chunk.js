(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(23)},17:function(e,t,n){},21:function(e,t,n){},23:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n.n(r),o=n(6),s=n.n(o),i=n(7),u=n(8),c=n(10),l=n(9),f=n(11),p=n(3),d=(n(17),n(0)),m=n.n(d),h=n(2),v=n(4),g=(n(21),function(e){return e.preventDefault()}),b=function(e,t){return new Promise(function(n,r){e.addEventListener(t,function e(r){r.target.removeEventListener(t,e,!1),n()},!1)})},w={grasp:"box-shadow .2s ease-in-out, background-color .2s ease-in-out",moveIntoPlace:"transform .2s ease-in-out",settleIntoPlace:"box-shadow .2s ease-in-out, background-color .2s ease-in-out"};function y(e,t){var n=null,r=null,a=null;return{get element(){return e},get direction(){return a},get displacement(){return[r[0]-n[0],r[1]-n[1]]},get dimensions(){var t=window.getComputedStyle(e),n=t.marginTop,r=t.marginBottom,a=t.marginLeft,o=t.marginRight;return{width:e.offsetWidth+Math.max(parseInt(a),parseInt(o)),height:e.offsetHeight+Math.max(parseInt(n),parseInt(r))}},get initialCenter(){var t=e.offsetLeft,n=e.offsetTop,r=e.offsetHeight;return[t+e.offsetWidth/2,n+r/2]},get absoluteCenter(){var t=e.getBoundingClientRect(),n=t.left,r=t.top,a=t.height;return[n+t.width/2,r+a/2]},set position(t){r&&(a=t[1]<r[1]?"up":"down"),r=t,n||(n=r);var o=Object(v.a)(this.displacement,2),s=o[0],i=o[1];e.style.transform="translate(".concat(s,"px,").concat(i,"px)")},grasp:function(){e.style.willChange="transform",e.style.zIndex=999,e.style.position="relative",e.style.transition=w.grasp,e.classList.add(t.dragClassName),t.raised&&e.classList.add("shadow")},moveIntoPlace:function(){var t=Object(h.a)(m.a.mark(function t(a,o){var s;return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r!==n){t.next=2;break}return t.abrupt("return",Promise.resolve());case 2:return s=b(e,"transitionend"),e.style.transition=w.moveIntoPlace,e.style.transform="translate(0px,".concat(o,"px)"),t.next=7,s;case 7:return t.abrupt("return",s);case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}(),settleIntoPlace:function(){var n=Object(h.a)(m.a.mark(function n(){var r;return m.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r=b(e,"transitionend"),e.classList.remove(t.dragClassName),e.classList.remove("shadow"),e.style.transition=w.settleIntoPlace,n.next=6,r;case 6:case"end":return n.stop()}},n,this)}));return function(){return n.apply(this,arguments)}}(),release:function(){var t=Object(h.a)(m.a.mark(function t(n,r){return m.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.moveIntoPlace(n,r);case 2:return t.next=4,this.settleIntoPlace();case 4:e.style.position=null,e.style.zIndex=null,e.style.transition=null,e.style.transform=null;case 8:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}var x=function(e,t){var n,r,a,o,s,i,u={element:e,indexOf:function(t){return Object(p.a)(e.children).indexOf(t)},children:function(){return Object(p.a)(e.children)}};return{grasp:function(e){e.target!==u.element&&((n=new y(e.target,t)).grasp(n),r=u.indexOf(n.element),a=r,(s=u.children()).splice(r,1),i=n.element)},move:function(e){n.position=[e.touches[0].clientX,e.touches[0].clientY];var t=n,r=t.direction,u=t.dimensions.height;if(o||(o=r),"down"===r)for(var c=a;c<s.length;c++){var l=s[c];if(l.getBoundingClientRect().top>n.absoluteCenter[1])break;d(l,-u),i=l,a++}else if("up"===r)for(var f=a-1;f>=0;f--){var p=s[f];if(p.getBoundingClientRect().top+p.offsetHeight<n.absoluteCenter[1])break;d(p,u),i=p,a--}function d(e,t){e.style.willChange="transform",e.style.transition="transform .2s ease-in-out",e.style.transform="translateY(".concat(t+function(e){return Number((e.style.transform.match(/-?\d+/g)||[0])[0])}(e),"px)")}},release:function(){var e=Object(h.a)(m.a.mark(function e(t){var o,s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return",{oldIndex:null,newIndex:null});case 2:return o=r,s=a,e.next=6,n.release(0,c());case 6:return u.children().forEach(function(e){e.style.transition=null,e.style.transform=null}),e.abrupt("return",{oldIndex:o,newIndex:s});case 8:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()};function c(){var e=i.offsetTop,t=n.element.offsetTop,s=function(e){var t=window.getComputedStyle(e).getPropertyValue("transform").match(/-?\d+/g)||[0,0,0,0,0,0],n=Object(v.a)(t,6),r=n[4],a=n[5];return[r,a]}(i),u=Object(v.a)(s,2)[1],c=n,l=c.direction,f=c.dimensions.height,p=e-t;return!u&&e>t&&(p-=f),!u&&e>t&&(p+=f),o!==l&&"up"===l&&a>=r&&(p-=f),o!==l&&"down"===l&&a<=r&&(p+=f),p}};function I(e){Object(r.useEffect)(function(){return t=new x(n.current,e),null});var t,n=Object(r.useRef)();function o(){return(o=Object(h.a)(m.a.mark(function n(r){var a;return m.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r.stopPropagation(),n.next=3,t.release(r);case 3:a=n.sent,e.onDrop&&e.onDrop(a);case 5:case"end":return n.stop()}},n,this)}))).apply(this,arguments)}return a.a.createElement("div",{className:"container",ref:n,onTouchStart:function(n){n.stopPropagation(),t.grasp(n),e.onGrasp&&e.onGrasp()},onTouchMove:function(n){n.stopPropagation(),t.move(n),e.Drag&&e.onDrag()},onTouchEnd:function(e){return o.apply(this,arguments)},onContextMenu:g},e.children)}I.defaultProps={raised:!0,dragClassName:"drag-style"};var O=function(e){return Object(p.a)(Array(e).keys()).map(function(e){return"Item ".concat(e)})},j={reverse:function(e){var t,n=e.items;return{items:(t=n,t.slice().reverse())}},shuffle:function(e){var t,n=e.items;return{items:(t=n,t.map(function(e){return[Math.random(),e]}).sort(function(e,t){return e[0]-t[0]}).map(function(e){return e[1]}))}},move:function(e,t){return function(n){return{items:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(n===t)return e;if(isNaN(Number(t)||isNaN(Number(n))))return e;var r=Object(p.a)(e),a=null!==t?r.splice(t,1)[0]:null;return null!==n&&r.splice(n,0,a),r}(n.items,e,t)}}}},C=function(e){function t(){var e,n;Object(i.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(c.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).state={items:O(80)},n.onDrop=function(e){var t=e.oldIndex,r=e.newIndex;return n.setState(j.move(t,r))},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"list"},a.a.createElement(I,{dragClassName:"drag-style",onDrop:this.onDrop},this.state.items.map(function(e){return a.a.createElement("div",{key:e,className:"list-item"},e)})))}}]),t}(r.Component);s.a.render(a.a.createElement(C,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.52a59712.chunk.js.map