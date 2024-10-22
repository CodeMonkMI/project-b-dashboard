import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import VerifyOtpForm from './VerifyOtpForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function VerifyOtp() {
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
            borderRadius: 2,
            height: {
              sm: '370px'
            }
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
              Verify Your Identity!
            </Typography>
            <Typography component="p" variant="subtitle1" align="center">
              We sent a one-time password (OTP) to your email/phone. Enter it
              below to verify your identity and gain access to your account.
              Your security is our priority!
            </Typography>
            <VerifyOtpForm />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
