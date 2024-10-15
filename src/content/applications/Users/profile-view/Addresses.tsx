import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';

import { ArrowForwardTwoTone } from '@mui/icons-material';
import { useParams } from 'react-router';
import Loader from 'src/components/Loader';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';

function Addresses() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(id);
  if (isLoading) return <Loader />;
  const profile = data.data?.Profile;
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Addresses" subheader={'All saved addresses'} />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Present
            </Typography>
            <Box sx={{ minHeight: { xs: 0 } }} p={2}>
              <Typography variant="h5">{profile.address || '-'}</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                {profile.streetAddress || '-'}
              </Typography>
              <Typography variant="subtitle1">
                {profile.upzila || '-'} ,{profile.zila || '-'}
              </Typography>
            </Box>
          </Box>
          <Box p={2}>
            <Button
              fullWidth
              disabled
              variant="contained"
              endIcon={<ArrowForwardTwoTone />}
            >
              Manage
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Addresses;
