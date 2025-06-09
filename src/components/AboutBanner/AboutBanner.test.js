import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutBanner from './AboutBanner';

jest.mock('../../assets/restaurant.jpg', () => 'restaurant.jpg');
jest.mock('../../assets/restaurant chef B.jpg', () => 'restaurantChef.jpg');

describe('AboutBanner Component', () => {
    test('renders heading and subheading', () => {
        render(<AboutBanner />);
        expect(
            screen.getByRole('heading', { name: /little lemon/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: /chicago/i })
        ).toBeInTheDocument();
    });

    test('renders paragraph with expected content', () => {
        render(<AboutBanner />);
        expect(
            screen.getByText(/tucked away in the vibrant streets of chicago/i)
        ).toBeInTheDocument();
    });

    test('renders images with correct alt text', () => {
        render(<AboutBanner />);
        expect(screen.getByAltText(/chef/i)).toBeInTheDocument();
        expect(screen.getByAltText(/restaurant/i)).toBeInTheDocument();
    });

    test('has expected layout sections', () => {
        render(<AboutBanner />);
        expect(screen.getByTestId('about-banner')).toBeInTheDocument();
        expect(screen.getByTestId('about-text')).toBeInTheDocument();
        expect(screen.getByTestId('about-images')).toBeInTheDocument();
    });

    test('image sources match mocked file names', () => {
        render(<AboutBanner />);
        expect(screen.getByAltText(/chef/i).src).toContain(
            'restaurantChef.jpg'
        );
        expect(screen.getByAltText(/restaurant/i).src).toContain(
            'restaurant.jpg'
        );
    });
});
