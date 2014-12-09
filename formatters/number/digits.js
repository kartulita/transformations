(function (angular) {
	'use strict';

	/*
	 * TODO: Node only gives decimal string for numbers in order {-6,20}.  Any
	 * outside this range are converted to string using scientific notation, and
	 * will not be formatted by this function (pass through).
	 * Expect browser behaviour to be worse than node in some cases.
	 */

	angular.module('battlesnake.formatters')
		.factory('digitsFormatter', digitsFormatter);

	function digitsFormatter() {
		return function (str, count) {
			if (str.indexOf('e') !== -1) {
				return str;
			}
			console.warn('See TODO items in formatters/number/digits.js');
			var digits = count === undefined ? 3 : (count || 1);
			var value = parseFloat(str);
			var res = value.toString(10);
			/* Do this manually to avoid the numerous browser bugs */
			var found = 0;
			var c;
			for (var i = 0; i < res.length; i++) {
				c = res.charAt(i);
				if (found && /[0-9]/.test(c)) {
					/*
					 * Count any digit once the first significant digit has been
					 * found
					 */
					found++;
				} else if (/[1-9]/.test(c)) {
					/* Found the first significant digit */
					found = 1;
				}
				/*
				 * If we have the requested number of significant digits, break
				 */
				if (found === count) {
					break;
				}
			}
			/* If we found enough digits, trim the number */
			if (found === count) {
				res = res.substr(0, i);
				/*
				 * TODO: Rounding
				 * If it alters a digit, it must check the previous digit and
				 * also be able to handle the decimal separator and negative
				 * values.
				 */
			}
			return res;
		};
	}

})(window.angular);
