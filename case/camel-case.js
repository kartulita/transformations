(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('camelCaseParser', camelCase)
		.factory('camelCaseFormatter', camelCase)
		;

	function camelCase() {
		return function (str) {
			return str.trim().replace(/\W+\w/g, function (c) {
				return c.charAt(c.length - 1).toUpperCase();
			});
		};
	}

})(window.angular);
