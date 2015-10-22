/**
 *	Provides privacy and a simple way to organize your code.
 *
 *	Usage:	Module.publicVar = 'example';
 *			Module.publicFunction();
 *
 *	Inspiration: http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 */
(function() {

	'use strict';

	window.Module = (function() {

		var privateVar;
		var publicVar;


		var privateFunction = function() {
			// do something...
		};

		var publicFunction = function() {
			privateVar = 'example';
			privateFunction();
			// do something useful...
		};

		// module code...


		return {
			publicVar: publicVar,
			publicFunction: publicFunction
		};

	}());

}());
