(function () {
	app.controller('generalController', function ($scope, $location, $state, $translate, langFactory) {
		// change language when url parameter 'lang' changes
		$scope.$on('$stateChangeStart', function (event, toState, toParams) {
			// change lang on the whole app
			$translate.use(toParams.lang);

			// save lang in factory
			langFactory.setLang(toParams.lang);
		});

		// which item is selected in menu ?
		// return true if viewLocation is equal to url
		$scope.isActive = function (viewLocation) {
			return $location.path().indexOf(viewLocation) > -1;
		};

		$scope.changeLanguageTo = function (lang) {
			// change lang on the whole app
			$translate.use(lang);

			// save lang in factory
			langFactory.setLang(lang);

			// change state to update the lang into URL
			$state.go($state.current.name);

			// hide menu when clicking on item menu
			$scope.navCollapsed = !$scope.navCollapsed;
		};

		$scope.getLanguage = function () {
			return $translate.use();
		};
	});
})();
