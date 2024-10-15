import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
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

  if (isSuccess && ['super_admin', 'admin'].includes(data.data.role.role)) {
    return (
      <Box
        sx={{
          flex: 1,
          height: '100%'
        }}
      >
        {isLoading && <Loader />}
        {isSuccess && (children || <Outlet />)}
      </Box>
    );
  }

  return <Navigate to={'/'} />;
};

export default AdminLayout;
