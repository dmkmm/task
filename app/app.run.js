define(
	['app.config', 'app.route'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.run(runApp);

		function runApp()
		{
			// Stuff when angular bootstrapped and app will run
		}

		/**
		 * Manually bootstrap angular application
		 */
		angular.element(document).ready(function()
		{
			angular.bootstrap(document, ['frontend']);
		});
	}
);
