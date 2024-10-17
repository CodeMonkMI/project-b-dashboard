import { Box, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useFindDonorMutation } from 'src/redux/features/request/requestApiSlice';
import DonorFinderTable from './DonorFinderTable';
import FindDonorForm from './Form';

const DonorFinder = () => {
  const [findDonor, { isLoading, isSuccess, isError, error, data }] =
    useFindDonorMutation();
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
              <FindDonorForm
                findDonor={findDonor}
                {...{ isLoading, isSuccess, isError, error }}
              />
              {isSuccess && data.data.length > 0 && (
                <>
                  <h2>Donor List</h2>
                  <DonorFinderTable data={data.data} />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default DonorFinder;
