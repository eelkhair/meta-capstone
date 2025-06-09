import { Link } from 'react-router-dom';

export default function SpecialsHeader() {
    return (
        <div className="menu-desc">
            <h1>Specials</h1>
            <Link className="specials-menu-btn" to="/menu">
                Online Menu
            </Link>
        </div>
    );
}
