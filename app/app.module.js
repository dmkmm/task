define(
	['angular', 'angular.animate', 'angular.ui.router'],

	function()
	{
		'use strict';

		/**
       * Main module of the Application
       */
		angular.module('frontend', [
			'ui.router',
			'ngAnimate'
		]);
	}
);
