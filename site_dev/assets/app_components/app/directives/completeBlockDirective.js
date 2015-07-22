
/*
 * Create a 'complete-block'
 * 5 differents types : 
 * choose parameters according to want you want
 * see examples on 'page1'
 */
app.directive('completeBlock', function(){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			headerImg: '@headerImg',
			headerTitle: '@headerTitle',
			headerPicto: '@headerPicto', // ex : icon-af icon-af-B-digital-avionenvol font-size-x3
			headerColor: '@headerColor',
			headerBackgroundColor: '@headerBackgroundColor',
			bodyBackgroundColor: '@bodyBackgroundColor', // ex : background-color-soft-grey
			bodyTitle: '@bodyTitle',
			bodyText: '@bodyText'
		},
		templateUrl: 'assets/app_components/app/directives/views/completeBlockDirective.html'
	};
});
