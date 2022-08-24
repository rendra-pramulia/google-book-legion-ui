import { Avatar, Anchor } from 'legion-ui';

function BackToTop() {
    const goToTop = () => {
        window?.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <Anchor>
            <Avatar
                onClick={() => goToTop()}
                src={process.env.PUBLIC_URL + '/arrow-up.svg'}
                size="medium"
                className="back-to-top"
            />
        </Anchor>
    );
};

export default BackToTop;
