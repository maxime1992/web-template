
app.controller('generalController', ['$scope', '$translate', function($scope, $translate) {
	
	$scope.welcome = 'Welcome !';

	$scope.toggleLang = function () {
		/*jshint -W030*/
		$translate.use() == 'en' ? $translate.use('fr') : $translate.use('en');
	};

}]);
