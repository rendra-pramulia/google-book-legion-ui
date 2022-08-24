import { useRef } from 'react';
import { Navigation } from 'legion-ui';
import Sidebar from './Sidebar';

function Header() {
  const navRef = useRef();

  return (
    <Navigation
        ref={navRef}
        title="Google Book"
        variant="secondary"
        logo={(
            <img src={process.env.PUBLIC_URL + '/books.png'} alt="logo" width={40} height={40} />
        )}
        className="header"
    >
        <Sidebar />
    </Navigation>
  );
};

export default Header;
