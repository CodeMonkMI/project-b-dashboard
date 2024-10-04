import { Grid } from '@mui/material';

import AccountDetails from './AccountSettings';
import PersonalDetails from './PersonalDeatils';
import UpdatePassword from './UpdatePassword';

function EditProfile() {
  return (
    <Grid container spacing={3}>
      <PersonalDetails />
      <AccountDetails />
      <UpdatePassword />
    </Grid>
  );
}

export default EditProfile;
