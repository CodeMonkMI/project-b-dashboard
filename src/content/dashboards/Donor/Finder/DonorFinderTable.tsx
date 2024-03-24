import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useGetUsersQuery } from 'src/redux/features/user/userApiSlice';

import data from './data';
interface VisibleDataTypes {
  id: number | string | any;
  username: string;
  email: string;
  role: string;
  blood: string;
  createdAt: string;
  fullName: string;
  phoneNo: string;
  lastDonation: string;
}

interface USER_DATA_SERVER {
  id: String;
  username: String;
  email: String;
  createdAt: String;
  Profile: {
    firstName: String;
    lastName: String;
    displayName: String;
    fatherName: String;
    motherName: String;
    address: String;
    streetAddress: String;
    upzila: String;
    zila: String;
    phoneNo: String;
    lastDonation: String;
    bloodGroup: String;
    image: String;
  };
  role: {
    name: String;
    role: String;
  };
}

const DonorFinderTable = () => {
  const { data: userData, isLoading, isSuccess, isError } = useGetUsersQuery();
  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    return userData.data.map((a: USER_DATA_SERVER, i: number) => {
      return {
        sr: i + 1,
        id: a.id,
        username: a.username,
        email: a.email,
        role: a.role.name,
        blood: a.Profile.bloodGroup,
        createdAt: a.createdAt,
        phoneNo: a.Profile.phoneNo,
        fullName: `${a.Profile.firstName} ${a.Profile.lastName}`,
        lastDonation: a?.Profile?.lastDonation || 'Unknown'
      };
    });
  }, [userData]);

  const historyOpen = (id: string) => {
    setIsHistoryOpen(id);
  };
  const requestUp = (id: string) => {};
  const requestDown = (id: string) => {};

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={data}
          columns={columns({ historyOpen, requestDown, requestUp })}
          disableColumnMenu
          rowSelection={false}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }
            }
          }}
        />
      </Paper>
    </Box>
  );
};

const columns = (props: {
  historyOpen: any;
  requestUp: any;
  requestDown: any;
}): GridColDef[] => {
  const { historyOpen } = props;
  return [
    {
      field: 'sr',
      headerName: 'No.',
      width: 80
    },
    {
      field: 'blood',
      headerName: 'Blood',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.blood
              .replace('_POSITIVE', '+')
              .replace('_NEGATIVE', '-')}
          </div>
        );
      }
    },

    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200
    },

    {
      field: 'phoneNo',
      headerName: 'Phone No',
      width: 180
    },
    {
      field: 'id',
      headerName: 'Action',
      sortable: false,
      width: 300,
      renderCell: (params) => {
        return (
          <Stack spacing={0.5} direction="row">
            {/* <Link to={`/dashboards/users/view/${params.row.username}`}> */}
            <IconButton
              aria-label="edit"
              color="info"
              onClick={() => {
                historyOpen(params.row.id);
              }}
            >
              <HistoryIcon />
            </IconButton>
            {/* </Link> */}
            <IconButton aria-label="edit" color="primary">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton aria-label="edit" color="warning">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton aria-label="edit" color="error">
              <BlockIcon />
            </IconButton>
            <IconButton aria-label="edit" color="success">
              <CheckIcon />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
};

export default DonorFinderTable;
