(function () {
	/**
	* @name mock
	* @param {String} httpBackend
	* @example $httpBackend.whenGET('URL_CUSTOM_TO_MOCK').respond({status:'success', data:'MY_JSON'});
	* @returns {undefinded} nothing
	*/
	app.run(function ($httpBackend) {
		// allow to get languages on real $http
		$httpBackend.whenGET(/.json/).passThrough();

		// allow to get views on to real $http
		$httpBackend.whenGET(/\/views\//).passThrough();
	});
})();
