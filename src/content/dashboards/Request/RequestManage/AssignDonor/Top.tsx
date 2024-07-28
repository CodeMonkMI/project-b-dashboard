import { Box, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useGetRequestQuery } from 'src/redux/features/request/requestApiSlice';
import { REQUEST_DATA_SERVER } from '../RequestTable';
import SelectedDonor from './SelectedDonor';
const Top: React.FC<{ requestId: any }> = (props) => {
  const { requestId } = props;
  const { data: requestData, isSuccess: isRequestSuccess } =
    useGetRequestQuery(requestId);

  const mainRequestData: REQUEST_DATA_SERVER | undefined = useMemo(():
    | REQUEST_DATA_SERVER
    | undefined => {
    if (!isRequestSuccess) return;
    return requestData.data;
  }, [isRequestSuccess, requestData]);

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
          {mainRequestData?.donor && (
            <SelectedDonor
              donorUsername={mainRequestData.donor.username}
              requestId={requestId}
            />
          )}
        </Box>
      </Stack>
    </div>
  );
};

export default Top;
