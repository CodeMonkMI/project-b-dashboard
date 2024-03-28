import { Box, Button, lighten, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

export const UserBoxButton = styled(Button)(
  ({ theme }) => `
          padding-left: ${theme.spacing(1)};
          padding-right: ${theme.spacing(1)};
  `
);

export const MenuUserBox = styled(Box)(
  ({ theme }) => `
          background: ${theme.colors.alpha.black[5]};
          padding: ${theme.spacing(2)};
  `
);

export const UserBoxText = styled(Box)(
  ({ theme }) => `
          text-align: left;
          padding-left: ${theme.spacing(1)};
  `
);

export const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
          font-weight: ${theme.typography.fontWeightBold};
          color: ${theme.palette.secondary.main};
          display: block;
  `
);

export const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
          color: ${lighten(theme.palette.secondary.main, 0.5)}
  `
);
