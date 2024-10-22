import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import SignInForm from './SignInForm';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
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
              sm: '490px'
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
            <Typography component="h1" variant="h4" mb={1}>
              Ready to Resume?
            </Typography>
            <Typography component="p" variant="subtitle1" mb={1} align="center">
              Your next great experience is just a login away
            </Typography>
            <SignInForm />
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" component={RouterLink} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
