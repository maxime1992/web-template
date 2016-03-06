(() => {
	/**
	 * @ngdoc controller
	 * @name app.controller:rxjs2Controller
	 * @description
	 * Controller 2 for the observable demo
	 */
	app.controller('rxjs2Controller', ($scope, rxjsFactory) => {
		/**
		* @ngdoc method
		* @name subscribe
		* @methodOf app.controller:rxjs2Controller
		* @description
		* The controller subscribes at the emit signal from the rxjsFactory.
		* If users changes, so $scope.users will be update
		*/
		rxjsFactory.rxjsFactory$.subscribe((users) => $scope.users = users);

		/**
		* @ngdoc method
		* @name getUsers
		* @methodOf app.controller:rxjs2Controller
		* @description
		* Call getUsers method so the observable tells everyone to update the users
		*/
		rxjsFactory.getUsers();

		/**
		* @ngdoc method
		* @name addUser
		* @methodOf app.controller:rxjs2Controller
		* @description
		* Add a user
		*/
		$scope.addUser = () => rxjsFactory.addUser();
	});
})();
