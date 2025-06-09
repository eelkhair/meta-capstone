import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Testimonials from './Testimonials';

global.crypto = {
    randomUUID: () => 'mock-id-' + Math.random().toString(36).slice(2),
};

beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({
            results: [
                {
                    name: { first: 'John', last: 'Doe' },
                    picture: { large: 'john.jpg' },
                },
                {
                    name: { first: 'Jane', last: 'Smith' },
                    picture: { large: 'jane.jpg' },
                },
                {
                    name: { first: 'Emily', last: 'Johnson' },
                    picture: { large: 'emily.jpg' },
                },
            ],
        }),
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Testimonials Component (No DOM traversal)', () => {
    test('renders testimonials section', async () => {
        render(<Testimonials />);
        expect(
            await screen.findByTestId('testimonials-section')
        ).toBeInTheDocument();
    });

    test('renders testimonials container', async () => {
        render(<Testimonials />);
        expect(
            await screen.findByTestId('testimonials-container')
        ).toBeInTheDocument();
    });

    test('renders heading with text "Testimonials"', async () => {
        render(<Testimonials />);
        expect(
            await screen.findByRole('heading', { name: /testimonials/i })
        ).toBeInTheDocument();
    });

    test('renders 3 testimonial cards (articles)', async () => {
        render(<Testimonials />);
        const articles = await screen.findAllByRole('article');
        expect(articles).toHaveLength(3);
    });

    test('renders correct author names', async () => {
        render(<Testimonials />);
        expect(await screen.findByText('John Doe')).toBeInTheDocument();
        expect(await screen.findByText('Jane Smith')).toBeInTheDocument();
        expect(await screen.findByText('Emily Johnson')).toBeInTheDocument();
    });

    test('renders avatar alt texts correctly', async () => {
        render(<Testimonials />);
        expect(
            await screen.findByAltText(/avatar for john doe/i)
        ).toBeInTheDocument();
        expect(
            await screen.findByAltText(/avatar for jane smith/i)
        ).toBeInTheDocument();
        expect(
            await screen.findByAltText(/avatar for emily johnson/i)
        ).toBeInTheDocument();
    });

    test('renders testimonial text from static list', async () => {
        render(<Testimonials />);
        expect(
            await screen.findByText(/just like my grandmother used to make/i)
        ).toBeInTheDocument();
    });

    test('renders some cards with 4 stars', async () => {
        render(<Testimonials />);
        const starElements = await screen.findAllByText(/^★★★★/);
        expect(starElements.length).toBeGreaterThan(0);
    });
});
