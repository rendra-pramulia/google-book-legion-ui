import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BackToTop from '../components/BackToTop';
import { GitHub } from 'react-feather';
import { Anchor } from 'legion-ui';

function Layout() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = event => {
            if (window.scrollY > 60) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <Outlet />
            </div>
            {showBackToTop && <BackToTop />}
            <footer>
                <Anchor href="https://github.com/rendra-pramulia/google-book-legion-ui" iconLeft={<GitHub/>} target="_blank">
                    Source code
                </Anchor>
            </footer>
        </>
    );
};

export default Layout;
