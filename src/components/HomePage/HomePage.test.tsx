import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import HomePage from './HomePage'
import { MemoryRouter } from 'react-router-dom'

describe('HomePage component', () => {
    it('renders without errors', () => {
        const { container } = render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        )
        expect(container).toBeInTheDocument()
    })

    it('displays a greeting message with default text', () => {
        const { getByText } = render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        )

        expect(getByText('Hey, Error')).toBeInTheDocument()
    })

    it('displays an "Add Qualification" button and handles click', () => {
        const { getByText } = render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        )

        const addButton = getByText('+ Add Qualification')
        expect(addButton).toBeInTheDocument()

        fireEvent.click(addButton)

    })
})
