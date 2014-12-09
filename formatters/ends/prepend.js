(function (angular) {
	'use strict';

	angular.module('battlesnake.formatters')
		.factory('prependFormatter', prependFormatter);

	function prependFormatter() {
		return function (str, prepend) {
			return prepend + str;
		};
	}

})(window.angular);
