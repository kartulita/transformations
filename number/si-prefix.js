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
			var prefixIndex = prefix === undefined ? -1 : prefixes.indexOf(prefix);
			var scaled = value;
			var scale;
			/* Non-1000-based prefixes */
			if (prefix === 'c') {
				scale = -2;
			} else if (prefix === 'd') {
				scale = -1;
			} else if (prefix === 'da') {
				scale = 1;
			} else if (prefix === 'h') {
				scale = 2;
			} else if (prefixIndex === -1) {
				/* No prefix specified/recognised */
				prefixIndex = unit + Math.floor(Math.log(value) / (Math.LN10 * 3));
				/* Correct rounding error */
				if (value / Math.pow(1000, prefixIndex - unit) >= 1000) {
					prefixIndex++;
				}
				scale = (prefixIndex - unit) * 3;
				prefix = prefixes[prefixIndex];
			} else {
				/* Prefix explicitly specified */
				scale = (prefixIndex - unit) * 3;
			}
			scaled = value / Math.pow(10, scale);
			return digitsFormatter(scaled, '~3') + prefix;
		};
	}

})(window.angular);
