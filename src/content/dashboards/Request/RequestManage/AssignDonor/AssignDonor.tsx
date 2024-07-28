import CheckIcon from '@mui/icons-material/Check';
import { Box, Grid, IconButton, Modal, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import {
  useAssignDonorRequestMutation,
  useFindDonorMutation
} from 'src/redux/features/request/requestApiSlice';
import { REQUEST_DATA_SERVER } from '../RequestTable';
import Top from './Top';

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

interface DONOR_SINGLE_DATA_SERVER_TYPE {
  id: string;
  username: string;
  Profile: {
    bloodGroup: string;
    address?: string;
    zila?: string;
    upzila?: string;
    displayName?: string;
    phoneNo?: string;
    firstName: string;
    lastName: string;
  };
}

interface AssignDonorTypes {
  open: boolean;
  handleClose: () => void;
  blood: string;
  requestId: string;
  requestDate: string;
  requestItem: REQUEST_DATA_SERVER | undefined;
}

const AssignDonor: React.FC<AssignDonorTypes> = (props) => {
  // props
  const { open, handleClose, blood, requestId, requestDate, requestItem } =
    props;

  const [
    findDonor,
    { isSuccess: ifDonorFindSuccess, error, data: findDonorList }
  ] = useFindDonorMutation();

  useEffect(() => {
    if (blood && requestDate) {
      findDonor({ blood, date: requestDate });
    }
  }, [blood, requestDate]);

  const [assignDonor, { isSuccess }] = useAssignDonorRequestMutation();

  useEffect(() => {
    if (isSuccess) handleClose();
  }, [isSuccess]);

  const visibleRows = useMemo(() => {
    if (!ifDonorFindSuccess) return [];
    return (
      findDonorList?.data?.reduce(
        (acc: VisibleDataTypes[], a: DONOR_SINGLE_DATA_SERVER_TYPE) => {
          acc.push({
            sr: acc.length + 1,
            id: a.id,
            phoneNo: a.Profile.phoneNo || '-',
            fullName: `${a.Profile.firstName} ${a.Profile.lastName}`
          });

          return acc;
        },
        []
      ) || []
    );
  }, [findDonorList, blood, ifDonorFindSuccess]);
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
            <Top requestId={requestId} />
            <Typography variant="h3" component="h2" sx={{ mb: 1 }}>
              Founded Donors ({visibleRows.length})
            </Typography>
            <Grid container gap={2}>
              <DataGrid
                rows={visibleRows}
                columns={columns({
                  assignDonor: (userId: string) => {
                    assignDonor({ data: { donor: userId }, id: requestId });
                  }
                })}
                disableColumnMenu
                rowSelection={false}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 5, page: 0 }
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
