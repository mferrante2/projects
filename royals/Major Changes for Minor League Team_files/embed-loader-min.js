!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}({1:function(t,e,n){n("DpIS"),t.exports=n("D9nc")},"8oxB":function(t,e){var n,i,r=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var c,h=[],u=!1,f=-1;function l(){u&&c&&(u=!1,c.length?h=c.concat(h):f=-1,h.length&&d())}function d(){if(!u){var t=s(l);u=!0;for(var e=h.length;e;){for(c=h,h=[];++f<e;)c&&c[f].run();f=-1,e=h.length}c=null,u=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function g(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new p(t,e)),1!==h.length||u||s(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=g,r.addListener=g,r.once=g,r.off=g,r.removeListener=g,r.removeAllListeners=g,r.emit=g,r.prependListener=g,r.prependOnceListener=g,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},D9nc:function(t,e){Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},r=function(){return n.apply(this instanceof i&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,r.prototype=new i,r});var n=window.self===window.top;function i(){var t=window.navigator.userAgent;return-1!==t.indexOf("MSIE ")||-1!==t.indexOf("Trident/")||-1!==t.indexOf("Edge/")}Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var n;if(null==this)throw new TypeError('"this" is null or not defined');var i=Object(this),r=i.length>>>0;if(0===r)return-1;var o=+e||0;if(Math.abs(o)===1/0&&(o=0),o>=r)return-1;for(n=Math.max(o>=0?o:r-Math.abs(o),0);n<r;){if(n in i&&i[n]===t)return n;n++}return-1}),function(t,e,r){var o,a,s,c,h=i()?/^frameStart/:/^frameReady/,u=["https://infogr.am","https://e.infogr.am","https://infogram.com","https://e.infogram.com"],f=t.getComputedStyle||function(t){return t.currentStyle},l=(o=[],a=[],s=function(t,e){if(!Array.prototype.indexOf){var n,i=-1;for(n=0;n<t.length;n++)if(this[n]===e){i=n;break}return i}return t.indexOf(e)},c=function(t,e){return-1!==s(t,e)},{add:function(t,e){c(o,t)||c(a,e)||(o.push(t),a.push(e))},contains:function(t){return c(o,t)},id:function(t){var e=s(o,t);return e>=0?a[e]:null}});function d(t){if(t.parentNode){var e=function(t){return Array.prototype.indexOf.call(t.parentNode.childNodes,t)}(t),n=d(t.parentNode);return n.push(e),n}return[]}function p(t){return!(t.left===t.right&&t.top===t.bottom&&t.right===t.top&&0===t.top)}function g(t,e){this.queue=t||[],this.processing=0,this.origin=e,this.infographics={},this.legacyList=[],this.addIframesListener(),this.addScrollListener(),this.initWatcher(),this.handleResizeEvent()}var m=g.prototype;function v(){var n,i=[];if(e.querySelectorAll)n=e.querySelectorAll(".infogram-embed");else if(e.getElementsByClassName)n=e.getElementsByClassName("infogram-embed");else{n=[];for(var r=e.getElementsByTagName("div"),o=r.length,a=0;a<o;a++){var s=r[a];s.className&&-1!==s.className.indexOf("infogram-embed")&&n.push(s)}}for(var c=n.length,h=0;h<c;h++){var u=n[h];if(!u.getAttribute("data-processed")){var f=u.getAttribute("data-id"),l=u.getAttribute("data-type"),d=u.getAttribute("data-title"),p=u.getAttribute("data-extra")||"",g=t.getComputedStyle(u);"0px"==g.getPropertyValue("height")&&"0px"==g.getPropertyValue("min-height")&&u.style.setProperty("min-height","1px"),u.setAttribute("data-processed",1),i.push({container:u,extra:p,id:f,title:d,type:l,activated:!1,frameReady:!1})}}return i}function y(t){if(e.contains)return e.contains(t);for(var n=e.documentElement;t;){if(t===n)return!0;t=t.parentNode}return!1}function b(e,n,i,r){e.addEventListener?e.addEventListener(n,i,r):e.attachEvent?e.attachEvent("on"+n,function(){return i.call(e,t.event)}):e["on"+n]=i}if(m.addIframesListener=function(){b(t,"message",this.handleMessageEvent.bind(this))},m.addScrollListener=function(){b(t,"scroll",this.handleScrollEvent.bind(this),{passive:!0,capture:!0}),b(t,"resize",this.handleResizeEvent.bind(this))},m.handleResizeEvent=function(){this.vWidth=t.innerWidth||e.documentElement.clientWidth,this.vHeight=t.innerHeight||e.documentElement.clientHeight,this.handleScrollEvent()},m.getViewportInfo=function(t){return{root:n?{left:0,top:0,bottom:this.vHeight,right:this.vWidth,width:this.vWidth,height:this.vHeight}:{left:-Number.MAX_VALUE/2,top:-Number.MAX_VALUE/2,bottom:Number.MAX_VALUE/2,right:Number.MAX_VALUE/2,width:Number.MAX_VALUE,height:Number.MAX_VALUE},rect:{left:t.left,top:t.top,bottom:t.bottom,right:t.right,width:t.width,height:t.height}}},m.checkVisible=function(){var t,e;for(t in this.infographics)if(this.infographics.hasOwnProperty(t)){var n=this.infographics[t];if(n.canReceiveEvents){var i=n.iframe(),r=i&&i.getBoundingClientRect();this.sendToIframe(t,"iframePositionChange:"+JSON.stringify(this.getViewportInfo(r))),n.activationSent||(e=this.isElementVisible(n.iframe(),r))&&(this.sendToIframe(t,"visibleRegion:"+JSON.stringify(e)),n.activationSent=!0)}!n.activated&&n.frameReady&&(e=this.isElementVisible(n.iframe()))&&(n.activated=!0)}this.sortQueue();var o=[];this.queue.forEach(function(t){this.isElementVisible(t.container)&&!t.viewed&&(t.viewed=!0,o.push(t))}.bind(this)),o.forEach(function(t){this.processInfographic(t)}.bind(this))},m.handleScrollEvent=function(){this.scrollBuffer||(this.scrollBuffer=requestAnimationFrame(function(){this.checkVisible(),this.scrollBuffer=null}.bind(this)))},m.handleMessageEvent=function(t){if(this.origin!==t.origin){var e=/^https?:\/\//,n=this.origin.replace(e,"https://"),i=t.origin.replace(e,"https://");if(i!==n&&-1===u.indexOf(i))return;-1===this.origin.indexOf("https://")&&0===t.origin.indexOf("https://")&&(this.origin=n)}var r=t.source;if(!l.contains(r))for(var o in this.infographics)if(this.infographics.hasOwnProperty(o)&&this.infographics[o].iframe().contentWindow===r){l.add(r,o);break}var a=l.id(r);a&&a in this.infographics&&this.handleIframeEvent(a,t.data)},m.handleIframeEvent=function(t,e){if("string"==typeof e){var n,i=e.split(":").shift(),r=this.infographics[t];if(h.test(i)&&(this.processing--,0===this.processing&&(this.checkVisible(),this.processOne())),"frameReady"===e)return this.infographics[t].frameReady=!0,void this.handleScrollEvent();if(/^iframeLoaded/.test(i))this.infographics[t].canReceiveEvents=!0,this.handleResizeEvent(),this.sendToIframe(t,"iframeWidth:"+r.containerWidth);else if(/^iframeHeight/.test(i)){n=r.iframe();var o=e.substr(i.length+1).replace(/^\s+|\s+$/g,""),a=o+"px";n.style.height!==a&&(n.style.height=a,r.iframeHeight=o,this.fixForGannett(r))}}},m.fixForGannett=function(t){var e=t.container.parentNode;if(e&&e.parentNode){var n=e.parentNode;if(n&&n.className&&-1!==n.className.indexOf("oembed-infogram")){var i=t.containerWidth,r=t.iframeHeight||t.iframe.style.height;n.setAttribute("data-width",i),n.setAttribute("data-height",r),$&&$.data&&($(n).data("width",i),$(n).data("height",r))}}},m.sendToIframe=function(t,e){var n=this.infographics[t];n&&n.iframe()&&n.iframe().contentWindow.postMessage(e,this.origin)},m.isElementVisible=function(t,e){if(!t)return!1;var n=e||t.getBoundingClientRect();if(n.right<0||n.bottom<0||n.left>this.vWidth||n.top>this.vHeight)return!1;if(0===n.width&&0===n.height&&0===n.left&&0===n.top)return!1;var i=Math.min(this.vWidth-n.left,n.width),r=Math.min(this.vHeight-n.top,n.height),o=-1*Math.min(n.left,-0);return{top:-1*Math.min(n.top,-0),left:o,width:i,height:r}},m.initWatcher=function(){setInterval(function(){var t;for(t in this.infographics)if(this.infographics.hasOwnProperty(t)){var n,i=this.infographics[t];if(i.container&&y(i.container))n=i.container;else{if(!(n=e.getElementById(t))){delete this.infographics[t];continue}i.container=n}var r=n.offsetWidth;if(r&&i.containerWidth!==r){i.containerWidth=r;var o=f(n),a=this.getHorizBorders(o)+this.getHorizPaddings(o),s=parseInt(r,10)-a;i.iframe&&(i.iframe().style.width=s+"px",this.sendToIframe(t,"iframeWidth:"+s))}}this.legacyList&&this.legacyList.length&&(this.queue=this.legacyList.slice(0),this.legacyList.length=0,this.processQueue())}.bind(this),200)},m.getHorizBorders=function(t){return parseInt(t.getPropertyValue("border-left-width")||0,10)+parseInt(t.getPropertyValue("border-right-width")||0,10)},m.getHorizPaddings=function(t){return parseInt(t.getPropertyValue("padding-left")||0,10)+parseInt(t.getPropertyValue("padding-right")||0,10)},m.add=function(t,e,n,i,r){this.queue.push({id:t,title:i,container:e,type:n,extra:r}),0===this.processing&&this.processQueue()},m.processInfographic=function(t){var e=this.queue.indexOf(t);if(!(e<0)){this.queue.splice(e,1);var n=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return"ig-"+t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}();t.id=t.id.replace("infogram_0_","").replace(/(http(s?):\/\/infogr(\.am|am\.com)\/)/,"").replace(/\s/g,""),t.container.id=n,t.containerWidth=parseInt(t.container.offsetWidth,10);var i=this.createIframe(t.id,t.title||"",t.type,t.containerWidth,t.extra);t.iframe=function(t){return function(){return t.container.getElementsByTagName("iframe")[0]}}(t),t.container.appendChild(i),this.infographics[n]=t,this.processing++}},m.sortQueue=function(){this.queue.sort(function(t,e){return function(t,e){var n=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=p(n);if(r!=p(i))return r?-1:1;var o=Math.abs(n.top)-Math.abs(i.top);if(0!=o)return o;for(var a=0,s=d(t),c=d(e);a<s.length&&a<c.length&&s[a]===c[a];)a++;return a<s.length&&a<c.length?s[a]-c[a]:0}(t.container,e.container)})},m.processOne=function(){0!==this.queue.length&&(this.sortQueue(),this.processInfographic(this.queue[0]))},m.processQueue=function(){for(;this.queue.length>0;)this.processOne()},m.createIframe=function(t,i,r,o,a){var s=e.createElement("iframe"),c=this.origin+"/"+t+"?src=embed"+(n?"#async_embed":"");"image"===r&&(c+="&type=image"),a&&(c+="&extra="+a),i=i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");var h=s.style;return h.border="none",h.width=o+"px",h.height="130px",s.src=c,s.setAttribute("scrolling","no"),s.setAttribute("frameborder","0"),s.setAttribute("allowfullscreen",""),i&&s.setAttribute("title",i),s},m.process=function(){for(var t=v(),e=t.length,n=0;n<e;n++){var i=t[n];this.add(i.id,i.container,i.type,i.title,i.extra)}},!t[r]||!t[r].initialized){var w;w=!!e.getElementById("infogram-async")?e.getElementById("infogram-async").src:t[r].script;var E=v();t[r]&&t[r].list&&t[r].list.length&&Array.prototype.push.apply(E,t[r].list);var x=new g(E,function(n){var i=e.createElement("A");i.href=n;var r=i.port&&80!=i.port&&443!=i.port?":"+i.port:"",o="http:";return i.protocol.length>2?o=i.protocol:t.location.protocol.length>2&&(o=t.location.protocol),o+"//"+i.hostname+r}(w));x.processOne(),t[r]={add:x.add.bind(x),process:x.process.bind(x),list:x.legacyList,initialized:!0}}}(window,document,"InfogramEmbeds")},DpIS:function(t,e,n){n("xEkU").polyfill()},bQgK:function(t,e,n){(function(e){(function(){var n,i,r,o,a,s;"undefined"!=typeof performance&&null!==performance&&performance.now?t.exports=function(){return performance.now()}:null!=e&&e.hrtime?(t.exports=function(){return(n()-a)/1e6},i=e.hrtime,o=(n=function(){var t;return 1e9*(t=i())[0]+t[1]})(),s=1e9*e.uptime(),a=o-s):Date.now?(t.exports=function(){return Date.now()-r},r=Date.now()):(t.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,n("8oxB"))},xEkU:function(t,e,n){(function(e){for(var i=n("bQgK"),r="undefined"==typeof window?e:window,o=["moz","webkit"],a="AnimationFrame",s=r["request"+a],c=r["cancel"+a]||r["cancelRequest"+a],h=0;!s&&h<o.length;h++)s=r[o[h]+"Request"+a],c=r[o[h]+"Cancel"+a]||r[o[h]+"CancelRequest"+a];if(!s||!c){var u=0,f=0,l=[];s=function(t){if(0===l.length){var e=i(),n=Math.max(0,1e3/60-(e-u));u=n+e,setTimeout(function(){var t=l.slice(0);l.length=0;for(var e=0;e<t.length;e++)if(!t[e].cancelled)try{t[e].callback(u)}catch(t){setTimeout(function(){throw t},0)}},Math.round(n))}return l.push({handle:++f,callback:t,cancelled:!1}),f},c=function(t){for(var e=0;e<l.length;e++)l[e].handle===t&&(l[e].cancelled=!0)}}t.exports=function(t){return s.call(r,t)},t.exports.cancel=function(){c.apply(r,arguments)},t.exports.polyfill=function(t){t||(t=r),t.requestAnimationFrame=s,t.cancelAnimationFrame=c}}).call(this,n("yLpj"))},yLpj:function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n}});