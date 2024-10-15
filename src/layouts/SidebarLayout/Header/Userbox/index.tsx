import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Divider,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Popover
} from '@mui/material';

import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import Loader from 'src/components/Loader';
import { useGetMeQuery } from 'src/redux/features/auth/authApiSlice';
import SignOut from './SignOut';
import {
  MenuUserBox,
  UserBoxButton,
  UserBoxDescription,
  UserBoxLabel,
  UserBoxText
} from './styled';

function HeaderUserbox() {
  const { data, isLoading, isSuccess } = useGetMeQuery();
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    jobtitle: 'Project Manager'
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={`${data.data.Profile.firstName} ${data.data.Profile.lastName}`}
          src={
            data.data.Profile.image ||
            `https://ui-avatars.com/api/?name=${`${data.data.Profile.firstName} ${data.data.Profile.lastName}`}&size=200`
          }
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {data.data.Profile.firstName} {data.data.Profile.lastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {data.data.role.name}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
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
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={`${data.data.Profile.firstName} ${data.data.Profile.lastName}`}
            src={
              data.data.Profile.image ||
              `https://ui-avatars.com/api/?name=${`${data.data.Profile.firstName} ${data.data.Profile.lastName}`}&size=200`
            }
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {data.data.Profile.firstName} {data.data.Profile.lastName}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              {data.data.role.name}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            button
            to={`/management/profile/${data.data.username}`}
            component={NavLink}
            onClick={() => {
              setOpen(false);
            }}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>

          <ListItem
            button
            to="/management/settings"
            component={NavLink}
            onClick={() => {
              setOpen(false);
            }}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
        <Divider />
        <SignOut />
      </Popover>
    </>
  );
}

export default HeaderUserbox;
