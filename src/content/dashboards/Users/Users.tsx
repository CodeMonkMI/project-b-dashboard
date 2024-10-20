import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import UsersTable from './UsersTable';
const Users = () => {
  return (
    <div>
      <Helmet>
        <title>Users</title>
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
            <UsersTable />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Users;
