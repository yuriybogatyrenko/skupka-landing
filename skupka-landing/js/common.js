!function(){function e(e){var t=this;t.doc=e,t.window=window,t.bootstrap()}e.prototype.bootstrap=function(){var e=this;e.maskInit(".js-input-mask"),e.modal()},e.prototype.appLoad=function(e,t){var o=this;switch(e){case"loading":"loading"===o.doc.readyState&&t();break;case"dom":o.doc.onreadystatechange=function(){"complete"===o.doc.readyState&&t()};break;case"full":o.window.onload=function(e){t(e)};break;default:t()}},e.prototype.initSwitcher=function(){var e=this,t=e.doc.querySelectorAll("[data-switcher]");if(t&&t.length>0)for(var o=0;o<t.length;o++)for(var a=t[o],n=e.options(a.dataset.switcher),p=a.children,s=e.doc.querySelector('[data-switcher-target="'+n.target+'"]').children,r=0;r<p.length;r++){var c=p[r],l=a.children,i=s[r];if(c.classList.contains("active")){for(var u=0;u<l.length;u++)l[u].classList.remove("active"),s[u].classList.remove("active");c.classList.add("active"),i.classList.add("active")}c.children[0].addEventListener("click",function(e,t,o,a){return function(n){if(n.preventDefault(),!e.classList.contains("active")){for(var p=0;p<l.length;p++)o[p].classList.remove("active"),a[p].classList.remove("active");e.classList.add("active"),t.classList.add("active")}}}(c,i,l,s))}},e.prototype.str2json=function(e,t){try{return t?JSON.parse(e.replace(/([\$\w]+)\s*:/g,function(e,t){return'"'+t+'":'}).replace(/'([^']+)'/g,function(e,t){return'"'+t+'"'})):new Function("","var json = "+e+"; return JSON.parse(JSON.stringify(json));")()}catch(e){return!1}},e.prototype.options=function(e){var t=this;if("string"!=typeof e)return e;e.indexOf(":")!=-1&&"}"!=e.trim().substr(-1)&&(e="{"+e+"}");var o=e?e.indexOf("{"):-1,a={};if(o!=-1)try{a=t.str2json(e.substr(o))}catch(e){}return a},e.prototype.popups=function(e){var t={reachElementClass:".js-popup",closePopupClass:".js-close-popup",currentElementClass:".js-open-popup",changePopupClass:".js-change-popup"};e=$.extend({},e,t);var o={reachPopups:$(e.reachElementClass),bodyEl:$("body"),topPanelEl:$(".top-panel-wrapper"),htmlEl:$("html"),closePopupEl:$(e.closePopupClass),openPopupEl:$(e.currentElementClass),changePopupEl:$(e.changePopupClass),bodyPos:0};return o.openPopup=function(e){o.reachPopups.filter('[data-popup="'+e+'"]').addClass("opened"),o.bodyEl.css("overflow-y","scroll"),o.topPanelEl.css("padding-right",scrollSettings.width),o.htmlEl.addClass("popup-opened")},o.closePopup=function(e){o.reachPopups.filter('[data-popup="'+e+'"]').removeClass("opened"),setTimeout(function(){o.bodyEl.removeAttr("style"),o.htmlEl.removeClass("popup-opened"),o.topPanelEl.removeAttr("style")},500)},o.changePopup=function(e,t){o.reachPopups.filter('[data-popup="'+e+'"]').removeClass("opened"),o.reachPopups.filter('[data-popup="'+t+'"]').addClass("opened")},o.init=function(){o.bindings()},o.bindings=function(){o.openPopupEl.on("click",function(e){e.preventDefault();var t=$(this).attr("data-open-popup");o.openPopup(t)}),o.closePopupEl.on("click",function(t){var a;a=this.hasAttribute("data-close-popup")?$(this).attr("data-close-popup"):$(this).closest(e.reachElementClass).attr("data-popup"),o.closePopup(a)}),o.changePopupEl.on("click",function(e){var t=$(this).attr("data-closing-popup"),a=$(this).attr("data-opening-popup");o.changePopup(t,a)}),o.reachPopups.on("click",function(t){var a=$(t.target),n=e.reachElementClass.replace(".","");a.hasClass(n)&&o.closePopup($(t.target).attr("data-popup"))})},e&&o.init(),o},e.prototype.maskInit=function(e){$(e).mask("+7 (999) 999-99-99")},e.prototype.modal=function(){var e=this,t={};return t.init=function(){for(var o=e.doc.querySelectorAll(".popup-overlay"),a=0;a<o.length;a++)o[a].addEventListener("click",function(e){e.target.classList.contains("popup-overlay")&&t.closeModal()});for(var n=e.doc.querySelectorAll(".js-close-popup"),a=0;a<n.length;a++)n[a].addEventListener("click",function(e){var o=this.closest(".popup").getAttribute("data-popup");t.closeModal(o)});for(var p=e.doc.querySelectorAll(".js-open-popup"),a=0;a<p.length;a++)p[a].addEventListener("click",function(e){var o=this.getAttribute("data-popup-name");t.openModal(o)})},t.openModal=function(t){e.doc.querySelector(".popup-overlay").classList.add("opened");var o=e.doc.querySelector('[data-popup="'+t+'"]');o.classList.add("opened")},t.closeModal=function(t){if(e.doc.querySelector(".popup-overlay").classList.remove("opened"),t){var o=e.doc.querySelector('[data-popup="'+t+'"]');o.classList.remove("opened")}else for(var a=e.doc.querySelectorAll("[data-popup]"),n=0;n<a.length;n++)a[n].classList.remove("opened")},t.init(),t};var t=new e(document);t.appLoad("loading",function(){}),t.appLoad("dom",function(){t.initSwitcher()}),t.appLoad("full",function(e){function o(e){for(var t={},o={},a=!1,n=0;n<e.length;n++)if("submit"!==e[n].type&&"thumbnail"!==e[n].name&&""!==e[n].name){var p=e[n].name.toString(),s=e[n].value;if(p.indexOf("meta")!==-1){var r=p.split(".");a=!0,o[r[1]]=s}else t[p]=s;"checkbox"===e[n].type&&(e[n].checked===!0?t[p]=1:t[p]=0)}return a&&(t.meta=o),t}$("form").submit(function(e){console.log(t.openPopup());var a=$(this),n=e.target,p=o(n),s="./mail.php",r=t.modal();return""!==p.phone?$.post(s,p,function(e){console.log(e),1===e&&e&&(a.find("input[name='phone']").removeClass("error"),r.closeModal(),r.openModal("successfully"))}):a.find("input[name='phone']").addClass("error"),!1})})}();