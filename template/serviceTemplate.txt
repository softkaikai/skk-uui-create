'use strict';
// 课程服务
angular.module('app')
	.service('replaceServiceName', ['httpService',
		function (httpService) {
			const webServer = httpService.webServerList.firmWebServer;
			const serviceRootUrl = '/course';

			this.getStoreCourse = function () {
				return httpService.http({
					method: 'get',
					serverURL: webServer,
					url: `${serviceRootUrl}/getStoreCourse`,
				});
			};

		}
	]);

