import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@mui/material';

import { useParams } from 'react-router';
import Loader from 'src/components/Loader';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';
import Addresses from './Addresses';
import Contribution from './Contribution';
import ProfileCover from './ProfileCover';
import useAuthProfile from './useAuthProfile';

const ViewProfile = () => {
  let { id } = useParams<{ id: string }>();

  const { isAuthProfile, me } = useAuthProfile();

  const { data, isLoading } = useGetUserQuery(id);

  if (isLoading) return <Loader />;
  const userData = data.data;
  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="start"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover
              name={`${userData?.Profile?.firstName} ${userData?.Profile?.lastName}`}
              avatar=""
              coverImg="/static/images/placeholders/covers/5.jpg"
              description=""
              blood={userData?.Profile?.bloodGroup || ''}
            />
            <Addresses />
          </Grid>
          <Grid item xs={12} md={4}>
            <Contribution />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ViewProfile;
