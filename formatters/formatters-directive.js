(function (angular, _) {
	'use strict';

	angular.module('battlesnake.formatters')
		.directive('formatter', formattersDirective)
		.directive('formatters', formattersDirective);

	function formattersDirective(formatterService, hintParseService) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			var formatters = hintParseService.parse(attrs.formatters, [], true);
			_(formatters)
				.each(function (kv) {
					var name = kv.key, param = kv.val;
					var func = formatterService(name);
					ngModel.$formatters.push(function (value) {
						return func(value, param);
					});
				});
		}
	}

})(window.angular, window._);
