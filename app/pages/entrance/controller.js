define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.controller('EntranceController', EntranceController);

		function EntranceController($scope, $state, Auth)
		{
			var ct = this;

			ct.onSubmit = function()
			{
				Auth.setUserName(ct.userName);
				ct.userName = null;
				$state.go('app.home');
			}
		}
	}
);
