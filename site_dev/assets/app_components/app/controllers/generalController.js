
app.controller('generalController', ['$scope', '$translate', function($scope, $translate) {
	$scope.welcome = "Welcome !";

	$scope.toggleLang = function () {
        $translate.use() === 'en'? $translate.use('fr') : $translate.use('en');
    };

}]);
