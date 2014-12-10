(function (angular) {
	'use strict';

	angular.module('battlesnake.transformations')
		.factory('parserService', parserService);

	/**
	 * @ngdoc service
	 * @name parserService
	 *
	 * @param {string} name
	 * Name of the parser to get
	 *
	 * @returns {parser}
	 * Parser function, e.g. `(viewValue, param) -> rawValue`
	 */
	function parserService($injector, camelCaseFormatter) {
		return function (name) {
			var func = $injector.get(camelCaseFormatter(name) + 'Parser');
			if (!func) {
				throw new Error('Unknown parser: ' + name);
			}
			return func;
		};
	}

})(window.angular);
