(function (angular) {
	'use strict';

	angular.module('battlesnake.formatters')
		.factory('lowerCaseFormatter', lowerCaseFormatter);

	function lowerCaseFormatter() {
		return function (str) {
			return str.toLowerCase();
		};
	}

})(window.angular);
