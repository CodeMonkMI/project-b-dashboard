import { Box, Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import AddUserForm from './Form';

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
          <Grid item xs={6}>
            <Box sx={{ bgcolor: 'white', boxShadow: 3, p: 3 }}>
              <h2>Add user</h2>
              <AddUserForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AddUser;
