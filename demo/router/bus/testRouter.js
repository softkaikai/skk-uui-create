(function () {
    const baseDir = 'admin/tpl/account/roleSetting';
    const baseRouter = 'app.account.roleSetting';

    routers.testSetting = [
        {
            routerName: `${baseRouter}`,
            routerConfigure: {
                url: '/roleSetting',
                abstract: true,
                template: '<div ui-view></div>'
            }
        },
        {
            routerName: `${baseRouter}.list`,
            routerConfigure: {
                url: '/list',
                templateUrl: `${baseDir}/html/list.html`,
                controller: 'roleSettingList',
                resolve: {
                    deps: ['$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load([`${baseDir}/js/list.js`]);
                        },
                    ],
                },
            },
        },
        {
            routerName: `${baseRouter}.add`,
            routerConfigure: {
                url: '/add',
                templateUrl: `${baseDir}/html/add.html`,
                controller: 'roleSettingAdd',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                            'firm/tpl/modals/setting/groupAndPermissions/addGroup.js',
                            'firm/tpl/modals/setting/groupAndPermissions/addFirmUsers.js',
                        ]).then(function () {
                            return $ocLazyLoad.load([`${baseDir}/js/index.js`]);
                        });
                    }]
                },
            },
        },
    ];
})();
