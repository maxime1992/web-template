'use strict';

(function () {
  /**
   * @ngdoc controller
   * @name app.controller:generalController
   * @description
   * A It contains by default the active tab view and the language selected
   */
  app.controller('generalController', ["$scope", "$location", "$state", "$translate", "langFactory", function ($scope, $location, $state, $translate, langFactory) {
    $scope.$on('$stateChangeStart', function (event, toState, toParams) {
      $translate.use(toParams.lang);

      langFactory.setLang(toParams.lang);
    });

    /**
    * @ngdoc method
    * @name isActive
    * @methodOf app.controller:generalController
    * @description
    * Return the location url of the open tab .
    * @returns {Object} return the location path of the active tab
    */
    $scope.isActive = function (viewLocation) {
      return $location.path().indexOf(viewLocation) > -1;
    };

    /**
    * @ngdoc method
    * @name changeLanguageTo
    * @methodOf app.controller:generalController
    * @description
    * Set the language in function of the lang
    * @param {string} lang language
    */
    $scope.changeLanguageTo = function (lang) {
      $translate.use(lang);

      langFactory.setLang(lang);

      $state.go($state.current.name);

      $scope.navCollapsed = !$scope.navCollapsed;
    };

    /**
    * @ngdoc method
    * @name getLanguage
    * @methodOf app.controller:generalController
    * @description
    * Get the language
    * @returns {string} lang
    */
    $scope.getLanguage = function () {
      return $translate.use();
    };
  }]);
})();