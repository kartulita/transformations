(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('lowerCaseParser', lowerCase)
		.factory('lowerCaseFormatter', lowerCase)
		;

	function lowerCase() {
		return function (str) {
			return str.toLowerCase();
		};
	}

})(window.angular);
