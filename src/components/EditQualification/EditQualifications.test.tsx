import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EditQualification from './EditQualification'
import {MemoryRouter} from "react-router-dom"

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ qualificationId: '1' })
}))
jest.mock('../../hooks/useAuthorizationInterceptor', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        patch: jest.fn()
    }))
}))

describe('EditQualification', () => {
    it('renders the EditQualification component', () => {
        render(
            <MemoryRouter>
                <EditQualification />
            </MemoryRouter>
        )
        const editQualificationTitle = screen.getByText('Edit Qualification')
        expect(editQualificationTitle).toBeInTheDocument()
    })

    it('handles qualification title input change', () => {
        render(
            <MemoryRouter>
                <EditQualification />
            </MemoryRouter>
        )
        const qualificationTitleInput = screen.getByTestId('qualification-title')
        fireEvent.change(qualificationTitleInput, { target: { value: 'New Title' } })
        expect(qualificationTitleInput).toHaveValue('New Title')
    })
})
