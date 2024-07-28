import CheckIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useMakeProgressRequestMutation } from 'src/redux/features/request/requestApiSlice';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';

const SelectedDonor: React.FC<{ donorUsername: string; requestId: string }> = ({
  donorUsername,
  requestId
}) => {
  const { data: userData, isSuccess: isUserSuccess } =
    useGetUserQuery(donorUsername);
  const mainUserData: USER_DATA_SERVER | undefined = useMemo(():
    | USER_DATA_SERVER
    | undefined => {
    if (!isUserSuccess) return;
    return userData.data;
  }, [isUserSuccess, userData]);

  const [makeProgressRequest, { isSuccess }] = useMakeProgressRequestMutation();

  return (
    <div>
      <Typography variant="h3" component="h2">
        Selected Donor
      </Typography>
      <Stack direction={'column'} sx={{ mt: 1 }} gap={1}>
        <Typography sx={{ mt: 1 }} variant="h5" component={'h4'}>
          Blood:{' '}
          <Box component={'span'} sx={{ color: 'red' }}>
            {mainUserData?.Profile.bloodGroup}
          </Box>
        </Typography>
        <Typography variant="h5" component={'h4'}>
          Name: {mainUserData?.Profile.firstName} $
          {mainUserData?.Profile.lastName}
        </Typography>
        <Typography variant="h5" component={'h4'}>
          Address: {mainUserData?.Profile.address}
        </Typography>
        <Typography variant="h5" component={'h4'}>
          Phone Number: {mainUserData?.Profile.phoneNo}
        </Typography>
      </Stack>
      <Button
        variant="contained"
        size="small"
        aria-label="edit"
        color="error"
        sx={{ mt: 2 }}
        onClick={() => {
          makeProgressRequest(requestId);
        }}
      >
        <CheckIcon />
      </Button>
    </div>
  );
};

export default SelectedDonor;

interface USER_DATA_SERVER {
  id: string;
  username: string;
  email: string;
  createdAt: string;

  Profile: {
    firstName: string;
    lastName: string;
    displayName: string;
    fatherName: string;
    motherName: string;
    address: string;
    streetAddress: string;
    upzila: string;
    zila: string;
    phoneNo: string;
    lastDonation: string;
    bloodGroup: string;
    image: string;
  };
  role: {
    name: string;
    role: string;
  };
}
