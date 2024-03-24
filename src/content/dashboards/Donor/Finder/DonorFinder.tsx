import { Box, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import DonorFinderTable from './DonorFinderTable';
import AddUserForm from './Form';

const DonorFinder = () => {
  return (
    <div>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ pt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <Box sx={{ bgcolor: 'white', boxShadow: 3, p: 3 }}>
              <h2>Find Donor</h2>
              <AddUserForm />
              <h2>Donor List</h2>
              <DonorFinderTable />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default DonorFinder;
