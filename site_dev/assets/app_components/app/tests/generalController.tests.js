
describe('generalController', function() {

	beforeEach(module('CUSTOM_NAME_OF_THE_APP'));

	var $controller;

	beforeEach(inject(function(_$controller_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$controller = _$controller_;
	}));

	describe('$scope.toggleLang', function() {
		it('Switch from english by default, to french', function() {
			var $scope = {};
			var controller = $controller('generalController', { $scope: $scope, $translate: $translate });

			// by default, english
			expect( $translate.use() ).toEqual('en');

			// switch to french
			$scope.toggleLang();

			// check if it's french
			expect( $translate.use() ).toEqual('fr');
		});
	});

});
