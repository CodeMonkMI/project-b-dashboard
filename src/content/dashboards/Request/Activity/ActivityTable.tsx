import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import { useGetAllActivityQuery } from 'src/redux/features/request/requestApiSlice';
import { activityTableDateFormatter } from 'src/utils/dateFormatrer';
interface VisibleDataTypes {
  id: number | string | any;
  date: string;
  type: string;
  description: string;
}

interface ACTIVITY_DATA_SERVER {
  createdAt: string;
  message: string;
  type: string;
  id: string;
}

const ActivityTable = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);

  const {
    data: activityData,
    isSuccess,
    isLoading,
    isError
  } = useGetAllActivityQuery();

  const visibleRows: VisibleDataTypes[] = useMemo<VisibleDataTypes[]>(() => {
    if (isLoading || isError) return [];
    // return [];
    return activityData.data.map((a: ACTIVITY_DATA_SERVER, i: number) => {
      return {
        date: a.createdAt,
        type: a.type,
        description: a.message,
        id: a.id
      };
    });
  }, [isLoading, isError, activityData]);

  const historyOpen = (id: string) => {
    setIsHistoryOpen(id);
  };
  const requestUp = (id: string) => {};
  const requestDown = (id: string) => {};

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DataGrid
          rows={visibleRows}
          columns={columns({ historyOpen, requestDown, requestUp })}
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
  historyOpen: any;
  requestUp: any;
  requestDown: any;
}): GridColDef[] => {
  const { historyOpen } = props;
  return [
    {
      field: 'date',
      headerName: 'Time',
      width: 220,
      renderCell: (params) => {
        return activityTableDateFormatter(params.row.date);
      }
    },
    {
      field: 'type',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => {
        const d = {
          request: 'warning',
          progress: 'info',
          ready: 'primary',
          hold: 'secondary',
          completed: 'success',
          declined: 'error',
          deleted: 'error'
        };
        return (
          <div>
            <Button
              sx={{ minWidth: 120 }}
              variant="contained"
              size="small"
              color={d[params.row.type]}
            >
              {params.row?.type?.toUpperCase()}
            </Button>
          </div>
        );
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1
    }
  ];
};

export default ActivityTable;
