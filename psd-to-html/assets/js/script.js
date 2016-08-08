(function()
{
	'use strict';

	jQuery(function($)
	{
		$('nav.primary > ul > li > a').click(function(e)
		{
			e.preventDefault();
			$('nav.primary .active').removeClass('active');
			$(this).closest('li').addClass('active');
		})
	});

})();
