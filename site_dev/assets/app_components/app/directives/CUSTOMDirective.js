
/*
 * Create a directive
 *
 * How to use it :
 * <div my-CUSTOM-directive="" arg1="arg1" arg2="2" arg3="3"></div>
 */
app.directive("myCustomDirective", function(){
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
					argOne: '@argOne',
					argTwo: '@argTwo',
					argThree: '@argThree'
				},
		templateUrl: 'assets/app_components/app/directives/views/CUSTOMDirective.html'
	};
});
