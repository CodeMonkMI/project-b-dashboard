import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useRemoveUserMutation
} from 'src/redux/features/user/userApiSlice';
import { userTableDateFormatter } from 'src/utils/dateFormatrer';

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

export default function EnhancedTable() {
  const { data: userData, isLoading, isSuccess, isError } = useGetUsersQuery();

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

  const [removeUser] = useRemoveUserMutation();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns(removeUser)}
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
}

const columns = (removeUser: any): GridColDef[] => [
  {
    field: 'sr',
    headerName: 'No.',
    width: 100
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 150
  },
  {
    field: 'phoneNo',
    headerName: 'Phone No',
    width: 150
  },
  {
    field: 'lastDonation',
    headerName: 'Last Donation',
    width: 150
  },
  {
    field: 'email',
    headerName: 'email',
    width: 250
  },
  {
    field: 'blood',
    headerName: 'blood',
    width: 120,
    renderCell: (params) => {
      return (
        <div>
          {params.row.blood.replace('_POSITIVE', '+').replace('_NEGATIVE', '-')}
        </div>
      );
    }
  },
  {
    field: 'role',
    headerName: 'role',
    width: 100
  },
  {
    field: 'createdAt',
    headerName: 'createdAt',
    width: 150,
    renderCell: (params) => {
      return <div>{userTableDateFormatter(params.row.createdAt)}</div>;
    }
  },
  {
    field: 'id',
    headerName: 'Action',
    sortable: false,
    width: 350,
    renderCell: (params) => {
      return (
        <Stack spacing={0.5} direction="row">
          <Link to={`/dashboards/users/view/${params.row.username}`}>
            <IconButton aria-label="edit" color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="edit" color="primary">
            <BlockIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            color="error"
            onClick={() => removeUser(params.row.username)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      );
    }
  }
];
