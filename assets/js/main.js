"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var a=[],n=!0,r=!1,o=void 0;try{for(var c,i=e[Symbol.iterator]();!(n=(c=i.next()).done)&&(a.push(c.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==i.return||i.return()}finally{if(r)throw o}}return a}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function ownKeys(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),a.push.apply(a,n)}return a}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(Object(a),!0).forEach(function(e){_defineProperty(t,e,a[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))})}return t}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var utils={notif:function(e,t,a,n,r){var o=1<arguments.length&&void 0!==t?t:"info",c=3<arguments.length?n:void 0,i=4<arguments.length?r:void 0;2<arguments.length&&void 0!==a&&a&&$.notifyClose();var l="icon-info";"wait"===o&&(l="icon-hourglass",o="info"),"success"===o&&(l="icon-check"),"danger"!==o&&"warning"!==o||(l="icon-exclamation"),$.notify(_objectSpread({message:e,icon:l},i),_objectSpread({type:o},c))},getSlug:function(e){return e.toLowerCase().replace(/[^\w ]+/g,"").replace(/ +/g,"-")}},dbg=function(e,t){var a=0<arguments.length&&void 0!==e?e:"!",n=1<arguments.length&&void 0!==t?t:0;"undefined"!=typeof DEV&&DEV&&console.info("%c"+a,"color: ".concat("number"==typeof n?["#00ff7f","#6495ed","#ff0","#fa8072","#ffa500","#f00"][n]:n))};$(function(){console.log("© Muhammad Afifudin, 2020"),console.log("%cVersion: "+$('script[src*="assets/js"]').prop("src").split("?v=")[1],"color: #6495ed"),$("body").tooltip({selector:'[data-toggle="tooltip"]',html:!0})}),$.fn.notifyDefaults&&$.notifyDefaults({placement:{from:"bottom"},animate:{enter:"animated fadeInUp",exit:"animated fadeOutDown"}}),document.addEventListener("DOMContentLoaded",function(){var y={body:document.getElementsByTagName("body")[0],search:document.getElementById("search"),result_loading:document.getElementById("result-loading"),result_summary:document.getElementById("result-summary"),result_table:document.getElementById("result-table"),result_table_body:document.getElementById("result-table-body")},p=[],f=new Mark(y.result_table_body),e=new XMLHttpRequest;e.open("GET","assets/csv/mfd.csv",!0),e.onload=function(){var e=this.response,t=this.status;if(200<=t&&t<400&&e.startsWith("11,")){var c=-1,i=-1,l=-1;e.split("\n").forEach(function(e){var t=_slicedToArray(e.split(","),2),a=t[0],n=t[1];if(2===a.length)p.push({id:a,parent_id:0,full_id:a,name:n.replace("Dki J","DKI J").replace("Di Y","DI Y"),name_lc:n.toLowerCase(),lv:0,ch:[]}),c++,l=i=-1;else if(4===a.length){var r=a.substr(2,2);p[c].ch.push({kota:70<r,id:r,parent_id:a.substr(0,2),full_id:a,name:n,name_lc:n.toLowerCase(),lv:1,ch:[]}),i++,l=-1}else if(7===a.length)p[c].ch[i].ch.push({id:a.substr(4,3),parent_id:a.substr(0,4),full_id:a,name:n,name_lc:n.toLowerCase(),lv:2,ch:[]}),l++;else if(10===a.length){var o=a.substr(2,2);p[c].ch[i].ch[l].ch.push({kota:70<o,id:a.substr(7,3),parent_id:a.substr(0,7),full_id:a,name:n,name_lc:n.toLowerCase(),lv:3})}}),console.info(p),document.getElementById("loading").style.display="none",document.getElementById("search-form-wrapper-outer").className="search-form-wrapper-outer animated animated-1s bounceIn",document.getElementById("explore-wrapper").className="explore-wrapper animated animated-1s bounceInUp",y.search.focus()}else document.getElementById("loading").innerHTML='<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>',setTimeout(function(){document.getElementsByTagName("header")[0].className="bg-danger-gradient pb-6"},1e3)},e.onerror=function(){document.getElementById("loading").innerHTML='<div class="animated animated-1s swing delay-1s"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div>',setTimeout(function(){document.getElementsByTagName("header")[0].className="bg-danger-gradient pb-6"},1e3)},e.send(),y.search.addEventListener("keypress",function(e){13===e.which&&t(y.search.value)},!1),document.getElementById("search-btn").addEventListener("click",function(){t(y.search.value)},!1);var t=function(s){var d=_toConsumableArray(new Set(s.trim().toLowerCase().split(/[\s,]+/))).filter(function(e){return e.length}),u=1===d.length&&/^\d{2,10}$/.test(d[0]);dbg("Search: "+s),console.info(d),d.filter(function(e){return 2<e.length}).length||1<d.filter(function(e){return 1<e.length}).length||3<d.length||u?(dbg("Good keyword :)",1),setTimeout(function(){var e=$.extend(!0,[],p),o={pr:0,kb:0,kc:0,ds:0};1<d.length&&d.every(function(e){return/^\d{2,7}$/.test(e)})&&(d=[d.join("")],u=!0),e.forEach(function(r){u&&r.full_id==d[0]?(r.display=1,r.ch.forEach(function(e){return e.display=0}),o.pr++):(d.every(function(e){return r.name_lc.includes(e)})&&(r.display=0,r.match=1,o.pr++),r.ch.forEach(function(n){u&&n.full_id==d[0]?(r.display=1,n.display=1,n.ch.forEach(function(e){return e.display=0}),o.kb++):(d.every(function(e){return n.name_lc.includes(e)})&&(r.display=1,n.display=0,n.match=1,o.kb++),n.ch.forEach(function(a){u&&a.full_id==d[0]?(r.display=1,n.display=1,a.display=1,a.ch.forEach(function(e){return e.display=0}),o.kc++):(d.every(function(e){return a.name_lc.includes(e)})&&(r.display=1,n.display=1,a.display=0,a.match=1,o.kc++),a.ch.forEach(function(t){u&&t.full_id==d[0]?(r.display=1,n.display=1,a.display=1,t.display=0,o.ds++):d.every(function(e){return t.name_lc.includes(e)})&&(r.display=1,n.display=1,a.display=1,t.display=0,t.match=1,o.ds++)}))}))}))});function t(e){var t=e.display,a=e.full_id,n=e.parent_id,r=e.id,o=e.name,c=e.lv,i=e.kota,l=e.match;return 0===t?"<tr".concat(i?' data-kota="1"':"",' class="lv-').concat(c,'" data-fid="').concat(a,'" data-parent="').concat(n,'"><td>').concat(n,"<b>").concat(r,"</b></td><td>").concat(o,"</td></tr$>"):1===t?"<tr".concat(i?' data-kota="1"':"",' class="lv-').concat(c," toggle toggle-expanded").concat(l?"":" unmark",'" data-fid="').concat(a,'" data-parent="').concat(n,'"><td>').concat(n,"<b>").concat(r,"</b></td><td>").concat(o,"</td></tr$>"):""}var a="";e.forEach(function(e){a+=t(e),e.ch.forEach(function(e){a+=t(e),e.ch.forEach(function(e){a+=t(e),e.ch.forEach(function(e){a+=t(e)})})})});function n(e){return'<b class="fw-6">'.concat(e,"</b>")}var r=o.pr,c=o.kb,i=o.kc,l=o.ds;r+c+i+l?(y.result_summary.innerHTML=u?"<div>Menampilkan hasil pencarian wilayah dengan kode ".concat(n(s),"</div>"):'<div class="text-success">Menemukan '.concat(n(r)," provinsi, ").concat(n(c)," kabupaten/kota, ").concat(n(i)," kecamatan, dan ").concat(n(l)," desa/kelurahan.</div>"),y.result_table_body.innerHTML=a,y.result_table.style.display="",u||d.forEach(function(e){return f.mark(e)})):y.result_summary.innerHTML='<div class="text-danger">Tidak ada hasil untuk pencarian '.concat(n(s),"</div>"),y.result_loading.style.display="none",y.result_summary.style.display=""},y.body.classList.contains("search-active")?200:600),y.search.blur(),y.result_table.style.display="none",y.result_summary.style.display="none",y.result_loading.style.display="",y.body.classList.add("search-active"),$("#result").slideDown()):dbg("Bad keyword :(",1)};document.getElementById("explore-btn").addEventListener("click",function(){y.search.value="",y.result_summary.style.display="none",y.result_table.style.display="none",y.result_loading.style.display="",setTimeout(function(){y.result_table_body.innerHTML=p.map(function(e,t){return'<tr class="lv-0 toggle toggle-explore" data-i="'.concat(t,'" data-j="" data-k="" data-fid="').concat(e.full_id,'"><td><b>').concat(e.id,"</b></td><td>").concat(e.name,"</td></tr>")}).join(""),y.result_loading.style.display="none",y.result_table.style.display=""},y.body.classList.contains("search-active")?200:600),y.body.classList.add("search-active"),$("#result").slideDown()},!1),y.result_table_body.addEventListener("click",function(e){for(var t=e.target;t&&t!=this;t=t.parentNode){if(t.matches("tr"))if("break"===function(){var f=t.dataset;if(console.info(f),t.classList.contains("toggle-expanded"))document.querySelectorAll('[data-parent^="'.concat(f.fid,'"]')).forEach(function(e){e.classList.remove("toggle-expanded"),e.style.display="none"});else{if(t.classList.contains("toggle-explore")){t.classList.remove("toggle-explore"),t.classList.add("toggle-expanded");var e=[];e=f.k.length?p[f.i].ch[f.j].ch[f.k].ch:f.j.length?p[f.i].ch[f.j].ch:p[f.i].ch;return t.outerHTML+=e.map(function(e,t){return a=e,n=f.j?_objectSpread({},f,{k:t}):_objectSpread({},f,{j:t}),r=a.full_id,o=a.parent_id,c=a.id,i=a.name,l=a.lv,s=a.kota,d=n.i,u=n.j,y=n.k,"<tr".concat(s?' data-kota="1"':"",' class="lv-').concat(l).concat(3===l?"":' toggle toggle-explore" data-i="'.concat(d,'" data-j="').concat(u,'" data-k="').concat(y),'" data-fid="').concat(r,'" data-parent="').concat(o,'"><td>').concat(o,"<b>").concat(c,"</b></td><td>").concat(i,"</td></tr$>");var a,n,r,o,c,i,l,s,d,u,y}).join(""),"break"}document.querySelectorAll('[data-parent="'.concat(f.fid,'"]')).forEach(function(e){e.style.display=""})}return t.classList.toggle("toggle-expanded"),"break"}())break}},!1)});
//# sourceMappingURL=main.js.map
