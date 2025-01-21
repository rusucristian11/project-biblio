import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import ForgotPassword from './ForgotPassword'
import {MemoryRouter} from "react-router-dom"

describe('ForgotPassword component', () => {
    it('renders without errors', () => {
        const { container } = render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>)
        expect(container).toBeInTheDocument()
    })

    it('displays an error message for an invalid email', () => {
        const { getByText, getByTestId } = render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        )
        const emailInput = getByTestId('email-input')
        const resetButton = getByText('Reset Password')

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.click(resetButton)

        expect(getByText('Please enter a valid email address.')).toBeInTheDocument()
    })

    it('sends a password reset request when a valid email is provided', async () => {
        const fetchMock = jest.fn(() =>
            Promise.resolve(
                new Response('', {
                    status: 200,
                    statusText: 'OK',
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
            )
        );

        global.fetch = fetchMock;

        // Mock window.alert to prevent the error
        const originalAlert = window.alert;
        window.alert = jest.fn();

        const { getByTestId, getByText } = render(
            <MemoryRouter>
                <ForgotPassword />
            </MemoryRouter>
        );
        const emailInput = getByTestId('email-input');
        const resetButton = getByText('Reset Password');

        fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
        fireEvent.click(resetButton);

        await fetchMock();

        // Assert that fetchMock was called as expected
        expect(fetchMock).toHaveBeenCalledWith(
            'https://biblio.nebulalabs.cc/api/user/request-reset-password/valid-email%40example.com',
            expect.objectContaining({
                method: 'GET',
            })
        );

        // Restore the original window.alert
        window.alert = originalAlert;
    });
})
