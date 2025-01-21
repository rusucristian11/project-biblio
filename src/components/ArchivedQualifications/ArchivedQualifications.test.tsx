import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ArchivedQualifications from './ArchivedQualifications'

describe('ArchivedQualifications Component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <ArchivedQualifications />
            </MemoryRouter>
        )
    })

    it('displays a greeting with the user\'s first name', () => {
        render(
            <MemoryRouter>
                <ArchivedQualifications />
            </MemoryRouter>
        )
        const greeting = screen.getByText(/Hey, /i)
        expect(greeting).toBeInTheDocument()
    })

    it('displays a "Get Started" message when there are no qualifications', () => {
        render(
            <MemoryRouter>
                <ArchivedQualifications />
            </MemoryRouter>
        )
        const getStartedMessage = screen.getByText(/Get Started/i)
        expect(getStartedMessage).toBeInTheDocument()
    })
})
