(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('appendFormatter', appendFormatter);

	function appendFormatter() {
		return function (str, append) {
			return str + append;
		};
	}

})(window.angular);
