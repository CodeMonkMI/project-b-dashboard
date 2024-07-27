import CheckIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useGetRequestQuery } from 'src/redux/features/request/requestApiSlice';
import { useGetUserQuery } from 'src/redux/features/user/userApiSlice';
import { REQUEST_DATA_SERVER } from '../RequestTable';
const Top: React.FC<{ requestId: any; donorId?: any; requestItem: any }> = (
  props
) => {
  const { requestId } = props;
  const { data: requestData, isSuccess: isRequestSuccess } =
    useGetRequestQuery(requestId);
  useEffect(() => {
    if (isRequestSuccess) {
      console.log(requestData);
    }
  }, [isRequestSuccess]);

  const mainRequestData: REQUEST_DATA_SERVER | undefined = useMemo(():
    | REQUEST_DATA_SERVER
    | undefined => {
    if (!isRequestSuccess) return;
    return requestData.data;
  }, [isRequestSuccess, requestData]);

  const { data: userData, isSuccess: isUserSuccess } = useGetUserQuery(
    isRequestSuccess ? mainRequestData?.donor?.username : requestId,
    {
      skip: !isRequestSuccess
    }
  );
  const mainUserData: USER_DATA_SERVER | undefined = useMemo(():
    | USER_DATA_SERVER
    | undefined => {
    if (!isRequestSuccess) return;
    return userData.data;
  }, [isUserSuccess, userData]);

  return (
    <div>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{ mb: 4 }}
        gap={1}
      >
        <Box>
          <Typography variant="h3" component="h2">
            Requested Information
          </Typography>
          <Stack direction={'column'} gap={1}>
            {mainRequestData && (
              <>
                <Typography sx={{ mt: 1 }} variant="h5" component={'h4'}>
                  Blood:{' '}
                  <Box component={'span'} sx={{ color: 'red' }}>
                    {mainRequestData.blood}
                  </Box>
                </Typography>
                <Typography variant="h5" component={'h4'}>
                  Name: {mainRequestData.firstName} ${mainRequestData.lastName}
                </Typography>
                <Typography variant="h5" component={'h4'}>
                  Address: {mainRequestData.address}
                </Typography>
                <Typography variant="h5" component={'h4'}>
                  Phone Number: {mainRequestData.phone}
                </Typography>
              </>
            )}
          </Stack>
        </Box>
        <Box>
          {isUserSuccess && (
            <>
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
              >
                <CheckIcon />
              </Button>
            </>
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default Top;

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
