/**
 * @ngdoc directive
 * @name uuiTab
 * @description 点击放大图片指令
 * @restrict EA
 * @element ANY
 *
 * @scope
 * @param {String} @ imgurl - 图片的url
 *
 * @example
 * <big-img imgurl="vm.url"></big-img>
 */
angular.module('app').directive('uuiTab', ['$templateCache', function ($templateCache) {
    return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		template: $templateCache.get('template/uuiTab.html'),
		scope: {
			imgurl: '@'
		},
		link: function($scope, element, attrs, ctrls) {

		}
	};
}]);
