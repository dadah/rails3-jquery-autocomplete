/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete">
*
* Optionally, you can use a jQuery selector to specify a field that can
* be updated with the element id whenever you find a matching value
*
*   Example:
*       <input type="text" data-autocomplete="/url/to/autocomplete" data-id-element="#id_field">
*/
(function(e){var t=null;e.fn.railsAutocomplete=function(){var t=!1;return typeof arguments[0]=="function"&&(t=arguments[0]),this.live("focus",function(){this.railsAutoCompleter||(this.railsAutoCompleter=new e.railsAutocomplete(this,t))})},e.railsAutocomplete=function(e,t){_e=e,this.init(_e,t)},e.railsAutocomplete.fn=e.railsAutocomplete.prototype={railsAutocomplete:"0.0.1"},e.railsAutocomplete.fn.extend=e.railsAutocomplete.extend=e.extend,e.railsAutocomplete.fn.extend({init:function(t,n){function r(e){return e.split(t.delimiter)}function i(e){return r(e).pop().replace(/^\s+/,"")}t.delimiter=e(t).attr("data-delimiter")||null,n?t.handleEmptyResponse=n:t.handleEmptyResponse=function(){return!1},e(t).autocomplete({minLength:0,source:function(n,r){e.getJSON(e(t).attr("data-autocomplete"),{term:i(n.term)},function(){if(e.isEmptyObject(arguments[0]))return t.handleEmptyResponse();e(arguments[0]).each(function(n,r){var i={};i[r.id]=r,e(t).data(i)}),r.apply(null,arguments)})},search:function(){var e=i(this.value)},focus:function(){return!1},select:function(n,i){var s=r(this.value);s.pop(),s.push(i.item.value);if(t.delimiter!=null)s.push(""),this.value=s.join(t.delimiter);else{this.value=s.join(""),e(this).attr("data-id-element")&&e(e(this).attr("data-id-element")).val(i.item.id);if(e(this).attr("data-update-elements")){var o=e(this).data(i.item.id.toString()),u=e.parseJSON(e(this).attr("data-update-elements"));for(var a in u)e(u[a]).val(o[a])}}var f=this.value;return e(this).bind("keyup.clearId",function(){e(this).val().trim()!=f.trim()&&(e(e(this).attr("data-id-element")).val(""),e(this).unbind("keyup.clearId"))}),e(this).trigger("railsAutocomplete.select",i),!1}})}})})(jQuery);