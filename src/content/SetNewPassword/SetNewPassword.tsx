import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import Loader from 'src/components/Loader';
import { useVerifyVerificationIdQuery } from 'src/redux/features/auth/authApiSlice';
import SetNewPasswordForm from './SetNewPasswordForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SetNewPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dataParam = queryParams.get('data');

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isSuccess, isError } = useVerifyVerificationIdQuery(dataParam);

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(false);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      navigate('/');
      setIsLoading(false);
    }
  }, [isError]);

  if (!dataParam) return <Navigate to={'/'} />;

  if (isLoading) return <Loader />;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
        <title>Sign In </title>
      </Helmet>
      <Grid
        container
        component="main"
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
      >
        <Grid
          sx={{
            height: {
              sm: '450px'
            },
            borderRadius: 2
          }}
          item
          xs={12}
          sm={6}
          md={4}
          xl={3}
          component={Paper}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h5" mb={1}>
              Update Your New Password!
            </Typography>
            <Typography component="p" variant="subtitle1" mb={1} align="center">
              You’re almost there! Enter a new password below to secure your
              account. Remember to make it strong and unique. Your security is
              our top priority!
            </Typography>
            <SetNewPasswordForm data={dataParam} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
