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

}});
