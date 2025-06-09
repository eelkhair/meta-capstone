import { useRef } from 'react';
import logo from '../../assets/Logo.svg';

export default function Logo() {
    const imgRef = useRef(null);

    return (
        <div className="logo" data-testid="logo-wrapper">
            <img
                src={logo}
                alt="Little Lemon logo"
                ref={imgRef}
                className="logo-img"
                data-testid="logo-img"
            />
        </div>
    );
}
