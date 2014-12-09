(function (angular) {
	'use strict';

	angular.module('battlesnake.formatters')
		.factory('upperCaseFormatter', upperCaseFormatter);

	function upperCaseFormatter() {
		return function (str) {
			return str.toUpperCase();
		};
	}

})(window.angular);
