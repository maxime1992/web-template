'use strict';

(function () {
  /**
   * @ngdoc controller
   * @name app.controller:rxjs1Controller
   * @description
   * Controller 1 for the observable demo
   */
  app.controller('rxjs1Controller', ['$scope', 'rxjsFactory', function ($scope, rxjsFactory) {
    /**
    * @ngdoc method
    * @name subscribe
    * @methodOf app.controller:rxjs1Controller
    * @description
    * The controller subscribes at the emit signal from the rxjsFactory.
    * If users changes, so $scope.users will be update
    */
    rxjsFactory.rxjsFactory$.subscribe(function (users) {
      $scope.users = users;
    });

    /**
    * @ngdoc method
    * @name getUsers
    * @methodOf app.controller:rxjs1Controller
    * @description
    * Call getUsers method so the observable tells everyone to update the users
    */
    rxjsFactory.getUsers();

    /**
    * @ngdoc method
    * @name addUser
    * @methodOf app.controller:rxjs1Controller
    * @description
    * Add a user
    */
    $scope.addUser = function () {
      rxjsFactory.addUser();
    };
  }]);
})();