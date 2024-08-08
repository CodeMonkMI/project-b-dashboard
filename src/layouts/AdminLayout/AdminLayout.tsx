import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMeQuery } from 'src/redux/features/auth/authApiSlice';

interface BaseLayoutProps {
  children?: ReactNode;
}

const AdminLayout: FC<BaseLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const { data, isLoading, isSuccess } = useGetMeQuery(undefined, {
    skip: !isAuthenticated
  });

  if (!isAuthenticated) {
    return <Navigate to={'/sign-in'} />;
  }
  if (
    data.data.role.role === 'super_admin' ||
    data.data.role.role === 'admin'
  ) {
    return (
      <Box
        sx={{
          flex: 1,
          height: '100%'
        }}
      >
        {isLoading && <h2>Loading....</h2>}
        {isSuccess && (children || <Outlet />)}
      </Box>
    );
  }

  return <Navigate to={'/dashboards'} />;
};

export default AdminLayout;
