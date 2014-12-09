(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('snakeCaseParser', snakeCase)
		.factory('snakeCaseFormatter', snakeCase)
		;

	function snakeCase() {
		return function (str, separator) {
			separator = separator || '-';
			return str.trim().replace(/[^A-Z][A-Z]/g, function (c) {
				return c.charAt(0) + separator + c.charAt(1);
			});
		};
	}

})(window.angular);
