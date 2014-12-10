(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('formatterService', formatterService);

	/**
	 * @ngdoc service
	 * @name formatterService
	 *
	 * @param {string} name
	 * Name of the formatter to get
	 *
	 * @returns {formatter}
	 * Formatter function, e.g. `(rawValue, param) -> formattedValue`
	 */
	function formatterService($injector, camelCaseFormatter) {
		return function (name) {
			var func = $injector.get(camelCaseFormatter(name) + 'Formatter');
			if (!func) {
				throw new Error('Unknown formatter: ' + name);
			}
			return func;
		};
	}

})(window.angular);
