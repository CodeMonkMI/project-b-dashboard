import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryIcon from '@mui/icons-material/History';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import {
  useGetAllRequestQuery,
  useMakeProgressRequestMutation
} from 'src/redux/features/request/requestApiSlice';
import { requestTableDateFormatter } from 'src/utils/dateFormatrer';
import SingleHistory from './SingleHistory';

const RequestTable = () => {
  const { data: requestData, isLoading, isError } = useGetAllRequestQuery();
  const [makeProgressRequest] = useMakeProgressRequestMutation();

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    return requestData.data
      .filter((a: REQUEST_DATA_SERVER) => a.status === 'completed')
      .map((a: REQUEST_DATA_SERVER, i: number): VisibleDataTypes => {
        return {
          sr: i + 1,
          id: a.id,
          fullName: `${a.firstName} ${a.lastName}`,
          blood: a.blood,
          phone: a.phone,
          completed: a.updatedAt,
          email: a.email,
          donor: JSON.stringify(a.donor.email)
        };
      });
  }, [requestData]);

  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);

  const historyOpen = (id: string) => {
    setIsHistoryOpen(id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <SingleHistory
        open={!!isHistoryOpen}
        handleClose={() => {
          setIsHistoryOpen(null);
        }}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns({ historyOpen, makeProgressRequest })}
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
};

const columns = (props: {
  historyOpen: (id: string) => void;
  makeProgressRequest: any;
}): GridColDef[] => {
  const { historyOpen, makeProgressRequest } = props;
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
      field: 'donor',
      headerName: 'Donor',
      width: 200
    },
    {
      field: 'phone',
      headerName: 'Phone No',
      width: 180
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200
    },
    {
      headerName: 'Donated At',
      field: 'completed',
      width: 230,
      renderCell: (params) => {
        return <div>{requestTableDateFormatter(params.row.completed)}</div>;
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
            <IconButton
              aria-label="edit"
              color="info"
              onClick={() => historyOpen(params.row.id)}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="error"
              onClick={() => makeProgressRequest(params.row.id)}
            >
              <ArrowBackIcon />
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
  fullName: string;
  blood: string;
  donor: string;
  phone: string;
  email: string;
  completed: string;
}

interface REQUEST_DATA_SERVER {
  address: string;
  blood: string;
  createdAt: string;
  updatedAt: string;
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
  donor: {
    id: string;
    username: string;
    email: string;
    Profile: {
      phoneNo: string | null;
    };
  };
}
