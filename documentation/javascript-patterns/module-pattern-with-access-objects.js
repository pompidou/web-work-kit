/**
 *	Provides privacy and a simple way to organize your code.
 *
 *	Usage:	Module.variable = 'example';
 *			Module.exampleFunction();
 */
(function() {

	'use strict';

	window.Module = (function() {

		var privates 	= {};
		var publics		= {};


		privates.variable = undefined;
		publics.variable = undefined;


		privates.exampleFuction = function() {
			// do something...
		};

		publics.exampleFunction = function() {
			privates.var = 'example';
			privates.exampleFunction();
			// do something useful...
		};


		return publics;

	}());

}());
