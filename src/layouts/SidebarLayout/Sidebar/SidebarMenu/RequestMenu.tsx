import { useContext } from 'react';

import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { useSelector } from 'react-redux';
import { SubMenuWrapper } from './style';

const RequestMenu = () => {
  const { closeSidebar } = useContext(SidebarContext);
  const { me } = useSelector((state: any) => state.auth);
  return (
    <div>
      <List
        component="div"
        subheader={
          <ListSubheader component="div" disableSticky>
            Request
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
                to="/request/pending"
                startIcon={<TableChartTwoToneIcon />}
              >
                Pending
              </Button>
            </ListItem>

            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/request/all"
                startIcon={<TableChartTwoToneIcon />}
              >
                Manage
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/request/completed"
                startIcon={<TableChartTwoToneIcon />}
              >
                Completed
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/request/activity"
                startIcon={<TableChartTwoToneIcon />}
              >
                Activity
              </Button>
            </ListItem>
          </List>
        </SubMenuWrapper>
      </List>
    </div>
  );
};

export default RequestMenu;
