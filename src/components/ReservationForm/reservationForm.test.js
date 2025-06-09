import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReservationForm from './ReservationForm';
import userEvent from '@testing-library/user-event';

describe('ReservationForm Component', () => {
    test('renders reservation form title', () => {
        render(<ReservationForm />);
        expect(screen.getByText(/Table Reservation/i)).toBeInTheDocument();
    });

    test('renders all core input fields', () => {
        render(<ReservationForm />);
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByText('Select time...')).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of people/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByText('Select occasion...')).toBeInTheDocument();
    });

    test('submit button is present', () => {
        render(<ReservationForm />);
        expect(
            screen.getByRole('button', { name: /Book a table/i })
        ).toBeInTheDocument();
    });

    test('shows validation errors when submitted empty', async () => {
        render(<ReservationForm />);

        await userEvent.click(
            screen.getByRole('button', { name: /Book a table/i })
        );

        await waitFor(() => {
            expect(screen.getByText(/Date is required/)).toBeInTheDocument();
            expect(screen.getByText(/Time Required/)).toBeInTheDocument();
            expect(
                screen.getByText(/Number of guests is required/)
            ).toBeInTheDocument();
            expect(
                screen.getByText(/Phone number is required/)
            ).toBeInTheDocument();
        });
    });

    test('accepts valid phone input format', async () => {
        render(<ReservationForm />);

        const phoneInput = screen.getByLabelText(/Phone Number/i);

        // Wait for the input to stabilize if it’s using a mask
        await userEvent.clear(phoneInput);
        await userEvent.type(phoneInput, '(123) 456-7890');

        expect(phoneInput).toHaveValue('(123) 456-7890');
    });

    test('time dropdown allows selecting a time', async () => {
        render(<ReservationForm />);

        // Open the dropdown by clicking the control
        const selectInput = screen.getByText(/Select time.../i);
        await userEvent.click(selectInput);

        // Click the desired option
        const option = await screen.findByText(/11:00 AM/i);
        await userEvent.click(option);

        // Assert selected value
        expect(screen.getByText(/11:00 AM/i)).toBeInTheDocument();
    });

    test('focus is on date input at load', () => {
        render(<ReservationForm />);
        expect(screen.getByLabelText(/Date/i)).toHaveFocus();
    });

    test('form does not submit with missing phone number', async () => {
        render(<ReservationForm />);

        await userEvent.clear(screen.getByLabelText(/Date/i));
        await userEvent.type(screen.getByLabelText(/Date/i), '2025-06-30');

        await userEvent.clear(screen.getByLabelText(/Number of people/i));
        await userEvent.type(screen.getByLabelText(/Number of people/i), '2');

        await userEvent.click(
            screen.getByRole('button', { name: /Book a table/i })
        );

        await waitFor(() => {
            expect(
                screen.queryByText(/Reservation Completed/i)
            ).not.toBeInTheDocument();
            expect(
                screen.getByText(/Phone number is required/)
            ).toBeInTheDocument();
        });
    });

    test('helper text under phone input is visible', () => {
        render(<ReservationForm />);
        expect(
            screen.getByText(/We’ll send a text confirmation/i)
        ).toBeInTheDocument();
    });

    test('select dropdowns render styled components', () => {
        render(<ReservationForm />);
        expect(
            document.querySelector('.react-select__control')
        ).toBeInTheDocument();
    });
});
