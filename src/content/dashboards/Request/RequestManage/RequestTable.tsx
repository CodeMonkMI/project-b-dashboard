import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import {
  useGetAllRequestQuery,
  useHoldStatusRequestMutation,
  useNextStatusRequestMutation,
  usePrevStatusRequestMutation
} from 'src/redux/features/request/requestApiSlice';
import { requestTableDateFormatter } from 'src/utils/dateFormatrer';
import AssignDonor from './AssignDonor';
import SingleHistory from './SingleHistory';
const RequestTable = () => {
  const { data: requestData, isLoading, isError } = useGetAllRequestQuery();
  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);
  const [isAssignedOpen, setIsAssignOpen] = useState<string | null>(null);
  const [prevStatusRequest] = usePrevStatusRequestMutation();
  const [nextStatusRequest] = useNextStatusRequestMutation();
  const [holdStatusRequest] = useHoldStatusRequestMutation();

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
          email: a.email,
          blood: a.blood,
          createdAt: a.createdAt,
          phoneNo: a.phone,
          status: a.status,
          date: a.date
        };
      });
  }, [requestData]);

  const assignedBlood = useMemo(() => {
    if (!isAssignedOpen) return '';
    const data: REQUEST_DATA_SERVER | undefined = requestData.data.find(
      (item: REQUEST_DATA_SERVER) => item.id === isAssignedOpen
    );
    if (!data) return '';
    return data.blood;
  }, [isAssignedOpen, requestData]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <SingleHistory
          open={!!isHistoryOpen}
          handleClose={() => {
            setIsHistoryOpen(null);
          }}
        />
        <AssignDonor
          open={!!isAssignedOpen}
          handleClose={() => {
            setIsAssignOpen(null);
          }}
          blood={assignedBlood}
          requestId={isAssignedOpen}
        />
        <DataGrid
          rows={visibleRows}
          columns={columns({
            historyOpen: setIsHistoryOpen,
            requestPrev: prevStatusRequest,
            requestNext: nextStatusRequest,
            requestHold: holdStatusRequest,
            assignedOpen: setIsAssignOpen
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
      </Paper>
    </Box>
  );
};

const columns = (props: {
  historyOpen: any;
  requestHold: any;
  requestNext: any;
  requestPrev: any;
  assignedOpen: any;
}): GridColDef[] => {
  const { historyOpen, requestNext, requestPrev, requestHold, assignedOpen } =
    props;
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
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => {
        const d = {
          request: 'error',
          verified: 'info',
          progress: 'warning',
          ready: 'primary',
          hold: 'secondary',
          completed: 'success',
          assigned: 'primary'
        };
        return (
          <div>
            <Button
              variant="contained"
              size="small"
              color={d[params.row.status]}
            >
              {params.row?.status?.toUpperCase()}
            </Button>
          </div>
        );
      }
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
      field: 'date',
      headerName: 'Donation Time',
      width: 230,
      renderCell: (params) => {
        return <div>{requestTableDateFormatter(params.row.date)}</div>;
        //   return <div>{params.row.createdAt}</div>;
      }
    },
    {
      field: 'phoneNo',
      headerName: 'Phone No',
      width: 180
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
            <IconButton
              aria-label="edit"
              color="primary"
              disabled={params.row.status === 'verified'}
              onClick={() => requestPrev(params.row.id)}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            {params.row.status !== 'ready' && (
              <IconButton
                aria-label="edit"
                color="primary"
                disabled={params.row.status === 'ready'}
                onClick={() => requestNext(params.row.id)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            )}
            {params.row.status === 'ready' && (
              <IconButton
                aria-label="edit"
                color="primary"
                disabled={params.row.status !== 'ready'}
                onClick={() => assignedOpen(params.row.id)}
              >
                <PersonAddAltIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="edit"
              color="error"
              onClick={() => requestHold(params.row.id)}
              disabled={params.row.status === 'hold'}
            >
              <BlockIcon />
            </IconButton>
            {params.row.status === 'assigned' && (
              <IconButton
                disabled={params.row.status !== 'ready'}
                aria-label="edit"
                color="success"
              >
                <CheckIcon />
              </IconButton>
            )}
          </Stack>
        );
      }
    }
  ];
};

export default RequestTable;

interface VisibleDataTypes {
  sr: number | string | any;
  id: number | string | any;
  fullName: string;
  date: string;
  status: string;
  blood: string;
  phoneNo: string;
  email: string;
  createdAt: string;
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
