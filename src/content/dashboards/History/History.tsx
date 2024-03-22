import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import HistoryTable from './HistoryTable';

const History = () => {
  return (
    <div>
      <Helmet>
        <title>History</title>
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
            <HistoryTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default History;
