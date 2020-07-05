"use strict";function ownKeys(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(a),!0).forEach(function(t){_defineProperty(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ownKeys(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function _defineProperty(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _arrayWithoutHoles(t){if(Array.isArray(t))return _arrayLikeToArray(t)}function _toArray(t){return _arrayWithHoles(t)||_iterableToArray(t)||_unsupportedIterableToArray(t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(a):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function _iterableToArray(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function _arrayWithHoles(t){if(Array.isArray(t))return t}var utils=function(){var T={root:$("#modal"),dialog:$("#modal-dialog"),title:$("#modal-title"),btn:"",closeBtn:$("#modal-title + .close"),body:$("#modal-body"),footer:$("#modal-footer"),data:{},action:function(){},show:function(){},shown:function(){},hide:function(){},hidden:function(){},loading:function(t,e){var a=0<arguments.length&&void 0!==t?t:'<i class="fas fa-sync fa-spin mr-2"></i>Memproses...',n=!(1<arguments.length&&void 0!==e)||e;!1===a?($("#modal-btn").html(T.btn).prop("disabled",!1),$('[data-dismiss="modal"]').prop("disabled",!1)):($("#modal-btn").html(a).prop("disabled",!0),$('[data-dismiss="modal"]').prop("disabled",!0),n&&T.error(!1))},error:function(t,e){var a=0<arguments.length&&void 0!==t&&t,n=!(1<arguments.length&&void 0!==e)||e;!1===a?$("#modal-error").hide():($("#modal-error").html('<div class="px-3 py-2"><i class="fas fa-exclamation-triangle mr-2"></i>'.concat(a,"</div>")).slideDown(),n&&T.loading(!1))}};return T.root.modal("hide").on("show.bs.modal",function(t){T.closeBtn.prop("disabled",!1),$('[data-toggle="tooltip"]').tooltip("hide"),$.fn.selectpicker&&T.root.find(".selectpicker").selectpicker("render"),$.fn.scrollbar&&T.root.find(".scrollbar-outer").scrollbar(),T.show()}).on("shown.bs.modal",function(t){T.shown()}).on("hide.bs.modal",function(t){T.hide()}).on("hidden.bs.modal",function(t){T.hidden()}),{modal:{init:function(t){var e=t.title,a=void 0===e?"":e,n=t.body,o=t.btnLabel,r=void 0===o?"Ok":o,c=t.btnClass,i=void 0===c?"btn-primary":c,l=t.btnDisabled,s=void 0!==l&&l,d=t.btnCloseLabel,u=void 0===d?"Batal":d,m=t.btnCloseClass,p=void 0===m?"btn-primary btn-border":m,f=t.data,b=void 0===f?{}:f,y=t.dialogClass,h=void 0===y?"":y,g=t.backdrop,v=void 0===g||g,k=t.action,_=void 0===k?null:k,w=t.show,E=void 0===w?null:w,x=t.shown,L=void 0===x?null:x,I=t.hide,S=void 0===I?null:I,j=t.hidden,A=void 0===j?null:j;T.data=b,T.btn=r,T.action="function"==typeof _?_:function(){},T.show="function"==typeof E?E:function(){},T.shown="function"==typeof L?L:function(){},T.hide="function"==typeof S?S:function(){},T.hidden="function"==typeof A?A:function(){};var $='data-dismiss="modal"';return"string"==typeof _?$='onclick="'.concat(_,'"'):"function"==typeof _&&($='onclick="utils.modal.action()"'),T.dialog.attr("class","modal-dialog").addClass(h),T.title.html(a),T.body.html(n),T.footer.html('\n\t\t\t<button type="button" class="btn '.concat(p,'" data-dismiss="modal">').concat(u,'</button>\n\t\t\t<button type="button" id="modal-btn" ').concat($,' class="btn ').concat(i,'" ').concat(s?"disabled":"",">").concat(r,"</button>\n\t\t")),T.root.data("bs.modal")._config.backdrop=v,T.error(),T.root.modal("show").trigger("show.bs.modal")},data:function(){return T.data},action:function(){return T.action()},hide:function(){T.root.modal("hide")},loading:T.loading,error:T.error}}}(),dbg=function(t,e){var a=0<arguments.length&&void 0!==t?t:"!",n=1<arguments.length&&void 0!==e&&e;"undefined"!=typeof DEV&&DEV&&(!1===n?console.info(a):console.info("%c"+a,"color: ".concat("number"==typeof n?["#00ff7f","#6495ed","#ff0","#fa8072","#ffa500","#f00"][n]:n)))};$(function(){console.log("© Muhammad Afifudin, 2020"),console.log("%cVersion: "+$('script[src*="assets/js"]').prop("src").split("?v=")[1],"color: #6495ed"),$("body").tooltip({selector:'[data-toggle="tooltip"]',html:!0})}),$.fn.notifyDefaults&&$.notifyDefaults({placement:{from:"bottom"},animate:{enter:"animated fadeInUp",exit:"animated fadeOutDown"}}),document.addEventListener("DOMContentLoaded",function(){var f={search:document.getElementById("search"),search_tooltip:$("#search-form-tooltip"),result_loading:document.getElementById("result-loading"),result_summary:document.getElementById("result-summary"),result_table:document.getElementById("result-table"),result_table_body:document.getElementById("result-table-body")},b=[];dbg("Requesting zipped CSV...\nassets/csv/"+FILE,2),new JSZip.external.Promise(function(a,n){JSZipUtils.getBinaryContent("assets/csv/".concat(FILE,".zip"),function(t,e){t?n(t):a(e)})}).then(JSZip.loadAsync).then(function(t){return dbg(t),t.file("".concat(FILE,".csv")).async("string")}).then(function(t){dbg("Success read ".concat(FILE,".csv"),0);function i(t,e){return e[0]?[t].concat(e).join(",").replace(/"/g,""):t}var l=-1,s=-1,d=-1;t.split("\n").forEach(function(t){var e=_toArray(t.split(",")),a=e[0],n=e[1],o=e.slice(2);if(2===a.length)b.push({id:a,parent_id:"",full_id:a,name:n.replace("Dki J","DKI J").replace("Di Y","DI Y"),name_lc:n.toLowerCase(),lv:0,ch:[]}),l++,d=s=-1;else if(4===a.length){n=i(n,o);var r=a.substr(2,2);b[l].ch.push({kota:70<r,id:r,parent_id:a.substr(0,2),full_id:a,name:n,name_lc:n.toLowerCase(),lv:1,ch:[]}),s++,d=-1}else if(7===a.length)n=i(n,o),b[l].ch[s].ch.push({id:a.substr(4,3),parent_id:a.substr(0,4),full_id:a,name:n,name_lc:n.toLowerCase(),lv:2,ch:[]}),d++;else if(10===a.length){n=i(n,o);var c=a.substr(2,2);b[l].ch[s].ch[d].ch.push({kota:70<c,id:a.substr(7,3),parent_id:a.substr(0,7),full_id:a,name:n,name_lc:n.toLowerCase(),lv:3})}}),dbg(b),document.getElementById("loading").style.display="none",document.getElementById("search-form-wrapper-outer").className="search-form-wrapper-outer animated animated-1s bounceIn",document.getElementById("explore-wrapper").className="explore-wrapper animated animated-1s bounceInUp",document.getElementById("about-wrapper").className="about-wrapper animated animated-1s bounceInUp";var e=new URL(location.href).searchParams;e.get("q")?(f.search.value=e.get("q"),document.getElementById("search-btn").click()):e.get("explore")?document.getElementById("explore-btn").click():f.search.focus()},function(t){console.error(t),document.getElementById("loading").innerHTML='<div class="animated animated-1s swing"><i class="icon-exclamation mr-35"></i>Terjadi kesalahan :(</div><div class="animated fast fadeInUp delay-1s fz-14 fw-4 mt-45 px-a"><div class="fz-20">Silakan coba refresh halaman ini.</div>Jika masih terjadi masalah, hubungi developer situs ini melalui <a href="https://github.com/afiiif/kode-wilayah/issues" class="text-warning">GitHub</a>.</div>',document.getElementsByTagName("header")[0].className="header bg-danger-gradient pb-6"});var y={lv:"3",pr:[],dark:!1,prefix:!1};"undefined"!=typeof Storage&&(localStorage.getItem("mfd-dark")&&(document.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124"),y.dark=!0),localStorage.getItem("mfd-prefix")&&(f.result_table_body.classList.add("with-prefix"),y.prefix=!0));var h=new Mark(f.result_table_body);f.search.addEventListener("keypress",function(t){f.search_tooltip.tooltip("hide"),13===t.which&&(window.scrollTo(0,0),o(f.search.value))},!1),f.search.addEventListener("blur",function(){f.search_tooltip.tooltip("hide")},!1),document.getElementById("search-btn").addEventListener("click",function(){window.scrollTo(0,0),o(f.search.value)},!1);var o=function(u){var m=_toConsumableArray(new Set(u.trim().toLowerCase().split(/[\s,]+/))).filter(function(t){return t.length}),p=1===m.length&&/^\d{2,10}$/.test(m[0]);dbg("Search: "+u,0),dbg(m),m.filter(function(t){return 2<t.length}).length||1<m.filter(function(t){return 1<t.length}).length||3<m.length||p?(dbg("Good keyword :)",1),setTimeout(function(){var t=$.extend(!0,[],b),r={pr:0,kb:0,kc:0,ds:0};1<m.length&&m.every(function(t){return/^\d{2,7}$/.test(t)})&&(m=[m.join("")],p=!0),t.forEach(function(o){if(p&&o.full_id==m[0])o.display=1,o.ch.forEach(function(t){return t.display=0}),r.pr++;else{if(y.pr.length&&!y.pr.includes(o.id))return!1;m.every(function(t){return o.name_lc.includes(t)})&&(o.display=0,o.match=1,r.pr++),o.ch.forEach(function(n){p&&n.full_id==m[0]?(o.display=1,n.display=1,n.ch.forEach(function(t){return t.display=0}),r.kb++):(m.every(function(t){return n.name_lc.includes(t)})&&(o.display=1,n.display=0,n.match=1,r.kb++),1<y.lv&&n.ch.forEach(function(a){p&&a.full_id==m[0]?(o.display=1,n.display=1,a.display=1,a.ch.forEach(function(t){return t.display=0}),r.kc++):(m.every(function(t){return a.name_lc.includes(t)})&&(o.display=1,n.display=1,a.display=0,a.match=1,r.kc++),2<y.lv&&a.ch.forEach(function(e){p&&e.full_id==m[0]?(o.display=1,n.display=1,a.display=1,e.display=0,r.ds++):m.every(function(t){return e.name_lc.includes(t)})&&(o.display=1,n.display=1,a.display=1,e.display=0,e.match=1,r.ds++)}))}))})}});function e(t){var e=t.display,a=t.full_id,n=t.parent_id,o=t.id,r=t.name,c=t.lv,i=t.kota,l=t.match;return 0===e?"<tr".concat(i?' data-kota="1"':"",' class="lv-').concat(c,'" data-fid="').concat(a,'" data-parent="').concat(n,'"><td>').concat(n,"<b>").concat(o,"</b></td><td>").concat(r,"</td></tr$>"):1===e?"<tr".concat(i?' data-kota="1"':"",' class="lv-').concat(c," toggle toggle-expanded").concat(l?"":" unmark",'" data-fid="').concat(a,'" data-parent="').concat(n,'"><td>').concat(n,"<b>").concat(o,"</b></td><td>").concat(r,"</td></tr$>"):""}var a="";t.forEach(function(t){a+=e(t),t.ch.forEach(function(t){a+=e(t),t.ch.forEach(function(t){a+=e(t),t.ch.forEach(function(t){a+=e(t)})})})});function n(t){return'<b class="fw-6">'.concat(t,"</b>")}var o=r.pr,c=r.kb,i=r.kc,l=r.ds;if(o+c+i+l){var s=1<y.lv?', <span class="'.concat(i?"text-info":"",'">').concat(n(i)," kecamatan</span>"):"",d=2<y.lv?', <span class="'.concat(l?"text-info":"",'">').concat(n(l)," desa/kelurahan</span>"):"";f.search.blur(),f.result_summary.innerHTML=p?'<div>Menampilkan hasil pencarian wilayah dengan kode <span class="text-info">'.concat(n(u),"</span></div>"):'<div class="text-muted">Menemukan <span class="'.concat(o?"text-info":"",'">').concat(n(o),' provinsi</span>, <span class="').concat(c?"text-info":"",'">').concat(n(c)," kabupaten/kota</span>").concat(s).concat(d,".</div>"),f.result_table_body.innerHTML=a,f.result_table.style.display="",p||m.forEach(function(t){return h.mark(t)})}else f.result_summary.innerHTML='<div class="text-danger text-center pt-45 pt-sm-5 pl-md-55"><div class="mb-4 fz-72 fz-sm-80"><span class="fa-stack animated animated-1s swing"><i class="fas icon-ban fa-stack-2x op-3"></i><i class="fas fa-map-marker-alt fa-stack-1x fz-80 fz-sm-96"></i></span></div>Tidak ada hasil untuk pencarian '.concat(n(u),"</div>");f.result_loading.style.display="none",f.result_summary.style.display=""},document.body.classList.contains("search-active")?200:600),f.result_table.style.display="none",f.result_summary.style.display="none",f.result_loading.style.display="",document.body.classList.add("search-active"),$("#result").slideDown(),f.search_tooltip.tooltip("hide")):(u&&(dbg("Bad keyword :(",1),f.search_tooltip.tooltip("show")),f.search.focus())};document.getElementById("setting-btn").addEventListener("click",function(){f.search_tooltip.tooltip("hide");var t=y.lv,e=y.pr,a=y.dark,n=y.prefix;utils.modal.init({title:"Pengaturan",body:'\n\t\t\t\t\t<div class="fw-6 mb-2">Cari sampai tingkat:</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">\n\t\t\t\t\t\t\t<input type="radio" id="setting-lv-1" name="setting-lv" value="1" class="custom-control-input"'.concat("1"===t?" checked":"",'>\n\t\t\t\t\t\t\t<label class="custom-control-label d-block cur-p" for="setting-lv-1">Kabupaten/Kota</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">\n\t\t\t\t\t\t\t<input type="radio" id="setting-lv-2" name="setting-lv" value="2" class="custom-control-input"').concat("2"===t?" checked":"",'>\n\t\t\t\t\t\t\t<label class="custom-control-label d-block cur-p" for="setting-lv-2">Kecamatan</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="custom-control custom-radio custom-control-inline d-block d-sm-inline-flex">\n\t\t\t\t\t\t\t<input type="radio" id="setting-lv-3" name="setting-lv" value="3" class="custom-control-input"').concat("3"===t?" checked":"",'>\n\t\t\t\t\t\t\t<label class="custom-control-label d-block cur-p" for="setting-lv-3">Desa/Kelurahan</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="fw-6 mt-4 mb-2">Cari di:</div>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<select id="setting-pr" class="selectpicker" title="Semua Provinsi" data-width="100%" data-live-search="true" multiple>').concat(b.map(function(t){return'<option value="'.concat(t.id,'" data-subtext="(').concat(t.id,')"').concat(e.includes(t.id)?" selected":"",">").concat(t.name,"</option>")}).join(""),'</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="mx--3 mt-3 mb--3 py-3 border-top" id="dark-mode-wrapper">\n\t\t\t\t\t\t<div class="px-3">\n\t\t\t\t\t\t\t<div class="fw-6 mb-2">Tampilan:</div>\n\t\t\t\t\t\t\t<div class="custom-control custom-switch">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input" id="dark-mode-toggle"').concat(a?" checked":"",'>\n\t\t\t\t\t\t\t\t<label class="custom-control-label cur-p d-block" for="dark-mode-toggle">Mode gelap</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="custom-control custom-switch">\n\t\t\t\t\t\t\t\t<input type="checkbox" class="custom-control-input" id="prefix-toggle"').concat(n?" checked":"",'>\n\t\t\t\t\t\t\t\t<label class="custom-control-label cur-p d-block" for="prefix-toggle">Tampilkan prefix<div class="fz-12 fw-3">(Misal: "Kayong Utara" ditampilkan dengan "<span class="fw-4">Kabupaten</span> Kayong Utara")</div></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t'),btnLabel:"Simpan",show:function(){document.getElementById("dark-mode-toggle").addEventListener("change",function(t){this.checked?(document.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124")):(document.body.classList.remove("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#1572e8"))},!1)},action:function(){!function(t){var e=0<arguments.length&&void 0!==t&&t;y=e||{lv:"3",pr:[],dark:!1,prefix:!1},document.getElementById("setting-btn").classList["3"===y.lv&&0===y.pr.length||34===y.pr.length?"remove":"add"]("text-success")}({lv:$('[name="setting-lv"]:checked').val(),pr:$("#setting-pr").val(),dark:document.getElementById("dark-mode-toggle").checked,prefix:document.getElementById("prefix-toggle").checked}),utils.modal.hide(),dbg(y)},hide:function(){if(""===f.result_summary.style.display&&o(f.search.value),y.dark){if(document.body.classList.add("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#202124"),"undefined"!=typeof Storage)try{localStorage.setItem("mfd-dark",1)}catch(t){dbg("Cannot set local storage")}}else document.body.classList.remove("dark-mode"),document.querySelector('meta[name="theme-color"]').setAttribute("content","#1572e8"),"undefined"!=typeof Storage&&localStorage.removeItem("mfd-dark");if(y.prefix){if(f.result_table_body.classList.add("with-prefix"),"undefined"!=typeof Storage)try{localStorage.setItem("mfd-prefix",1)}catch(t){dbg("Cannot set local storage")}}else f.result_table_body.classList.remove("with-prefix"),"undefined"!=typeof Storage&&localStorage.removeItem("mfd-prefix")}})},!1),document.getElementById("explore-btn").addEventListener("click",function(){window.scrollTo(0,0),f.search.value="",f.result_summary.style.display="none",f.result_table.style.display="none",f.result_loading.style.display="",f.search_tooltip.tooltip("hide"),setTimeout(function(){f.result_table_body.innerHTML=b.map(function(t,e){return'<tr class="lv-0 toggle toggle-explore" data-i="'.concat(e,'" data-j="" data-k="" data-fid="').concat(t.full_id,'"><td><b>').concat(t.id,"</b></td><td>").concat(t.name,"</td></tr>")}).join(""),f.result_loading.style.display="none",f.result_table.style.display=""},document.body.classList.contains("search-active")?200:600),document.body.classList.add("search-active"),$("#result").slideDown()},!1),f.result_table_body.addEventListener("click",function(t){for(var e=t.target;e&&e!=this;e=e.parentNode){if(e.matches("tr"))if("break"===function(){var p=e.dataset;if(dbg(p),e.classList.contains("toggle-expanded"))document.querySelectorAll('[data-parent^="'.concat(p.fid,'"]')).forEach(function(t){t.classList.remove("toggle-expanded"),t.style.display="none"});else{if(e.classList.contains("toggle-explore")){e.classList.remove("toggle-explore"),e.classList.add("toggle-expanded");var t=[];t=p.k.length?b[p.i].ch[p.j].ch[p.k].ch:p.j.length?b[p.i].ch[p.j].ch:b[p.i].ch;return e.outerHTML+=t.map(function(t,e){return a=t,n=p.j?_objectSpread({},p,{k:e}):_objectSpread({},p,{j:e}),o=a.full_id,r=a.parent_id,c=a.id,i=a.name,l=a.lv,s=a.kota,d=n.i,u=n.j,m=n.k,"<tr".concat(s?' data-kota="1"':"",' class="lv-').concat(l).concat(3===l?"":' toggle toggle-explore" data-i="'.concat(d,'" data-j="').concat(u,'" data-k="').concat(m),'" data-fid="').concat(o,'" data-parent="').concat(r,'"><td>').concat(r,"<b>").concat(c,"</b></td><td>").concat(i,"</td></tr$>");var a,n,o,r,c,i,l,s,d,u,m}).join(""),"break"}document.querySelectorAll('[data-parent="'.concat(p.fid,'"]')).forEach(function(t){t.style.display=""})}return e.classList.toggle("toggle-expanded"),"break"}())break}},!1),f.search_tooltip.tooltip({title:"Gunakan kata kunci yang lebih spesifik",trigger:"manual",placement:"bottom"}),Array.from(document.getElementsByClassName("about-btn")).forEach(function(t){t.addEventListener("click",function(){utils.modal.init({title:"Tentang",body:document.getElementById("about").innerHTML,btnCloseLabel:"Tutup",btnClass:"d-none"})},!1)}),document.addEventListener("keypress",function(t){t.target!==f.search&&"f"===t.key.toLocaleLowerCase()&&f.search.select()})});
//# sourceMappingURL=main.js.map
