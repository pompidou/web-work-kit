/**
 *	Usage:			$('.my-elements').pluginFunction();
 *
 *	Inspiration:	http://engineering.yp.com/post/jquery-oo-plugins
 */
(function($){

	'use strict';

	var PluginModule = function($el, options) {
		var defaultOptions = {
			optionOne: 'example'
		};

		var init = function() {
			// start things off...
		};
		// module code...

		return {
			defaultOptions: defaultOptions,
			init: init
		};
	};

	$.fn.pluginFunction = function(options) {
		var options = $.extend({}, PluginModule.defaultOptions, options);
		var $elements = $(this);

		$elements.each(function() {
			var $el = $(this);
			if (!$el.data('plugin-name')) { // element doesn't have a plugin instance yet
				var instance = new PluginModule($el, options);
				instance.init();
				$el.data('plugin-name', instance);
			}
		});

		return $elements;
	};

})(jQuery);
