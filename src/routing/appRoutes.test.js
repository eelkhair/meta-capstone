import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

// eslint-disable-next-line react/display-name
jest.mock('../pages/HomePage', () => () => <div>Home Page</div>);

// eslint-disable-next-line react/display-name
jest.mock('../pages/Menu', () => () => <div>Menu Page</div>);

// eslint-disable-next-line react/display-name
jest.mock('../pages/About', () => () => <div>About Page</div>);

// eslint-disable-next-line react/display-name
jest.mock('../pages/Reservations', () => () => <div>Reservations Page</div>);

// eslint-disable-next-line react/display-name
jest.mock('../pages/OrderOnline', () => () => <div>Order Online Page</div>);

// eslint-disable-next-line react/display-name
jest.mock('../pages/Login', () => () => <div>Login Page</div>);

// Suppress React Router v7 warning
beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation((msg, ...args) => {
        if (
            typeof msg === 'string' &&
            msg.includes('React Router will begin wrapping state updates')
        )
            return;
        console.warn(msg, ...args);
    });
});

afterAll(() => {
    console.warn.mockRestore();
});

describe('AppRoutes', () => {
    test('includes all expected paths', () => {
        const paths = AppRoutes.map((route) => route.path);
        expect(paths).toEqual(
            expect.arrayContaining([
                '/',
                '/menu',
                '/about',
                '/reservations',
                '/order',
                '/login',
            ])
        );
    });

    const testCases = [
        { path: '/', text: 'Home Page' },
        { path: '/menu', text: 'Menu Page' },
        { path: '/about', text: 'About Page' },
        { path: '/reservations', text: 'Reservations Page' },
        { path: '/order', text: 'Order Online Page' },
        { path: '/login', text: 'Login Page' },
    ];

    testCases.forEach(({ path, text }) => {
        test(`renders "${text}" at "${path}" route`, () => {
            render(
                <MemoryRouter initialEntries={[path]}>
                    <Routes>
                        {AppRoutes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element} />
                        ))}
                    </Routes>
                </MemoryRouter>
            );
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});
