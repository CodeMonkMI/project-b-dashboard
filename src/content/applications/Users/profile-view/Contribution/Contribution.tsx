import HandshakeIcon from '@mui/icons-material/Handshake';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import { useParams } from 'react-router';
import Loader from 'src/components/Loader';
import { useGetUserRequestContributionQuery } from 'src/redux/features/request/requestApiSlice';
import LastDonation from './LastDonation';

export const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

const Contribution = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isSuccess, isError } =
    useGetUserRequestContributionQuery(id);

  interface StatsTypes {
    donation: {
      total: string | number;
      month: string | number;
    };
    ref: {
      total: string | number;
      month: string | number;
    };
  }

  if (isLoading) return <Loader />;
  const stats: StatsTypes = data.data;
  return (
    <Card>
      <CardHeader title="All Time Contribution" />
      <Divider />
      <LastDonation />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <HandshakeIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Donation</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{stats.donation.total}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                This Month
              </Typography>
              <Typography variant="h2">{stats.donation.month}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <HandshakeIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">References</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                Total
              </Typography>
              <Typography variant="h2">{stats.ref.total}</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                This Month
              </Typography>
              <Typography variant="h2">{stats.ref.month}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </Card>
  );
};

export default Contribution;
