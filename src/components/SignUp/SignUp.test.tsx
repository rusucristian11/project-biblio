import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SignUp from './SignUp'

describe('SignUp', () => {
    it('renders the SignUp component', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        )

        expect(screen.getByText('Create your Biblio account')).toBeInTheDocument()
        expect(screen.getByTestId('first-name-input')).toBeInTheDocument()
        expect(screen.getByTestId('last-name-input')).toBeInTheDocument()
        expect(screen.getByTestId('role-input')).toBeInTheDocument()
        expect(screen.getByTestId('phone-number-input')).toBeInTheDocument()
        expect(screen.getByTestId('email-input')).toBeInTheDocument()
        expect(screen.getByTestId('password-input')).toBeInTheDocument()
        expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
        expect(screen.getByTestId('address-line-1-input')).toBeInTheDocument()
        expect(screen.getByTestId('address-line-2-input')).toBeInTheDocument()
        expect(screen.getByTestId('address-line-3-input')).toBeInTheDocument()
        expect(screen.getByTestId('city-input')).toBeInTheDocument()
        expect(screen.getByTestId('postcode-input')).toBeInTheDocument()
        expect(screen.getByTestId('check-input')).toBeInTheDocument()
        expect(screen.getByText("Already have an account?")).toBeInTheDocument()
        expect(screen.getByText("Sign in.")).toBeInTheDocument()
    })
})
