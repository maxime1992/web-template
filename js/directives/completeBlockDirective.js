'use strict';

(function () {
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
 * description : Use the template:'<div ng-class="(headerPicto != null && headerPicto.length != 0) || (headerTitle != null && headerTitle.length != 0) ? \'complete-block\' : \'complete-block-no-header\'"><div ng-if="headerImg != null && img.length != 0" class=wrapper-header-img><img ng-src={{headerImg}} class=img-responsive></div><div ng-if="headerPicto != null && headerPicto.length != 0" class="header {{headerBackgroundColor}} {{headerColor}}"><div class={{headerPicto}}></div></div><div ng-if="headerTitle != null && headerTitle.length != 0" class="header-text {{headerBackgroundColor}} {{headerColor}} text-left">{{headerTitle}}</div><div class="wrapper-body {{bodyBackgroundColor}}"><div ng-if="bodyTitle != null && bodyTitle.length != 0" class=body-title>{{bodyTitle}}</div><div class="body-text text-justify">{{bodyText}}</div></div></div>'
 **/
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
			template: '<div ng-class="(headerPicto != null && headerPicto.length != 0) || (headerTitle != null && headerTitle.length != 0) ? \'complete-block\' : \'complete-block-no-header\'"><div ng-if="headerImg != null && img.length != 0" class=wrapper-header-img><img ng-src={{headerImg}} class=img-responsive></div><div ng-if="headerPicto != null && headerPicto.length != 0" class="header {{headerBackgroundColor}} {{headerColor}}"><div class={{headerPicto}}></div></div><div ng-if="headerTitle != null && headerTitle.length != 0" class="header-text {{headerBackgroundColor}} {{headerColor}} text-left">{{headerTitle}}</div><div class="wrapper-body {{bodyBackgroundColor}}"><div ng-if="bodyTitle != null && bodyTitle.length != 0" class=body-title>{{bodyTitle}}</div><div class="body-text text-justify">{{bodyText}}</div></div></div>'
		};
	});
})();