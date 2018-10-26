angular.module('app').run(['$templateCache', function ($templateCache) {

	let uuiAddress = `
	<div>

	</div>
`;
	$templateCache.put('template/uuiAddress.html', uuiAddress);

}]);

/**
 * @ngdoc directive
 * @name uuiAddress
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
angular.module('app').directive('uuiAddress', ['$templateCache', function ($templateCache) {
    return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		template: $templateCache.get('template/uuiAddress.html'),
		scope: {
			imgurl: '@'
		},
		link: function($scope, element, attrs, ctrls) {

		}
	};
}]);

