define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.controller('HeaderController', HeaderController);

		function HeaderController($scope, $state, Auth)
		{
			var ct = this;

			ct.userName = Auth.getUserName();

			ct.isState = function(stateName)
			{
				return $state.includes(stateName);
			}

			ct.logout = function()
			{
				Auth.clear();
				$state.go('entrance');
			}
		}
	}
);
