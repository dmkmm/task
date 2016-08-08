define(
	['app.module'],

	function()
	{
		'use strict';
		angular
		.module('frontend')
		.directive('tabindexAuto', TabindexAuto);

		function TabindexAuto()
		{
			return {
				require: 'ngModel',
				restrict: 'A',
				link: function(scope, element, attrs, ctrl)
				{
					var getForm = function()
					{
						var lookup = element.parent();
						while(!lookup.is('form') && !lookup.is('body'))
						{
							lookup = lookup.parent();
						}

						return lookup;
					}

					var findNextInput = function()
					{
						var tabIndex = parseInt(attrs.tabindex);
						var form = getForm();
						if(form)
						{
							return form.find('[tabindex="' + (tabIndex + 1) + '"]')
						}
					}

					var findPreviousInput = function()
					{
						var tabIndex = parseInt(attrs.tabindex);
						var form = getForm();
						if(form)
						{
							return form.find('[tabindex="' + (tabIndex - 1) + '"]')
						}
					}

					element.on('keydown', function(e)
					{
						var value = ctrl.$modelValue?ctrl.$modelValue:'';

						if(value.length <= 1 && e.keyCode == 8)
						{
							var prev = findPreviousInput();
							if(prev.length > 0)
							{
								if(value.length > 0)
								{
									// Prevent from deleting char in new focused element
									e.preventDefault();

									// Clean current input
									ctrl.$setViewValue(null);
									ctrl.$render();
								}

								prev.focus();
							}
						}
					});

					// Not allow to enter more than ngMaxlength chars
					if(attrs.ngMaxlength)
					{
						element.on('keypress', function(e)
						{
							var value = ctrl.$modelValue?ctrl.$modelValue:'';

							if(value.length > parseInt(attrs.ngMaxlength) - 1)
							{
								e.preventDefault();

								var next = findNextInput();
								if(next.length > 0)
								next.focus();
							}
						});
					}
				}
			};
		}
	}
);
