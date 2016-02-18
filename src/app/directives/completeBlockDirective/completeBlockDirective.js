(() => {
	
 	/**
    * @ngdoc directive 
    * @name app.directive:completeBlock
    * @param {String} headerImg url of the picture
    * @param {String} headerTitle name of the title of the block
    * @param {String} headerPicto type of the awesome picto
    * @param {String} headerColor color of the clock
    * @param {String} headerBackgroundColor color of the background
    * @param {String} bodyTitle title of the block
    * @param {String} bodyText content of the block
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
