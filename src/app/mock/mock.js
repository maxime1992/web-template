(() => {
	app.run(($httpBackend) => {
		// allow to get languages on real $http
		$httpBackend.whenGET(/.json/).passThrough();

		// allow to get views on to real $http
		$httpBackend.whenGET(/\/views\//).passThrough();
	});
})();
