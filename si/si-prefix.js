(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('siPrefixFormatter', siPrefixFormatter);

	function siPrefixFormatter(digitsFormatter) {
		var prefixes = [
			'y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm',
			'',
			'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];
		var unit = prefixes.indexOf('');
		return function (str, prefix) {
			var value = parseFloat(str);
			var scale = prefix === undefined ? -1 : prefixes.indexOf(prefix);
			if (scale === -1) {
				scale = Math.floor(Math.log(value) / Math.LN10 / 3) + unit;
				if (scale < 0) {
					scale = 0;
				} else if (scale >= prefixes.length) {
					scale = prefixes.length - 1;
				}
			}
			var prefixIndex = scale;
			scale = scale * 3;
			var digits = 3;
			/* Non-1000-based prefixes */
			if (prefix === 'c') {
				scale = -2;
			} else if (prefix === 'd') {
				scale = -1;
			} else if (prefix === 'da') {
				scale = 1;
			} else if (prefix === 'h') {
				scale = 2;
			}
			/* Format */
			return digitsFormatter(value / Math.pow(10, scale), digits) + prefixes[scale];
		};
	}

})(window.angular);
