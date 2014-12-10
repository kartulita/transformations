(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('snakeCaseParser', snakeCase)
		.factory('snakeCaseFormatter', snakeCase)
		;

	function snakeCase() {
		return function (str, separator) {
			separator = separator || '-';
			return str.trim()
				.replace(/([A-Z]+)($|[A-Z])/g, function processAcronyms(c, a, b, index) {
					return (index ? separator : '') + a.toLowerCase() + (b.length ? separator + b : '');
				})
				.replace(/(^|.)([A-Z])/g, function processInitialCapital(c, a, b, index) {
					if (a === separator) {
						return c.toLowerCase();
					} else {
						return (index ? a + separator : '') + b.toLowerCase();
					}
				});
		};
	}

})(window.angular);
