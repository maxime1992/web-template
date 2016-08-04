(() => {
	/**
	* @ngdoc directive
	* @name app.directive:completeBlock
	* @param {String} headerImg URL of the picture
	* @param {String} headerTitle Name of the title of the block
	* @param {String} headerPicto Type of the awesome picto
	* @param {String} headerColor Color of the clock
	* @param {String} headerBackgroundColor Color of the background
	* @param {String} bodyTitle Title of the block
	* @param {String} bodyText Content of the block
	* @restrict 'EA' //the elements the directive is restricted to.
	* @element ANY
	* @scope  //add this attribute if you create a scope in your directive.
	* description : Use the templateUrl: 'completeBlockDirective.html'
	**/
	app.directive('completeBlock', () => {
		return {
			restrict: 'EA',
			replace: true,
			transclude: true,
			scope: {
				headerImg: '@headerImg',
				headerTitle: '@headerTitle',
				headerPicto: '@headerPicto',
				headerColor: '@headerColor',
				headerBackgroundColor: '@headerBackgroundColor',
				bodyBackgroundColor: '@bodyBackgroundColor',
				bodyTitle: '@bodyTitle',
				bodyText: '@bodyText'
			},
			templateUrl: 'completeBlockDirective.html'
		};
	});
})();
