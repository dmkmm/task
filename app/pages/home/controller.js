define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.controller('HomeController', HomeController);

		function HomeController($scope, Auth)
		{
			var ct = this;

			ct.userName = Auth.getUserName();

			ct.inputs = {
				first: {
					value: '',
					weight: 1.0
				},
				second: {
					value: '',
					weight: 1.0
				},
				third: {
					value: '',
					weight: 1.0
				},
				result: 0
			};

			ct.onChangeInput = function()
			{
				// Calculate result
				ct.inputs.result =
					parseFloat(ct.inputs.first.value?ct.inputs.first.value:0) +
					parseFloat(ct.inputs.second.value?ct.inputs.second.value:0) +
					parseFloat(ct.inputs.third.value?ct.inputs.third.value:0);

				// Refresh weights
				if(parseFloat(ct.inputs.result) == 0.0)
				{
					ct.inputs.first.weight = ct.inputs.second.weight = ct.inputs.third.weight = 0;
				}
				ct.inputs.first.weight = ct.inputs.first.value / ct.inputs.result;
				ct.inputs.second.weight = ct.inputs.second.value / ct.inputs.result;
				ct.inputs.third.weight = ct.inputs.third.value / ct.inputs.result;
			}

			ct.onChangeResult = function()
			{
				if(parseFloat(ct.inputs.result) == 0.0)
				{
					ct.inputs.first.value = ct.inputs.second.value = ct.inputs.third.value = 0;
					return;
				}

				ct.inputs.first.value = ct.inputs.result * ct.inputs.first.weight;
				ct.inputs.second.value = ct.inputs.result * ct.inputs.second.weight;
				ct.inputs.third.value = ct.inputs.result * ct.inputs.third.weight;
			}
		}
	}
);
