import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

jest.mock('../../assets/restauranfood.jpg', () => 'restauranfood.jpg');

describe('Hero Component Tests', () => {
    test('renders the hero section', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero')).toBeInTheDocument();
    });

    test('renders the container div', () => {
        render(<Hero />);
        expect(screen.getByTestId('container')).toBeInTheDocument();
    });

    test('renders the hero-inner wrapper', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-inner')).toBeInTheDocument();
    });

    test('renders the hero-text block', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-text')).toBeInTheDocument();
    });

    test('renders the hero image wrapper', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-image-wrapper')).toBeInTheDocument();
    });

    test('displays correct main heading text', () => {
        render(<Hero />);
        expect(
            screen.getByRole('heading', { name: /little lemon/i })
        ).toBeInTheDocument();
    });

    test('displays correct subheading text', () => {
        render(<Hero />);
        expect(
            screen.getByRole('heading', { name: /chicago/i })
        ).toBeInTheDocument();
    });

    test('displays description paragraph', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-description')).toHaveTextContent(
            /family owned mediterranean restaurant/i
        );
    });

    test('renders the reserve button', () => {
        render(<Hero />);
        expect(screen.getByTestId('reserve-button')).toBeInTheDocument();
    });

    test('reserve button contains correct text', () => {
        render(<Hero />);
        expect(
            screen.getByRole('button', { name: /reserve a table/i })
        ).toBeInTheDocument();
    });

    test('renders the hero image', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-image')).toBeInTheDocument();
    });

    test('hero image has correct alt text', () => {
        render(<Hero />);
        expect(
            screen.getByAltText(/chef holding appetizers/i)
        ).toBeInTheDocument();
    });

    test('hero image src matches mock', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-image').src).toContain(
            'restauranfood.jpg'
        );
    });

    test('hero section has correct class', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero')).toHaveClass('hero');
    });

    test('reserve button has reserve-btn class', () => {
        render(<Hero />);
        expect(screen.getByTestId('reserve-button')).toHaveClass('reserve-btn');
    });

    test('image wrapper has expected class', () => {
        render(<Hero />);
        expect(screen.getByTestId('hero-image-wrapper')).toHaveClass(
            'hero-image-wrapper'
        );
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<Hero />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('has a single heading level 1', () => {
        render(<Hero />);
        const h1s = screen.getAllByRole('heading', { level: 1 });
        expect(h1s.length).toBe(1);
    });

    test('has a single button on the screen', () => {
        render(<Hero />);
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBe(1);
    });
});
