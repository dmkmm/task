define(
	['app.module'],

	function()
	{
		'use strict';
		angular
			.module('frontend')
			.directive('formatPhone', FormatPhone);

		function FormatPhone()
		{
			return {
				require: 'ngModel',
				restrict: 'A',
				link: function(scope, element, attrs, ctrl)
				{
					var format = function(value)
					{
						var formatted = '';

						if(value.length >= 3)
						{
							formatted += '(' + value.substr(0,3) + ') ' + value.substr(3,3);

							if(value.length > 6)
							{
								formatted += '-' + value.substr(6, 4);
							}
						}
						else
						{
							formatted = value;
						}

						ctrl.$setViewValue(formatted);
						ctrl.$render();
					}

					element.on('keydown', function(e)
					{
						e.preventDefault();

						// Only numeric and backspace keyCodes allowed
						if((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8)
							return;

						var currentNumbers = ctrl.$modelValue?ctrl.$modelValue.replace(/\D/g, ''):'';

						if(e.keyCode >= 48 && e.keyCode <= 57)
						{
							format(currentNumbers + e.key);
						}

						if(e.keyCode == 8)
						{
							format(currentNumbers.substr(0, currentNumbers.length - 1));
						}
					});
				}
			}
		}
	}
);
