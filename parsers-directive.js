(function (angular, _) {
	'use strict';

	angular.module('battlesnake.transformations')
		.directive('parser', parsersDirective)
		.directive('parsers', parsersDirective);

	function parsersDirective(parserService, hintParseService) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: link
		};

		function link(scope, element, attrs, ngModel) {
			var parsers = hintParseService.parse(attrs.parsers, [], true);
			_(parsers)
				.each(function (kv) {
					var name = kv.key, param = kv.val;
					var func = parserService(name);
					ngModel.$parsers.push(function (value) {
						return func(value, param);
					});
				});
		}
	}

})(window.angular, window._);
