import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';
import { Navigate } from 'react-router-dom';
import AuthLayout from 'src/layouts/AuthLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from 'src/layouts/SidebarLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import AdminLayout from './layouts/AdminLayout';

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
const ForgotPassword = Loader(lazy(() => import('src/content/ForgotPassword')));
const VerifyOtp = Loader(lazy(() => import('src/content/VerifyOtp')));
const SetNewPassword = Loader(lazy(() => import('src/content/SetNewPassword')));

// dashboard
const AllUsers = Loader(lazy(() => import('src/content/dashboards/Users')));
const PendingUser = Loader(
  lazy(() => import('src/content/dashboards/Users/Pending'))
);
const AddUser = Loader(lazy(() => import('src/content/dashboards/AddUser')));

// Donation Request
const RequestManage = Loader(
  lazy(() => import('src/content/dashboards/Request/RequestManage'))
);
const RequestActivity = Loader(
  lazy(() => import('src/content/dashboards/Request/Activity'))
);
const RequestCompleted = Loader(
  lazy(() => import('src/content/dashboards/Request/Completed'))
);
const RequestPending = Loader(
  lazy(() => import('src/content/dashboards/Request/Pending'))
);
const MakeRequest = Loader(
  lazy(() => import('src/content/dashboards/Request/Make'))
);
const DonorFinder = Loader(
  lazy(() => import('src/content/dashboards/Donor/Finder'))
);

const History = Loader(lazy(() => import('src/content/dashboards/History')));
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
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/sign-in',
        element: (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        )
      },
      {
        path: '/sign-up',
        element: (
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <AuthLayout>
            <ForgotPassword />
          </AuthLayout>
        )
      },
      {
        path: '/verify-otp',
        element: (
          <AuthLayout>
            <VerifyOtp />
          </AuthLayout>
        )
      },
      {
        path: '/set-new-password',
        element: (
          <AuthLayout>
            <SetNewPassword />
          </AuthLayout>
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },

      {
        path: '/',
        element: <SidebarLayout />,
        children: [
          {
            path: '',
            element: <Crypto />
          },
          {
            path: 'users',
            element: <AdminLayout />,
            children: [
              {
                path: 'all',
                element: <AllUsers />
              },
              {
                path: 'pending',
                element: <PendingUser />
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
            path: 'make-request',
            element: <MakeRequest />
          },
          {
            path: 'donor-finder',
            element: <DonorFinder />
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
                path: 'activity',
                element: <RequestActivity />
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
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },

  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="settings" replace />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'profile',
        children: [
          {
            path: ':id',
            element: <ViewProfile />
          }
        ]
      },
      {
        path: 'settings',
        element: <UserSettings />
      }
    ]
  }
];

export default routes;
