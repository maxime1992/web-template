(() => {
	describe('generalController', () => {
		// beforeEach(module('CUSTOM_NAME_OF_THE_APP'));
		beforeEach(() => {
			module('CUSTOM_NAME_OF_THE_APP');
		});

		// get the var to inject into the controller
		let $scope;
		let $translate;
		let createController;

		beforeEach(inject(($rootScope, $controller, _$translate_) => {
			$translate = _$translate_;
			$scope = $rootScope.$new();

			createController = () => {
				return $controller('generalController', {
					$scope: $scope,
					$translate: $translate
				});
			};
		}));

		// let's check if the function toggleLang works well
		describe('$scope.toggleLang', () => {
			it('should be able to switch from EN to FR', () => {
				let controller = createController();

				// by default, it should be in english ...
				expect(controller.$translate.use()).toEqual('en');

				// but if we switch ...
				controller.$scope.toggleLang();

				// it should be in french
				expect(controller.$translate.use()).toEqual('fr');
			});
		});
	});
})();
