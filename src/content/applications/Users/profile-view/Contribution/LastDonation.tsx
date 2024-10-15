import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Box, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router';
import Loader from 'src/components/Loader';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';
import { activityTableDateFormatter } from 'src/utils/dateFormatrer';
import { AvatarPrimary } from './Contribution';

const LastDonation = () => {
  const theme = useTheme();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetUserQuery(id);
  if (isLoading) return <Loader />;
  const profile = data.data?.Profile;

  return (
    <>
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <VolunteerActivismIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Last Donated</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                {profile.lastDonation
                  ? activityTableDateFormatter(profile.lastDonation)
                  : '-'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LastDonation;
