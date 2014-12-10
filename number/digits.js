(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('digitsFormatter', digitsFormatter);

	/*
	 * Increase the last digit of a positional-string-representation of a number
	 * and propagate the carry (used to round number up after trimming)
	 */
	function incDigit(str) {
		var c;
		for (var i = str.length - 1; i >= 0; i--) {
			c = str.charAt(i);
			if (!/\d/.test(c)) {
				continue;
			}
			c = (parseInt(c) + 1) % 10;
			str = str.substr(0, i) + String(c) + str.substr(i + 1);
			if (c > 0) {
				break;
			} else if (i === 0) {
				str = str.replace(/(\d)/, '1$1');
			}
		}
		return str;
	}

	/**
	 * @ngdoc formatter
	 * @name digits
	 *
	 * @param {string} str
	 * The number or string to format.  Numbers specified in scientific
	 * format (mantissa+exponent) will be returned unformatted.
	 *
	 * @param {integer} [digits]
	 * The number of digits required.  Prefix this with "~" or specify a
	 * negative value to indicate that this is the *maximum* number of digits to
	 * produce.  If that is not specified, then the result will have trailing
	 * zeroes added if necessary in order to provide `digits` digits.
	 *
	 * @returns {string}
	 * The number with the requested number of significant digits.
	 *
	 * @description
	 * Note that node v0.10.33 only gives a decimal string for numbers in order
	 * {-6,20}.  Any outside this range are converted to string using scientific
	 * notation, and will not be formatted by this function (pass through).
	 * Expect browser behaviour to be equal or worse than this.
	 *
	 * **WARNING** Rounding is not yet implemented.
	 */
	function digitsFormatter() {
		return function (str, count) {
			str = String(str);
			if (str.indexOf('e') !== -1) {
				return str;
			}
			count = (count === undefined ? '~3' : (count || 1)).toString();
			var noTrailing = '~-'.indexOf(count.charAt(0)) !== -1;
			if (noTrailing) {
				count = count.substr(1);
			}
			var digits = parseInt(count);
			var value = parseFloat(str);
			var decimal = value.toFixed(18);
			/* Do this manually to avoid the numerous browser bugs */
			var found;
			var radix = decimal.indexOf('.');
			var c;
			for (var i = 0; i < decimal.length; i++) {
				c = decimal.charAt(i);
				if (found !== undefined && /[0-9]/.test(c)) {
					/*
					 * Count any digit once the first significant digit has been
					 * found
					 */
					found++;
				} else if (/[1-9]/.test(c)) {
					/* Found the first significant digit */
					found = i > radix ? 2 : 1;
				}
				/*
				 * If we have the requested number of significant digits, break
				 */
				if (found === digits) {
					i++;
					break;
				}
			}
			var outDigits = found;
			var roundOn = 0;
			var res = decimal.substr(0, i);
			/* If we found enough digits, trim the number */
			if (found === digits) {
				/* Get next digit, for rounding purposes */
				var roundCondition = decimal.substr(i).match(/\.?(\d)/);
				if (roundCondition && parseInt(roundCondition[1]) >= 5) {
					/* Rounding */
					res = incDigit(res);
				}
				/* Append more zeroes if we didn't get to the unit column yet */
				var zeroes = decimal.indexOf('.') - i;
				while (zeroes-- > 0) {
					res = res + '0';
					outDigits++;
				}
			}
			/*
			 * Append trailing zeroes if we don't have the requested number
			 * of digits
			 */
			if (noTrailing && res.indexOf('.') !== -1) {
				res = res.replace(/\.?0+$/, '');
			} else if (!noTrailing && outDigits < digits) {
				if (res.indexOf('.') === -1) {
					res = res + '.';
				}
				while (outDigits++ < digits) {
					res = res + '0';
				}
			}
			/*
			 * outDigits is no longer valid after the previous if-block (both
			 * branches will leave it with an incorrect value
			 */
			return res;
		};
	}

})(window.angular);
