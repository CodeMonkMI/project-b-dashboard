import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import ForgotPasswordForm from './ForgotPasswordForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
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
              sm: '380px'
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
            <Typography component="h2" variant="h4" mb={1}>
              Forgot Your Password?
            </Typography>
            <Typography component="p" variant="subtitle1" align="center">
              It happens to the best of us! Enter your email below, and we'll
              guide you through the steps to create a new password. Your account
              security is our priority!
            </Typography>

            <ForgotPasswordForm />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
