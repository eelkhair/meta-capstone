import { useState } from 'react';
import Logo from '../../components/shared/Logo';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="top-nav-header">
                <Logo />
                <button
                    className="hamburger"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    &#9776;
                </button>
            </div>

            <nav className="nav" aria-label="Main Navigation">
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/reservations">Reservations</Link>
                    </li>
                    <li>
                        <Link to="/order">Order Online</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Nav;
