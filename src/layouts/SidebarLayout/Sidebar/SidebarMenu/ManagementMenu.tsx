import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import { Box, Button, List, ListItem, ListSubheader } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { SubMenuWrapper } from './style';

const ManagementMenu = () => {
  const { closeSidebar } = useContext(SidebarContext);
  const { me } = useSelector((state: any) => state.auth);
  return (
    <div>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Management
          </ListSubheader>
        }
      >
        <SubMenuWrapper>
          <List component="div">
            {me?.role?.role === 'super_admin' && (
              <Box sx={{ display: 'none' }}>
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/management/details"
                    startIcon={<AccountCircleTwoToneIcon />}
                  >
                    Featured
                  </Button>
                </ListItem>
                <ListItem component="div">
                  <Button
                    disableRipple
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/management/settings"
                    startIcon={<DisplaySettingsTwoToneIcon />}
                  >
                    Growth
                  </Button>
                </ListItem>
              </Box>
            )}
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/management/history"
                startIcon={<DisplaySettingsTwoToneIcon />}
              >
                History
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/management/settings"
                startIcon={<DisplaySettingsTwoToneIcon />}
              >
                Settings
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </div>
  );
};

export default ManagementMenu;
