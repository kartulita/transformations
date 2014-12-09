(function (angular) {
	'use strict';

	angular.module('battlesnake.formatters')
		.factory('camelCaseFormatter', camelCaseFormatter);

	function camelCaseFormatter() {
		return function (str) {
			return str.trim().replace(/\W+\w/g, function (c) {
				return c.charAt(c.length - 1).toUpperCase();
			});
		};
	}

})(window.angular);
