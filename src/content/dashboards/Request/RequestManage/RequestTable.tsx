import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from 'src/components/Loader';
import {
  useCompleteRequestMutation,
  useGetAllRequestQuery,
  useHoldStatusRequestMutation,
  useMakeProgressRequestMutation,
  useRemoveRequestMutation
} from 'src/redux/features/request/requestApiSlice';
import { requestTableDateFormatter } from 'src/utils/dateFormatrer';
import AssignDonor from './AssignDonor';
import SingleHistory from './SingleHistory';

const RequestTable = () => {
  const { data: requestData, isLoading, isError } = useGetAllRequestQuery();

  const { me } = useSelector((state: any) => state.auth);

  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);
  const [isAssignedOpen, setIsAssignOpen] = useState<string | null>(null);
  const [makeProgressRequest] = useMakeProgressRequestMutation();
  const [holdStatusRequest] = useHoldStatusRequestMutation();
  const [deleteRequest] = useRemoveRequestMutation();
  const [completeRequest] = useCompleteRequestMutation();
  const [filterModel, setFilterModel] = useState({ items: [] }); // Add state for filter model

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    const data: VisibleDataTypes[] = requestData.data.reduce(
      (acc: VisibleDataTypes[], cur: REQUEST_DATA_SERVER) => {
        if (
          cur.status === 'progress' ||
          cur.status === 'ready' ||
          cur.status === 'hold'
        ) {
          acc.push({
            sr: acc.length + 1,
            id: cur.id,
            fullName: `${cur.firstName} ${cur.lastName}`,
            email: cur.email,
            blood: cur.blood,
            createdAt: cur.createdAt,
            phoneNo: cur.phone,
            status: cur.status,
            date: cur.date,
            donorPhoneNo: cur.donor ? cur.donor?.Profile?.phoneNo || '-' : 'NA'
          });
        }
        return acc;
      },
      []
    );
    return data;
  }, [requestData]);

  const assignedBlood = useMemo(() => {
    if (!isAssignedOpen) return '';
    const data: REQUEST_DATA_SERVER | undefined = requestData?.data?.find(
      (item: REQUEST_DATA_SERVER) => item.id === isAssignedOpen
    );
    if (!data) return '';
    return data.blood;
  }, [isAssignedOpen, requestData]);

  const requestItem: REQUEST_DATA_SERVER | undefined = useMemo(():
    | REQUEST_DATA_SERVER
    | undefined => {
    if (!isAssignedOpen) return;
    const data: REQUEST_DATA_SERVER | undefined = requestData?.data?.find(
      (item: REQUEST_DATA_SERVER) => item.id === isAssignedOpen
    );
    return data;
  }, [isAssignedOpen, requestData]);

  if (isLoading) return <Loader />;

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
          requestItem={requestItem}
          requestDate={requestItem?.date}
        />
        <DataGrid
          rows={visibleRows}
          columns={columns({
            historyOpen: setIsHistoryOpen,
            makeProgressRequest,
            requestHold: holdStatusRequest,
            assignedOpen: setIsAssignOpen,
            completeRequest,
            deleteRequest,
            me
          })}
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

interface ColumnProps {
  historyOpen: any;
  requestHold: any;
  makeProgressRequest: any;
  assignedOpen: any;
  completeRequest: any;
  deleteRequest: any;
  me: {
    role: {
      role: string;
    };
  };
}

const columns = (props: ColumnProps): GridColDef[] => {
  const {
    historyOpen,
    makeProgressRequest,
    requestHold,
    assignedOpen,
    completeRequest,
    deleteRequest,
    me
  } = props;
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
          request: 'warning',
          progress: 'info',
          ready: 'primary',
          hold: 'secondary',
          completed: 'success'
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
      field: 'donorPhoneNo',
      headerName: 'Donor Phone No',
      width: 150
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
            {me?.role?.role === 'super_admin' && (
              <>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  disabled={params.row.status === 'progress'}
                  onClick={() => makeProgressRequest(params.row.id)}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>

                <IconButton
                  aria-label="edit"
                  color="primary"
                  disabled={
                    params.row.status !== 'progress' &&
                    params.row.status !== 'ready'
                  }
                  onClick={() => assignedOpen(params.row.id)}
                >
                  <PersonAddAltIcon />
                </IconButton>

                <IconButton
                  aria-label="edit"
                  color="secondary"
                  onClick={() => requestHold(params.row.id)}
                  disabled={params.row.status === 'hold'}
                >
                  <BlockIcon />
                </IconButton>
              </>
            )}

            <IconButton
              aria-label="edit"
              color="error"
              onClick={() => deleteRequest(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>

            {me?.role?.role === 'super_admin' && (
              <IconButton
                disabled={params.row.status !== 'ready'}
                aria-label="edit"
                color="success"
                onClick={() => completeRequest(params.row.id)}
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
  donorPhoneNo: string;
}

export interface REQUEST_DATA_SERVER {
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
  donor: {
    id: string;
    username: string;
    email: string;
    Profile: {
      phoneNo: string | null;
    };
  };
}
