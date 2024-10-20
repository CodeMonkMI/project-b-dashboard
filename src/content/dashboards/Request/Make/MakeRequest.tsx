import { Box, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import RequestForm from './Form';

const MakeRequest = () => {
  return (
    <div>
      <Helmet>
        <title>Make a request</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ pt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={6}>
            <Box sx={{ bgcolor: 'white', boxShadow: 3, p: 3, mb: 4 }}>
              <h2>Need a blood? Make a request</h2>
              <RequestForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MakeRequest;
