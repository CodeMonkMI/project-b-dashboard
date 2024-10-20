import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo } from 'react';
import {
  useGetUsersQuery,
  useRemoveUserMutation,
  useVerifyUserMutation
} from 'src/redux/features/user/userApiSlice';
import { userTableDateFormatter } from 'src/utils/dateFormatrer';

interface VisibleDataTypes {
  id: number | string | any;
  sr: number | string | any;
  username: string;
  email: string;
  blood: string;
  createdAt: string;
  fullName: string;
  phoneNo: string;
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
    phoneNo: string;
    bloodGroup: string;
  };
}

export default function EnhancedTable() {
  const { data: userData, isLoading, isSuccess, isError } = useGetUsersQuery();
  const [verifyUser] = useVerifyUserMutation();

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    return (
      userData?.data?.reduce((acc: VisibleDataTypes[], a: USER_DATA_SERVER) => {
        if (!a.isVerified) {
          acc.push({
            sr: acc.length + 1,
            id: a.id,
            username: a.username,
            email: a.email,
            blood: a.Profile.bloodGroup,
            createdAt: a.createdAt,
            phoneNo: a.Profile.phoneNo,
            fullName: `${a.Profile.firstName} ${a.Profile.lastName}`
          });
        }
        return acc;
      }, []) || []
    );
  }, [userData]);

  const [removeUser] = useRemoveUserMutation();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns(removeUser, verifyUser)}
          disableColumnMenu
          rowSelection={false}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }
            }
          }}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true
            }
          }}
        />
      </Paper>
    </Box>
  );
}

const columns = (removeUser: any, verifyUser: any): GridColDef[] => [
  {
    field: 'sr',
    headerName: 'No.',
    width: 100
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 250
  },
  {
    field: 'username',
    headerName: 'Username',
    width: 200
  },

  {
    field: 'phoneNo',
    headerName: 'Phone No',
    width: 200
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
    width: 100,
    renderCell: (params) => {
      return (
        <Stack spacing={0.5} direction="row">
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => verifyUser(params.row.username)}
          >
            <CheckIcon />
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
