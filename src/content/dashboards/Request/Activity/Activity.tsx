import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import ActivityTable from './ActivityTable';

const History = () => {
  return (
    <div>
      <Helmet>
        <title>History</title>
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
            <ActivityTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default History;
