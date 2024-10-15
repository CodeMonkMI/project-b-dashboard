import { Box, alpha, lighten, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from 'src/components/Loader';
import { useGetMeQuery } from 'src/redux/features/auth/authApiSlice';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  const { isAuthenticated, me } = useSelector((state: any) => state.auth);

  const { isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
    skip: !isAuthenticated
  });

  if (!isAuthenticated) {
    return <Navigate to={'/sign-in'} />;
  }
  if (isError) {
    return <Navigate to={'/status/500'} />;
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">
            {isLoading && <Loader />}
            {isSuccess && <Outlet />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
