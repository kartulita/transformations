(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('upperCaseParser', upperCase)
		.factory('upperCaseFormatter', upperCase)
		;

	function upperCase() {
		return function (str) {
			return str.toUpperCase();
		};
	}

})(window.angular);
