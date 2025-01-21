import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignIn from './SignIn'

describe('SignIn', () => {
    it('renders the SignIn component', () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        )

        expect(screen.getByText('Sign In to Biblio')).toBeInTheDocument()
        expect(screen.getByText('Email Addresss')).toBeInTheDocument()
        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByText('Remember me')).toBeInTheDocument()
        expect(screen.getByText("I've forgotten my password")).toBeInTheDocument()
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    })

    it('displays error messages for invalid input', async () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        )

        const passwordInput = screen.getByTestId('password-input')
        const signInButton = screen.getByText('Sign In')

        fireEvent.change(passwordInput, { target: { value: 'short' } })
        fireEvent.click(signInButton)

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument()
        })
    })
})
