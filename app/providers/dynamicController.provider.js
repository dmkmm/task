define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.provider('dynamicController', dynamicControllerProvider);

		function dynamicControllerProvider($controllerProvider)
		{
			var self = this;

			this.$get = angular.noop;

			this.resolve = function(controllers)
			{
				return function ($q, $rootScope)
				{
					var dependencies = [];

					controllers.forEach(function(controllerName, index){
						dependencies.push('/app/' + controllerName.replace('.', '/') + '/controller.js');
					});

					return dependenciesResolver($q, $rootScope, dependencies);
				};
			}

			/**
			* Dymamically load required dependencies
			*/
			function dependenciesResolver($q, $rootScope, dependencies)
			{
				var defer = $q.defer();

				require(dependencies, function()
				{

					$rootScope.$apply(function(){
						angular.module(self.constructor.$$moduleName)._invokeQueue.forEach(function(call, index)
						{
							if(call[0] == "$controllerProvider" && call[1] == "register")
							{
				            $controllerProvider.register(call[2][0], call[2][1]);
				         }
						});

						defer.resolve();
					});

				});

				return defer.promise;
			}
		}

	}
);
