import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

jest.mock('../../assets/Logo.svg', () => 'logo.svg');

describe('Logo Component', () => {
    test('renders the logo wrapper div', () => {
        render(<Logo />);
        const wrapper = screen.getByTestId('logo-wrapper');
        expect(wrapper).toBeInTheDocument();
        expect(wrapper).toHaveClass('logo');
    });

    test('renders the logo image with correct alt text', () => {
        render(<Logo />);
        const image = screen.getByTestId('logo-img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Little Lemon logo');
    });

    test('logo image has correct src', () => {
        render(<Logo />);
        const image = screen.getByTestId('logo-img');
        expect(image).toHaveAttribute('src', 'logo.svg');
    });

    test('logo image has correct class', () => {
        render(<Logo />);
        const image = screen.getByTestId('logo-img');
        expect(image).toHaveClass('logo-img');
    });
});
