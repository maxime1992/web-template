(function () {
	'use strict';

	app.controller('generalController', ['$scope', '$location', '$state', '$translate', 'langFactory', function ($scope, $location, $state, $translate, langFactory) {
		// change language when url parameter 'lang' changes
		$scope.$on('$stateChangeStart', function (event, toState, toParams) {
			// change lang on the whole app
			$translate.use(toParams.lang);

			// save lang in factory
			langFactory.setLang(toParams.lang);
		});

		// is menu collapsed ?
		$scope.isCollapsed = true;

		// which item is selected in menu ?
		// return true if viewLocation is equal to url
		$scope.isActive = function (viewLocation) {
			return $location.path().indexOf(viewLocation) > -1;
		};

		$scope.changeLanguageTo = function (lang) {
			// change lang on the whole app
			/* jshint -W030 */
			$translate.use(lang);

			// save lang in factory
			langFactory.setLang(lang);

			// change the url to match the actual lang
			$location.path('/' + lang + $location.path().substring(3));
		};

		$scope.getLanguage = function () {
			/* jshint -W030 */
			return $translate.use();
		};
	}]);
})();
