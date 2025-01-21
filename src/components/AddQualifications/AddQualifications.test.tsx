import React from 'react'
import { render } from '@testing-library/react'
import AddQualifications from './AddQualifications'

describe('AddQualifications Component', () => {
    it('renders without errors', () => {
        render(<AddQualifications />)
    })

    it('renders a CustomStepper component', () => {
        const { getByTestId } = render(<AddQualifications />)
        const customStepperElement = getByTestId('custom-stepper')

        expect(customStepperElement).toBeInTheDocument()
    })
})