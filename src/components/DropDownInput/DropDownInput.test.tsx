import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DropdownInput from './DropDownInput'

const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
]

const mockOnChange = jest.fn()

describe('DropdownInput Component', () => {
    it('renders dropdown options', () => {
        render(
            <DropdownInput
                options={options}
                value={1}
                onChange={mockOnChange}
                inputName="testDropdown"
            />
        )

        for (const option of options) {
            const renderedOption = screen.getByText(option.name)
            expect(renderedOption).toBeInTheDocument()
        }
    })

    it('calls onChange when an option is selected', () => {
        render(
            <DropdownInput
                options={options}
                value={1}
                onChange={mockOnChange}
                inputName="testDropdown"
            />
        )

        const dropdown = screen.getByRole('combobox')

        fireEvent.change(dropdown, { target: { value: '2' } })

        expect(mockOnChange).toHaveBeenCalled()
    })
})
