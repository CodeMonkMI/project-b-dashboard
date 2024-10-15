import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import { Button, List, ListItem } from '@mui/material';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';
import { SubMenuWrapper } from './style';

const GeneralMenu = () => {
  const { closeSidebar } = useContext(SidebarContext);
  const { me } = useSelector((state: any) => state.auth);
  return (
    <div>
      <List component="div">
        <SubMenuWrapper>
          <List component="div">
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/"
                startIcon={<DesignServicesTwoToneIcon />}
              >
                Dashboard
              </Button>
            </ListItem>
            <ListItem component="div">
              <Button
                disableRipple
                component={RouterLink}
                onClick={closeSidebar}
                to="/make-request"
                startIcon={<DesignServicesTwoToneIcon />}
              >
                Need Blood?
              </Button>
            </ListItem>
            {me?.role?.role !== 'user' && (
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/donor-finder"
                  startIcon={<DesignServicesTwoToneIcon />}
                >
                  Donor Finder
                </Button>
              </ListItem>
            )}
          </List>
        </SubMenuWrapper>
      </List>
    </div>
  );
};

export default GeneralMenu;
