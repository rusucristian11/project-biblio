import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddCertificate from './AddCertificate'

describe('AddCertificate Component', () => {
    it('renders the component with title and subtitle', () => {
        render(<AddCertificate onNext={jest.fn()} />)
        expect(screen.getByText('Add Certificate')).toBeInTheDocument()
        expect(
            screen.getByText(
                'Take a photo of your qualification certificate or upload an image as proof.'
            )
        ).toBeInTheDocument()
    })

    it('renders Upload Photo button and handles file upload', () => {
        const onNextMock = jest.fn()
        render(<AddCertificate onNext={onNextMock} />)
        const uploadButton = screen.getByText('Upload Photo')
        const fileInput = screen.getByTestId('file-input')

        expect(uploadButton).toBeInTheDocument()
        expect(fileInput).toBeInTheDocument()

        const file = new File(['dummy'], 'dummy.png', { type: 'image/png' })
        fireEvent.change(fileInput, { target: { files: [file] } })

        expect(onNextMock).toHaveBeenCalledWith(file)
    })

    it('closes the camera modal when clicking the close button', () => {
        render(<AddCertificate onNext={jest.fn()} />)
        const takePhotoButton = screen.getByText('Take Photo')
        expect(takePhotoButton).toBeInTheDocument()

        fireEvent.click(takePhotoButton)

        const modalOverlay = screen.getByTestId('modal-overlay-camera')
        expect(modalOverlay).toBeInTheDocument()

        const closeButton = screen.getByText('x', { selector: '.close-button' })
        fireEvent.click(closeButton)
        expect(modalOverlay).not.toBeInTheDocument()
    })
})
