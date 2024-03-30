import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { useGetAllRequestQuery } from 'src/redux/features/request/requestApiSlice';
import { requestTableDateFormatter } from 'src/utils/dateFormatrer';

const RequestTable = () => {
  const { data: requestData, isLoading, isError } = useGetAllRequestQuery();

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    return requestData.data
      .filter((a: REQUEST_DATA_SERVER) => {
        return a.status !== 'request' && a.status !== 'completed';
      })
      .map((a: REQUEST_DATA_SERVER, i: number): VisibleDataTypes => {
        return {
          sr: i + 1,
          id: a.id,
          fullName: `${a.firstName} ${a.lastName}`,
          blood: a.blood,
          phone: a.phone,
          date: a.date,
          createdAt: a.createdAt,
          email: a.email
        };
      });
  }, [requestData]);

  const approveRequest = (id: string) => {};
  const declineRequest = (id: string) => {};

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns({ declineRequest, approveRequest })}
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
  approveRequest: (id: string) => void;
  declineRequest: (id: string) => void;
}): GridColDef[] => {
  const { approveRequest, declineRequest } = props;
  return [
    {
      field: 'sr',
      headerName: 'No.',
      width: 80
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 200
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
      field: 'phone',
      headerName: 'Phone No',
      width: 180
    },

    {
      field: 'date',
      headerName: 'Donation Time',
      width: 230,
      renderCell: (params) => {
        return <div>{requestTableDateFormatter(params.row.date)}</div>;
        //   return <div>{params.row.createdAt}</div>;
      }
    },
    {
      headerName: 'Request At',
      field: 'createdAt',
      width: 230,
      renderCell: (params) => {
        return <div>{requestTableDateFormatter(params.row.createdAt)}</div>;
        //   return <div>{params.row.createdAt}</div>;
      }
    },
    {
      field: 'id',
      headerName: 'Action',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Stack spacing={0.5} direction="row">
            <IconButton aria-label="edit" color="success">
              <CheckIcon />
            </IconButton>
            <IconButton aria-label="edit" color="error">
              <BlockIcon />
            </IconButton>
          </Stack>
        );
      }
    }
  ];
};

export default RequestTable;
interface VisibleDataTypes {
  id: number | string | any;
  sr: number | string | any;
  email: string;
  blood: string;
  createdAt: string;
  fullName: string;
  phone: string;
  date: string;
}

interface REQUEST_DATA_SERVER {
  address: string;
  blood: string;
  createdAt: string;
  date: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  phone: string;
  reason: string;
  status: string;
  requestedBy: {
    username: string;
    Profile: {
      firstName: string;
      lastName: string;
    };
  };
}
