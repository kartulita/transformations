/**
 * @ngdoc test
 * @name transformations
 */
tests.push({
	name: 'transformations',
	group: 'Transformations',
	modules: ['battlesnake.transformations'],
	test: function (parserService, formatterService) {

	function testParser(parserName, tests) {
		testBatch(parserService, 'parser', parserName, tests);
	}

	function testFormatter(formatterName, tests) {
		testBatch(formatterService, 'formatter', formatterName, tests);
	}

	/*
	 * Build function to run the test, this makes the expandable code in the
	 * mocha web interface nice and readable, serving as both a specification
	 * and also as usage documentation.
	 */
	function testBatch(service, type, name, tests) {
		describe(name + ' (' + type + ')', function () {
			_(tests).each(function (test) {
				var func = new Function(type + 'Service',
					[
						'return function () {',
						'	var ' + type + ' = ' + type + 'Service(' +
							JSON.stringify(name) + ');',
						'	expect(' + type + '(' + JSON.stringify(test.expr) +
							(_(test).has('param') ? ', ' +
							JSON.stringify(test.param) : '') + ')).to.equal(' +
							JSON.stringify(test.expect) + ')',
						'}'
					].join('\n'))(service);
				it('"' + test.expr + '"' +
					(_(test).has('param') ? ' with param ' +
						JSON.stringify(test.param) : '') +
					' => ' + JSON.stringify(test.expect), func);
			});
		});
	}

	testFormatter('upper-case',
		[
			{ expr: 'PlOoMiNeKtAr', expect: 'PLOOMINEKTAR' },
			{ expr: '0123456789', expect: '0123456789' },
			{ expr: '!$%^&*()-=_+', expect: '!$%^&*()-=_+' }
			/* TODO: Add cyrillic & nordic/baltic extended latin */
		]);

	testFormatter('lower-case',
		[
			{ expr: 'PlOoMiNeKtAr', expect: 'ploominektar' },
			{ expr: '0123456789', expect: '0123456789' },
			{ expr: '!$%^&*()-=_+', expect: '!$%^&*()-=_+' }
			/* TODO: Add cyrillic & nordic/baltic extended latin */
		]);

	testFormatter('camel-case',
		[
			{ expr: 'PascalCase', expect: 'pascalCase' },
			{ expr: 'snake-cased string', expect: 'snakeCasedString' },
			{ expr: 'MSBlaster', expect: 'MSBlaster' },
		]);

	testFormatter('snake-case',
		[
			{ expr: 'PascalCase', expect: 'pascal-case' },
			{ expr: 'MariaDB', expect: 'maria-db' },
			{ expr: 'Ext2FS', expect: 'ext2-fs' },
			{ expr: 'MSBlaster', expect: 'ms-blaster' },
			{ expr: 'SomeIBMCrap', expect: 'some-ibm-crap' }
		]);

	testFormatter('prepend',
		[
			{ expr: 'den', param: 'swe', expect: 'sweden' }
		]);

	testFormatter('append',
		[
			{ expr: 'den', param: 'mark', expect: 'denmark' }
		]);

	testFormatter('digits',
		[
			{ expr: '012.3450', param: 0, expect: '10' },
			{ expr: '012.3450', param: 1, expect: '10' },
			{ expr: '012.3450', param: 2, expect: '12' },
			{ expr: '-012.3450', param: 3, expect: '-12.3' },
			{ expr: '012.3450', param: 4, expect: '12.35' },
			{ expr: '-012.3450', param: 4, expect: '-12.35' },
			{ expr: '012.3450', param: 5, expect: '12.345' },
			{ expr: '012.3450', param: 6, expect: '12.3450' },
			{ expr: '012.3450', param: '~6', expect: '12.345' },
			{ expr: '10', param: -4, expect: '10' },
			{ expr: '10', param: 4, expect: '10.00' }
		]);

	testFormatter('si-prefix',
		[
			{ expr: 100, expect: '100' },
			{ expr: 1e3, expect: '1k' },
			{ expr: 1e-9, expect: '1n' },
			{ expr: 0.832, param: 'd', expect: '8.32d' },
			{ expr: 920, param: 'k', expect: '0.92k' },
			{ expr: 299792458, param: 'k', expect: '300000k' }
		]);

}});
