import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
// import { Navigate } from 'react-router-dom';

// import AuthLayout from 'src/layouts/AuthLayout';
// import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dashboards
const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// pages
const SignIn = Loader(lazy(() => import('src/content/signIn/SignIn')));
const SignUp = Loader(lazy(() => import('src/content/signUp/SignUp')));

// dashboard
const AllUsers = Loader(lazy(() => import('src/content/dashboards/Users')));
const AddUser = Loader(lazy(() => import('src/content/dashboards/AddUser')));

// Donation Request
const RequestManage = Loader(
  lazy(() => import('src/content/dashboards/Request/RequestManage'))
);
const RequestCompleted = Loader(
  lazy(() => import('src/content/dashboards/Request/Completed'))
);
const RequestPending = Loader(
  lazy(() => import('src/content/dashboards/Request/Pending'))
);

// Applications
const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const ViewProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile-view'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes = (isLoggedIn?: boolean): RouteObject[] => [
  // {
  //   path: '',
  //   element: <BaseLayout />,
  //   children: [
  //     {
  //       path: '/sign-in',
  //       element: (
  //         <AuthLayout>
  //           <SignIn />
  //         </AuthLayout>
  //       )
  //     },
  //     {
  //       path: '/sign-up',
  //       element: (
  //         <AuthLayout>
  //           <SignUp />
  //         </AuthLayout>
  //       )
  //     },
  //     {
  //       path: 'status',
  //       children: [
  //         {
  //           path: '',
  //           element: <Navigate to="404" replace />
  //         },
  //         {
  //           path: '404',
  //           element: <Status404 />
  //         },
  //         {
  //           path: '500',
  //           element: <Status500 />
  //         },
  //         {
  //           path: 'maintenance',
  //           element: <StatusMaintenance />
  //         },
  //         {
  //           path: 'coming-soon',
  //           element: <StatusComingSoon />
  //         }
  //       ]
  //     },
  //     {
  //       path: '*',
  //       element: <Status404 />
  //     }
  //   ]
  // },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Crypto />
      },
      {
        path: 'users',
        children: [
          {
            path: 'all',
            element: <AllUsers />
          },
          {
            path: 'add',
            element: <AddUser />
          },
          {
            path: 'view',
            children: [
              {
                path: ':id',
                element: <ViewProfile />
              }
            ]
          }
        ]
      },
      {
        path: 'request',
        children: [
          {
            path: 'all',
            element: <RequestManage />
          },
          {
            path: 'completed',
            element: <RequestCompleted />
          },
          {
            path: 'Pending',
            element: <RequestPending />
          },
          {
            path: 'add',
            element: <AddUser />
          },
          {
            path: 'view',
            children: [
              {
                path: ':id',
                element: <ViewProfile />
              }
            ]
          }
        ]
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  }
  // {
  //   path: 'management',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="transactions" replace />
  //     },
  //     {
  //       path: 'transactions',
  //       element: <Transactions />
  //     },
  //     {
  //       path: 'profile',
  //       children: [
  //         {
  //           path: '',
  //           element: <Navigate to="details" replace />
  //         },
  //         {
  //           path: 'settings',
  //           element: <UserSettings />
  //         }
  //       ]
  //     }
  //   ]
  // }
];

export default routes;
