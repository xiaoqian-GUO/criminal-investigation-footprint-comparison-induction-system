export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin','user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/user/login' },
      // infocollection
      {
        name: 'infocollection',
        icon: 'form',
        path: '/infocollection',
        routes: [
          {
            path: '/infocollection/collect',
            name: 'collect',
            component: './InfoCollection/Collect',
          },
          {
            path: '/infocollection/success',
            name: 'success',
            component: './InfoCollection/Success',
          },
        ],
      },
      // infoQuery
      {
        path: '/infoquery',
        icon: 'check-circle-o',
        name: 'infoquery',
        routes: [
          {
            path: '/infoquery/basic-info',
            name: 'basicInfo',
            component: './InfoQuery/BasicInfo',
          },
          {
            path: '/infoquery/basic-result',
            name: 'basicResult',
            component: './InfoQuery/BasicResult',
          },
        ],
      },
      // infoconclude
      {
        path: '/infoconclude',
        icon: 'profile',
        name: 'infoconclude',
        routes: [
          {
            path: '/infoconclude/conclude',
            name: 'conclude',
            component: './InfoConclude/Conclude',
          },
        ],
      },
      // system
      {
        path: '/system',
        icon: 'table',
        name: 'system',
        authority: ['admin'],
        routes: [
          {
            path: '/system/table-list',
            name: 'searchtable',
            component: './System/TableList',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: './Account/Center/Center',
          //   routes: [
          //     {
          //       path: '/account/center',
          //       redirect: '/account/center/articles',
          //     },
          //     {
          //       path: '/account/center/articles',
          //       component: './Account/Center/Articles',
          //     },
          //     {
          //       path: '/account/center/applications',
          //       component: './Account/Center/Applications',
          //     },
          //     {
          //       path: '/account/center/projects',
          //       component: './Account/Center/Projects',
          //     },
          //   ],
          // },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              // {
              //   path: '/account/settings/binding',
              //   component: './Account/Settings/BindingView',
              // },
              // {
              //   path: '/account/settings/notification',
              //   component: './Account/Settings/NotificationView',
              // },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
