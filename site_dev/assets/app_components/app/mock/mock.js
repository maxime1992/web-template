(function () {
	'use strict';

	// this application is to mock out the backend.
	app.run(function ($httpBackend) {
		// you'll need one line per url
		// $httpBackend.whenGET('URL_CUSTOM_TO_MOCK').respond({status:'success', data:'MY_JSON'});

		// allow to get languages on real $http
		$httpBackend.whenGET(/.json/).passThrough();

		// allow to get views on to real $http
		$httpBackend.whenGET(/\/views\//).passThrough();
	});
})();
