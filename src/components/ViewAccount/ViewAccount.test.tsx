import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import ViewAccount from './ViewAccount'
import {MemoryRouter} from "react-router-dom"

jest.mock('../../hooks/useUserData', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('../../hooks/useAuthorizationInterceptor', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('ViewAccount Component', () => {
    beforeEach(() => {
        const mockUserData = {
            userpic: 'mockUserpic',
            first_name: 'John',
            last_name: 'Doe',
            email: 'johndoe@example.com',
            phone_number: '1234567890',
            role: 'User',
            address_line_1: '123 Main St',
            address_line_2: 'Apt 4B',
            address_line_3: 'Building C',
            city: 'Example City',
            postcode: '12345'
        }

        const mockApi = {
            patch: jest.fn()
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('../../hooks/useUserData').default.mockReturnValue({
            userData: mockUserData,
            loading: false,
            error: null
        })

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('../../hooks/useAuthorizationInterceptor').default.mockReturnValue(
            mockApi
        )

        render(
            <MemoryRouter>
                <ViewAccount/>
            </MemoryRouter>
        )
    })

    test('renders profile picture and form fields with initial data', () => {
        const profilePicture = screen.getByAltText('Profile')
        expect(profilePicture).toBeInTheDocument()

        expect(screen.getByDisplayValue('John')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
        expect(screen.getByDisplayValue('johndoe@example.com')).toBeInTheDocument()
        expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument()
        expect(screen.getByDisplayValue('User')).toBeInTheDocument()
        expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Apt 4B')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Building C')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Example City')).toBeInTheDocument()
        expect(screen.getByDisplayValue('12345')).toBeInTheDocument()
    })

    test('updates first name on input change', () => {
        const firstNameInput = screen.getByDisplayValue('John')
        fireEvent.change(firstNameInput, {target: {value: 'Jane'}})

        expect(firstNameInput).toHaveValue('Jane')
    })
})
