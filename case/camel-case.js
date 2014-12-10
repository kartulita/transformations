(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('camelCaseParser', camelCase)
		.factory('camelCaseFormatter', camelCase)
		;

	var isUpper = function (c) {
		return c.toLowerCase() !== c && c.toUpperCase() === c;
	};

	function camelCase() {
		return function (str) {
			return str.trim()
				.replace(/^\w\w/, function lowerCaseFirstLetterIfNotAcronym(c) {
					var a = c.charAt(0), b = c.charAt(1);
					var au = isUpper(a), bu = isUpper(b);
					return (au && bu) ? c : a.toLowerCase() + b;
				})
				.replace(/\W+\w/g, function removeSymbolsAndCapitalizeFollowingLetter(c) {
					return c.charAt(c.length - 1).toUpperCase();
				});
		};
	}

})(window.angular);
