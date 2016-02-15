(function () {
	/**
	* Create a 'complete-block'
	* 5 differents types :
	* choose parameters according to want you want
	* see examples on 'page1'
	* @name completeBlock
	* @param {String} headerImg path of the image
	* @param {String} headerTitle name of the title
	* @param {String} headerPicto path of the font awesome picto
	* @param {String} headerColor color choosed to be show
	* @param {String} headerBackgroundColor background color choosed to be show
	* @param {String} bodyTitle the title of the body
	* @param {String} bodyText the content of the body
	* @example headerPicto => icon-af icon-af-B-digital-avionenvol font-size-x3
	* @example bodyBackgroundColor => background-color-soft-grey
	* @example file myCustomDirective.js
	*
	* app.directive('myCustomDirective', function () {
	*	return {
	*		restrict: 'EA',
	*		replace: true,
	*		transclude: true,
	*		scope: {
	*			argOne: '@argOne',
	*			argTwo: '@argTwo',
	*			argThree: '@argThree'
	*		},
	*		templateUrl: '/html/directives/views/myCustomDirective.html'
	*	};
	* });
	* @returns {undefined} nothing
	*/

	app.directive('completeBlock', function () {
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
