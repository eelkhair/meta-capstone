import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main data-testid="main-content">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};
