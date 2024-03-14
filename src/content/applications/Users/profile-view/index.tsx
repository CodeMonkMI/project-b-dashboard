import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@mui/material';

import { useParams } from 'react-router';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';
import Addresses from './Addresses';
import Contribution from './Contribution';
import ProfileCover from './ProfileCover';

function ViewProfile() {
  const dummyUser = {
    savedCards: 7,
    name: 'Catherine Pike',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/4.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(id);

  if (isLoading) return <h3></h3>;
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
          </Grid>
          <Grid item xs={12} md={4}>
            <Contribution
              lastDonation={userData?.Profile?.lastDonation || 'Unknown'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Addresses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ViewProfile;
