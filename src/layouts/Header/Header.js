import Nav from './Nav';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <section className="top-nav">
                <div className="nav-container">
                    <Nav />
                </div>
            </section>
        </header>
    );
};

export default Header;
