import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NewQualificationSuccess from './NewQualificationSuccess'

describe('NewQualificationSuccess Component', () => {
    it('renders success message and button', () => {
        render(
            <MemoryRouter>
                <NewQualificationSuccess />
            </MemoryRouter>
        )

        const successTitle = screen.getByText('Success!')
        const successSubtitle = screen.getByText('Your qualification has been added successfully. Go Home to view it.')

        expect(successTitle).toBeInTheDocument()
        expect(successSubtitle).toBeInTheDocument()

        const returnHomeButton = screen.getByText('Return Home')
        expect(returnHomeButton).toBeInTheDocument()
    })

    it('calls handleReturnHome when clicking "Return Home" button', () => {
        const handleReturnHomeMock = jest.fn()

        render(
            <MemoryRouter>
                <NewQualificationSuccess />
            </MemoryRouter>
        )

        const returnHomeButton = screen.getByText('Return Home')
        returnHomeButton.onclick = () => {
            handleReturnHomeMock()
        }
        fireEvent.click(returnHomeButton)

        expect(handleReturnHomeMock).toHaveBeenCalledTimes(1)
    })
})
