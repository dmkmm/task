define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.controller('ItemsController', ItemsController);

		function ItemsController($scope, $http)
		{
			var ct = this;

			ct.items = [];

			$http.get('http://beta.json-generator.com/api/json/get/4J328weF-')
			.then(function(response){
				ct.items = response.data;
			});
		}
	}
);
