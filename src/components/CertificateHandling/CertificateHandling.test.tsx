import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CertificateHandling from './CertificateHandling'

describe('CertificateHandling Component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <CertificateHandling image={null} onNext={() => {}} onBack={() => {}} />
            </MemoryRouter>
        )
    })

    it('displays the "Add Certificate" title', () => {
        render(
            <MemoryRouter>
                <CertificateHandling image={null} onNext={() => {}} onBack={() => {}} />
            </MemoryRouter>
        )
        const title = screen.getByText(/Add Certificate/i)
        expect(title).toBeInTheDocument()
    })

    it('displays the "Take a photo..." subtitle', () => {
        render(
            <MemoryRouter>
                <CertificateHandling image={null} onNext={() => {}} onBack={() => {}} />
            </MemoryRouter>
        )
        const subtitle = screen.getByText(/Take a photo of your qualification certificate or upload an image as proof./i)
        expect(subtitle).toBeInTheDocument()
    })

    it('displays the "1 Image Uploaded" header', () => {
        render(
            <MemoryRouter>
                <CertificateHandling image={null} onNext={() => {}} onBack={() => {}} />
            </MemoryRouter>
        )
        const header = screen.getByText(/1 Image Uploaded/i)
        expect(header).toBeInTheDocument()
    })

    it('renders a file name and size', () => {
        const image = new File(['sample data'], 'sample.jpg', { type: 'image/jpeg' });
        render(
            <MemoryRouter>
                <CertificateHandling image={image} onNext={() => {}} onBack={() => {}} />
            </MemoryRouter>
        )
        const fileName = screen.getByText(/sample.jpg/i)
        const fileSize = screen.getByText(/sample.jpg/)
        expect(fileName).toBeInTheDocument()
        expect(fileSize).toBeInTheDocument()
    })

    it('calls onNext when the Continue button is clicked', () => {
        const onNextMock = jest.fn()
        render(
            <MemoryRouter>
                <CertificateHandling image={null} onNext={onNextMock} onBack={() => {}} />
            </MemoryRouter>
        )
        const continueButton = screen.getByText(/Continue/i)
        fireEvent.click(continueButton)
        expect(onNextMock).toHaveBeenCalled()
    })
})
