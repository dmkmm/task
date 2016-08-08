define(
	['app.module'],

	function()
	{
		'use strict';

		angular
			.module('frontend')
			.provider('Auth', authProvider);

		function authProvider()
		{
			var self = this;

			this.$get = function()
			{
				// Enclose stuff not available for controllers
				return {
					setUserName: 	self.setUserName,
					getUserName: 	self.getUserName,
					clear: 			self.clear
				};
			};

			var userName = localStorage.getItem('userName');

			this.resolve = function()
			{
				return function($q, $state, $timeout)
				{
					if(!userName)
					{
						$timeout(function(){ $state.go('entrance'); });
						$q.reject();
					}
				};
			}

			/**
			 * In current case just create closure for userName variable
			 * and use local storage instead User Auth checking. (with JWT for example) ;)
			 */

			this.setUserName = function(newUserName)
			{
				userName = newUserName;
				localStorage.setItem('userName', userName);
			}

			this.getUserName = function()
			{
				return userName;
			}

			this.clear = function()
			{
				userName = null;
				localStorage.removeItem('userName');
			}
		}

	}
);
