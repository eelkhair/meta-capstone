import Logo from '../../components/shared/Logo';
import './Footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-column">
                    <Logo />
                </div>
                <div className="footer-column">
                    <h4>Doormat Navigation</h4>
                    <ul>
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
                </div>
                <div className="footer-column">
                    <h4>Contact</h4>
                    <p>123 Lemon Street</p>
                    <p>Chicago, IL</p>
                    <p>(123) 456-7890</p>
                    <p>info@littlelemon.com</p>
                </div>
                <div className="footer-column">
                    <h4>Social Media Links</h4>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                </div>
            </div>
        </footer>
    );
}
