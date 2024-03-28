import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  useGetUsersQuery,
  useRemoveUserMutation
} from 'src/redux/features/user/userApiSlice';
import { userTableDateFormatter } from 'src/utils/dateFormatrer';

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

export default function EnhancedTable() {
  const { data: userData, isLoading, isSuccess, isError } = useGetUsersQuery();
  const { me } = useSelector((state: any) => state.auth);
  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    return (
      userData?.data?.reduce(
        (acc: VisibleDataTypes[], a: USER_DATA_SERVER, i: number) => {
          if (a.isVerified) {
            acc.push({
              sr: acc.length + 1,
              id: a.id,
              username: a.username,
              email: a.email,
              role: a.role.name,
              blood: a.Profile.bloodGroup,
              createdAt: a.createdAt,
              phoneNo: a.Profile.phoneNo,
              fullName: `${a.Profile.firstName} ${a.Profile.lastName}`,
              lastDonation: a?.Profile?.lastDonation || '-'
            });
          }
          return acc;
        },
        []
      ) || []
    );
  }, [userData]);

  const [removeUser] = useRemoveUserMutation();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns(removeUser, me)}
          disableColumnMenu
          rowSelection={false}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          columnVisibilityModel={{
            role: me?.role?.role === 'super_admin'
          }}
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

interface VisibleDataTypes {
  id: number | string | any;
  sr: number | string | any;
  phoneNo: string;
  lastDonation: string;
  email: string;
  blood: string;
  role: string;
  createdAt: string;
  fullName: string;
  username: string;
}

const columns = (
  removeUser: any,
  me: { role: { role: string } }
): GridColDef[] => [
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
    width: me?.role?.role === 'super_admin' ? 350 : 100,
    renderCell: (params) => {
      return (
        <Stack spacing={0.5} direction="row">
          <Link to={`/dashboards/users/view/${params.row.username}`}>
            <IconButton aria-label="edit" color="primary">
              <RemoveRedEyeIcon />
            </IconButton>
          </Link>
          {me?.role?.role === 'super_admin' && (
            <>
              <IconButton aria-label="edit" color="primary">
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton aria-label="edit" color="warning">
                <ArrowDownwardIcon />
              </IconButton>
              <IconButton
                disabled={params.row.role === 'Super Admin'}
                aria-label="Suspend"
                color="primary"
                title="Suspend"
              >
                <BlockIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                color="error"
                title="Delete"
                disabled={params.row.role === 'Super Admin'}
                onClick={() => removeUser(params.row.username)}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Stack>
      );
    }
  }
];
