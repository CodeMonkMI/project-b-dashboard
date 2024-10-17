import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import HistoryIcon from '@mui/icons-material/History';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';

interface VisibleDataTypes {
  id: number | string | any;
  blood: string;
  fullName: string;
  phoneNo: string;
  address: string;
}

interface USER_DATA_SERVER {
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

const DonorFinderTable: React.FC<{
  data: USER_DATA_SERVER[];
}> = (props) => {
  const { data } = props;
  const donors = data;
  const [isHistoryOpen, setIsHistoryOpen] = useState<string | null>(null);

  const visibleRows: VisibleDataTypes[] = useMemo<
    VisibleDataTypes[]
  >((): VisibleDataTypes[] => {
    return donors.map((a: USER_DATA_SERVER, i: number) => {
      const {
        firstName,
        lastName,
        bloodGroup,
        address,
        upzila,
        zila,
        phoneNo,
        displayName
      } = a?.Profile || {};
      return {
        sr: i + 1,
        id: a?.id,
        blood: bloodGroup,
        fullName: displayName || `${firstName} ${lastName}`,
        phoneNo: phoneNo || '-',
        address: `${address || '-'} ${upzila || '-'} ${zila || '-'}` || ''
      };
    });
  }, [donors]);
  console.table(visibleRows);
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
