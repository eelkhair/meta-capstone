import underConstructionImage from '../../assets/under-construction.jpg';
import { useRef } from 'react';

export default function UnderConstruction() {
    const imgRef = useRef(null);

    return (
        <div
            style={{
                textAlign: 'center',
                marginBottom: '40px',
                width: '100%',
                padding: '1rem',
                boxSizing: 'border-box',
            }}
        >
            <img
                ref={imgRef}
                src={underConstructionImage}
                alt="under construction"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                }}
            />
            <h1
                style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    marginTop: '1rem',
                    color: '#333',
                }}
            >
                This page is under construction
            </h1>
        </div>
    );
}
