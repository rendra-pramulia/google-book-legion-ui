import React, { useRef } from 'react';
import { SidebarNavLink } from 'legion-ui';

function Sidebar() {
  const ref = useRef();

  return (
    <SidebarNavLink
        ref={ref}
        listItems={[
            // {
            //     icon: 'Home',
            //     title: '',
            //     route: '/'
            // },
            // {
            //     icon: 'Star',
            //     title: '',
            //     route: 'favorit'
            // }
        ]}
        sx={{ bg: 'secondary50' }}
    />
  );
};

export default Sidebar;
