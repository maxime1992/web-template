'use strict';

(function () {
	app.filter('rxjsFilter', function () {
		return function (input) {
			for (var i = 0; i < input.length; i++) {
				input[i].name = input[i].name.toUpperCase();
			}
			return input;
		};
	});
})();