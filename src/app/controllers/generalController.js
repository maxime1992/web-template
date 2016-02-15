(function () {
	/**
	* @name generalController
	* @param {String} $scope
	* @param {String} $location
	* @param {String} $state
	* @param {String} $translate
	* @param {String} langFactory
	* @returns {undefinded} nothing
	*/
	app.controller('generalController', function ($scope, $location, $state, $translate, langFactory) {
		/**
		* change language when url parameter 'lang' changes
		* @name stateChangeStart
		* @param {String} event
		* @param {String} toState
		* @param {String} toParams
		* @returns {undefinded} nothing
		*/
		$scope.$on('$stateChangeStart', function (event, toState, toParams) {
			$translate.use(toParams.lang);

			langFactory.setLang(toParams.lang);
		});

		/**
		* @param {String} viewLocation path of the image
		* @returns {Number} TODO
		*/
		$scope.isActive = function (viewLocation) {
			return $location.path().indexOf(viewLocation) > -1;
		};

		/**
		* @param {String} lang to use
		* @returns {undefinded} nothing
		*/
		$scope.changeLanguageTo = function (lang) {
			$translate.use(lang);

			langFactory.setLang(lang);

			$state.go($state.current.name);

			$scope.navCollapsed = !$scope.navCollapsed;
		};

		/**
		* @returns {String} lang used
		*/
		$scope.getLanguage = function () {
			return $translate.use();
		};
	});
})();
