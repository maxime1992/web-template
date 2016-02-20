(function () {
	app.controller('rxjs2Controller', ['$scope', 'rxjsFactory', function($scope, rxjsFactory) {
		// subscribe to observable
		rxjsFactory.rxjsFactory$.subscribe(function(users) {
			$scope.users = users;
		});

		// call getUsers method so the observable tell everyone to update the users
		rxjsFactory.getUsers();

		// add a user
		$scope.addUser = function() {
			rxjsFactory.addUser();
		};
	}]);
})();
