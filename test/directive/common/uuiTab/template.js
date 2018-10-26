angular.module('app').run(['$templateCache', function ($templateCache) {

	let uuiTab = `
	<div>

	</div>
`;
	$templateCache.put('template/uuiTab.html', uuiTab);

}]);
