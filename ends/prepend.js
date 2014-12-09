(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('prependFormatter', prependFormatter);

	function prependFormatter() {
		return function (str, prepend) {
			return prepend + str;
		};
	}

})(window.angular);
