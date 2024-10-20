import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import RequestTable from './Table';

const RequestPending = () => {
  return (
    <div>
      <Helmet>
        <title>Donor Request</title>
      </Helmet>
      <Container maxWidth="xl" sx={{ pt: 5 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            <RequestTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default RequestPending;
