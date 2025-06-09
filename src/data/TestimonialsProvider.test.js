import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestimonialsProvider, { useTestimonials } from './TestimonialsProvider';

global.crypto = {
    randomUUID: () => 'mock-id-' + Math.random().toString(36).slice(2),
};

function TestComponent() {
    const testimonials = useTestimonials();

    return (
        <div data-testid="output">
            {testimonials.map((t, i) => (
                <div key={t.id} data-testid={`testimonial-${i}`}>
                    <p>{t.author}</p>
                    <p>{t.stars}</p>
                    <p>{t.testimonial}</p>
                    <p>{t.avatar}</p>
                </div>
            ))}
        </div>
    );
}

describe('TestimonialsProvider', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders 3 testimonials from mock data', async () => {
        global.fetch.mockResolvedValueOnce({
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

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        const items = await screen.findAllByTestId(/testimonial-/);
        expect(items).toHaveLength(3);
    });

    test('displays correct author name for first testimonial', async () => {
        global.fetch.mockResolvedValueOnce({
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

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        expect(await screen.findByText('John Doe')).toBeInTheDocument();
    });

    test('logs fetch error to console', async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch.mockRejectedValueOnce(new Error('Fail'));

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        await screen.findByTestId('output');

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining('Failed to fetch testimonials:'),
            expect.any(Error)
        );

        spy.mockRestore();
    });

    test('includes testimonial text from static data', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({
                results: [
                    {
                        name: { first: 'Tina', last: 'Jones' },
                        picture: { large: 'tina.jpg' },
                    },
                    {
                        name: { first: 'Mark', last: 'Lee' },
                        picture: { large: 'mark.jpg' },
                    },
                    {
                        name: { first: 'Lara', last: 'Smith' },
                        picture: { large: 'lara.jpg' },
                    },
                ],
            }),
        });

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        expect(
            await screen.findByText(/just like my grandmother used to make/i)
        ).toBeInTheDocument();
    });

    test('shows avatar URL from API response', async () => {
        const avatarUrl = 'avatar.jpg';
        global.fetch.mockResolvedValueOnce({
            json: async () => ({
                results: [
                    {
                        name: { first: 'Avatar', last: 'Check' },
                        picture: { large: avatarUrl },
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

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        expect(await screen.findByText(avatarUrl)).toBeInTheDocument();
    });

    test('handles fewer than 3 API results gracefully', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({
                results: [
                    {
                        name: { first: 'Solo', last: 'User' },
                        picture: { large: 'solo.jpg' },
                    },
                ],
            }),
        });

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        expect(await screen.findByText('Solo User')).toBeInTheDocument();
    });

    test('handles empty results array from API', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({ results: [] }),
        });

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        const output = await screen.findByTestId('output');
        expect(output).toBeEmptyDOMElement();
    });

    test('handles invalid API response (missing results)', async () => {
        global.fetch.mockResolvedValueOnce({
            json: async () => ({}),
        });

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        const output = await screen.findByTestId('output');
        expect(output).toBeEmptyDOMElement();
    });

    test('handles fetch rejection gracefully', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Boom'));

        render(
            <TestimonialsProvider>
                <TestComponent />
            </TestimonialsProvider>
        );

        const output = await screen.findByTestId('output');
        expect(output).toBeEmptyDOMElement();
    });
});
