(function () {
	// factory to try rxjs
	app.factory('rxjsFactory', ['rx', function (rx) {
		// save the observer of the factory
		console.log('here');
		var rxjsFactoryObserver;

		// create the observable
		var rxjsFactory$ = new rx.Observable.create(function (observer) {
			rxjsFactoryObserver = observer;
		})
		.share();

		// define the data like a private variable (outside object returned)
		var data = {
			users: [
				{name: 'John Rambo', isVisible: true, age: 32},
				{name: 'Pablo Picasso', isVisible: true, age: 64}
			]
		};

		return {
			// share the observable so eeryone can subscribe to it
			rxjsFactory$: rxjsFactory$,

			getUsers: function () {
				// tell everyone to update users
				rxjsFactoryObserver.next(data.users);
			},

			addUser: function () {
				// push a new user
				data.users.push({name: 'John Kennedy', isVisible: true, age: 87});

				// tell everyone to update users
				rxjsFactoryObserver.next(data.users);
			}
		};
	}]);
})();
