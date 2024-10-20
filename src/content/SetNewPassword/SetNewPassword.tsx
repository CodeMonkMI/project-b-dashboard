import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
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
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={8}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color={'red'}
            >
              Set new password.
            </Typography>
            <SetNewPasswordForm data={dataParam} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
