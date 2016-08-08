define(
	['app.module', 'app.provider.dynamicController', 'app.provider.auth'],

	function ()
	{
		'use strict';

		angular
			.module('frontend')
			.config(routeConfig);

		function routeConfig($locationProvider, $urlRouterProvider, $stateProvider, dynamicControllerProvider, AuthProvider)
		{
			$locationProvider.html5Mode(true);

			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('entrance', {
					url: '/entrance',
					views: {
						'main@': {
							templateUrl: '/app/pages/entrance/index.html',
							controller: 'EntranceController as ct'
						}
					},
					resolve: {
						loadedControllers: dynamicControllerProvider.resolve(['pages.entrance']),
					}
				})
				.state('app', {
					abstract: true,
					views: {
						'main@': {
							templateUrl: '/app/layout/index.html',
						},
						'header@app': {
							templateUrl: '/app/layout/header/index.html',
							controller: 'HeaderController as ct'
						}
					},
					resolve: {
						user:  AuthProvider.resolve(),
						loadedControllers: dynamicControllerProvider.resolve(['layout.header']),
					}
				})
				.state('app.home', {
					url: '/',
					views: {
						'content@app':{
							templateUrl: '/app/pages/home/index.html',
							controller: 'HomeController as ct'
						}
					},
					resolve: {
						loadedControllers: dynamicControllerProvider.resolve(['pages.home'])
					}
				})
				.state('app.items', {
					url: '/items',
					views: {
						'content@app':{
							templateUrl: '/app/pages/items/index.html',
							controller: 'ItemsController as ct'
						}
					},
					resolve: {
						loadedControllers: dynamicControllerProvider.resolve(['pages.items'])
					}
				})
		}
});
