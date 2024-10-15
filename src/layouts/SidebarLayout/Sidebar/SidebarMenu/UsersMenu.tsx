import { useContext } from 'react';

import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import { useSelector } from 'react-redux';
import { SubMenuWrapper } from './style';

const UsersMenu = () => {
  const { closeSidebar } = useContext(SidebarContext);
  const { me } = useSelector((state: any) => state.auth);

  if (me?.role?.role === 'user') return null;
  return (
    <>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Users
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/users/add"
                startIcon={<BrightnessLowTwoToneIcon />}
              >
                Add
              </Button>
            </ListItem>
            {me?.role?.role === 'super_admin' && (
              <>
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/users/pending"
                    startIcon={<MmsTwoToneIcon />}
                  >
                    Pending
                  </Button>
                </ListItem>
              </>
            )}
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/users/all"
                startIcon={<MmsTwoToneIcon />}
              >
                Manage
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </>
  );
};

export default UsersMenu;
