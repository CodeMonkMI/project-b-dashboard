import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';

import { ArrowForwardTwoTone } from '@mui/icons-material';

function Addresses() {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Addresses" subheader={'All saved addresses'} />
          <Divider />
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Present
            </Typography>
            <Box sx={{ minHeight: { xs: 0 } }} p={2}>
              <Typography variant="h5">Kadin Westervelt</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                348 W. Goldfield Street Bethel Park, PA 15102
              </Typography>
            </Box>
          </Box>
          <Box p={2}>
            <Typography variant="caption" fontWeight="bold">
              Permanent
            </Typography>
            <Box sx={{ minHeight: { xs: 0, md: 4 } }} p={2}>
              <Typography variant="h5">Kadin Westervelt</Typography>
              <Typography variant="h5" sx={{ py: 1 }} fontWeight="normal">
                714-650-6297
              </Typography>
              <Typography variant="subtitle1">
                348 W. Goldfield Street Bethel Park, PA 15102
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              endIcon={<ArrowForwardTwoTone />}
            >
              Manage
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Addresses;
