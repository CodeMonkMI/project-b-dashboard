import GeneralMenu from './GeneralMenu';
import ManagementMenu from './ManagementMenu';
import RequestMenu from './RequestMenu';
import UsersMenu from './UsersMenu';
import { MenuWrapper } from './style';

function SidebarMenu() {
  return (
    <>
      <MenuWrapper>
        <GeneralMenu />
        <UsersMenu />
        <RequestMenu />
        <ManagementMenu />
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
