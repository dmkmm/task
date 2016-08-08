(function()
{
	'use strict';

	/*
	* Require js global config
	*/
	require.config({

		// Base path of application
		baseUrl: '/app',

		// Required paths
		paths: {
			'angular': 						'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min',
			'angular.animate': 			'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-animate.min',
			'angular.ui.router': 		'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min',

			'jquery': 'https://code.jquery.com/jquery-2.2.4.min',
			'bootstrap': 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',

			'app.provider.auth': 'providers/auth.provider',
			'app.provider.dynamicController': 'providers/dynamicController.provider',

			'app.directive.formatMoney': 'directives/formatMoney.directive',
			'app.directive.formatPhone': 'directives/formatPhone.directive',
			'app.directive.tabindexAuto': 'directives/tabindexAuto.directive'
		},

		// Export angular to global scope
		shim: {
			'angular': {
				exports: 'angular'
			},
			'angular.animate': ['angular'],
			'angular.ui.router': ['angular', 'angular.animate'],

			'app.run': ['app.provider.dynamicController', 'app.provider.auth', 'app.directive.formatMoney', 'app.directive.formatPhone', 'app.directive.tabindexAuto'],

			'bootstrap': ['jquery']
		},

		// Run application
		deps: ['app.run', 'bootstrap']
	});

})();
