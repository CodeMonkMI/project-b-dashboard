import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

interface BaseLayoutProps {
  children?: ReactNode;
}

const AuthLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  console.log('run on base layout => ', isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to={'/dashboards'} />;
  }
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%'
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

export default AuthLayout;
