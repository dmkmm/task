define(
	['app.module'],

	function()
	{
		'use strict';
		angular
			.module('frontend')
			.directive('formatMoney', FormatMoney);

		function FormatMoney()
		{
			return {
				require: 'ngModel',
				restrict: 'A',
				link: function(scope, element, attrs, ctrl)
				{
					var format = function(value)
					{
						var formatted = '';

						if(value)
						{
							// Prevent zero-s in begining
							if(parseInt(value) == 0)
							{
								ctrl.$setViewValue('');
								ctrl.$render();
								return;
							}

							for (var i = value.length - 1, j = 0; i >= 0; i--, j++)
							{
								var separator = '';
								if((j + 1) % 3 == 0 && i != 0)
								separator = ',';

								formatted = separator + value[i] + formatted;
							}

							formatted = '$' + formatted;
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
			};
		}
	}
);
