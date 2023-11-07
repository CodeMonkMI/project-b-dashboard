import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const AddUser = () => {
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
            <h2>Add user</h2>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddUser;
