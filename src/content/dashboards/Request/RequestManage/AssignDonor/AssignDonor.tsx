import CheckIcon from '@mui/icons-material/Check';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Stack
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import { useAssignDonorRequestMutation } from 'src/redux/features/request/requestApiSlice';
import { useGetUsersQuery } from 'src/redux/features/user/userApiSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 2
};

const AssignDonor: React.FC<{
  open: boolean;
  handleClose: () => void;
  blood: string;
  requestId: string;
}> = ({ open, handleClose, blood, requestId }) => {
  const { data, isLoading, isError } = useGetUsersQuery();
  const [assignDonor, { isSuccess }] = useAssignDonorRequestMutation();

  useEffect(() => {
    if (isSuccess) handleClose();
  }, [isSuccess]);

  const visibleRows = useMemo(() => {
    if (isLoading || isError) return [];
    return (
      data?.data?.reduce(
        (acc: VisibleDataTypes[], a: USER_DATA_SERVER, i: number) => {
          if (a.isVerified && a.Profile.bloodGroup === blood) {
            acc.push({
              sr: acc.length + 1,
              id: a.id,
              phoneNo: a.Profile.phoneNo,
              fullName: `${a.Profile.firstName} ${a.Profile.lastName}`
            });
          }
          return acc;
        },
        []
      ) || []
    );
  }, [data, blood]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 780 }}>
          <Box sx={{ position: 'relative' }}>
            <p>{requestId}</p>
            <Stack
              direction={'row'}
              sx={{ mb: 4 }}
              gap={2}
              justifyContent={'space-between'}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ height: 120, width: 120 }}
              />
              <Box component={'div'}>
                <p>Name: </p>
                <p>Address</p>
                <p>Phone Number</p>
                <p></p>
              </Box>
              <Box component={'div'}>
                <Stack direction={'column'} gap={2}>
                  <Button variant="contained" color="primary" size="small">
                    Deselect
                  </Button>
                </Stack>
              </Box>
            </Stack>
            <Grid container gap={2}>
              <DataGrid
                rows={visibleRows}
                columns={columns({
                  assignDonor: (user: string) => {
                    assignDonor({ data: { donor: user }, id: requestId });
                  }
                })}
                disableColumnMenu
                rowSelection={false}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 }
                  }
                }}
              />
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
interface VisibleDataTypes {
  id: number | string | any;
  sr: number | string | any;
  phoneNo: string;
  fullName: string;
}
interface USER_DATA_SERVER {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  isVerified: boolean;
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

const columns = (props: { assignDonor: any }): GridColDef[] => {
  const { assignDonor } = props;
  return [
    {
      field: 'sr',
      headerName: 'No.',
      width: 80
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 300
    },
    {
      field: 'phoneNo',
      headerName: 'Phone No',
      width: 200
    },
    {
      field: 'id',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <Stack spacing={0.5} direction="row">
            <IconButton
              aria-label="edit"
              color="success"
              onClick={() => assignDonor(params.row.id)}
            >
              <CheckIcon />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
};

export default AssignDonor;
