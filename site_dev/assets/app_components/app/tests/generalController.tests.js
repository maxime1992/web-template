
describe('generalController', function() {

	beforeEach(module('CUSTOM_NAME_OF_THE_APP'));

	// get the var to inject into the controller
	var $scope, $translate, createController;

	beforeEach(inject(function ($rootScope, $controller, _$translate_) {
		$translate = _$translate_;
		$scope = $rootScope.$new();

		createController = function() {
			return $controller('generalController', {
				'$scope': $scope,
				'$translate': $translate
			});
		};
	}));

	// let's check if the function toggleLang works well
	describe('$scope.toggleLang', function() {
		it('should be able to switch from EN to FR', function() {
			var controller = createController();

			// by default, it should be in english ...
			expect($translate.use()).toEqual('en');

			// but if we switch ...
			$scope.toggleLang();

			// it should be in french
			expect($translate.use()).toEqual('fr');
		});
	});

});
