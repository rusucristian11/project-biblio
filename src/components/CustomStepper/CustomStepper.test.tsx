import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import CustomStepper from './CustomStepper'

describe('CustomStepper Component', () => {
    it('renders without crashing', () => {
        render(<CustomStepper />)
    })

    it('displays the first step initially', () => {
        render(<CustomStepper />)
        const stepLabel = screen.getByText(/Add Certificate/i)
        expect(stepLabel).toBeInTheDocument()
    })

    it('displays a linear progress bar', () => {
        render(<CustomStepper />)
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar).toBeInTheDocument()
    })
})
