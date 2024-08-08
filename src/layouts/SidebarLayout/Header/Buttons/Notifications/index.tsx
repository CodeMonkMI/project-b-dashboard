import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';

import { formatDistance } from 'date-fns';
import { useGetNotificationsQuery } from 'src/redux/features/notification/notificationApiSlice';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { data, isSuccess } = useGetNotificationsQuery();

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={isSuccess ? data.data.length : 0}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Notifications</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {isSuccess &&
            data.data.map((item: NotificationsTypes) => {
              return (
                <>
                  <Item
                    key={item.id}
                    id={item.id}
                    message={item.message}
                    createdAt={item.createdAt}
                  />
                  <Divider />
                </>
              );
            })}
        </List>
      </Popover>
    </>
  );
}

const Item: React.FC<NotificationsTypes> = (props) => {
  const { createdAt, id, message } = props;
  return (
    <ListItem sx={{ p: 2, width: 350, display: { xs: 'block', sm: 'flex' } }}>
      <Box flex="1">
        <Box display="flex" justifyContent="space-between">
          <Typography sx={{ fontWeight: 'bold' }}>
            You have got a message
          </Typography>
          <Typography variant="caption" sx={{ textTransform: 'none' }}>
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true
            })}
          </Typography>
        </Box>
        <Typography component="span" variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default HeaderNotifications;

export interface NotificationsTypes {
  createdAt: string;
  id: string;
  message: string;
}
