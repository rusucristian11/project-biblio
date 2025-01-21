import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DeleteLinkModal from './DeleteLinkModal'

describe('DeleteLinkModal Component', () => {
    it('renders without crashing when isOpen is true', () => {
        render(<DeleteLinkModal isOpen={true} onClose={() => {}} onDelete={() => {}} />)
        const modalOverlay = screen.getByTestId('modal-overlay')
        expect(modalOverlay).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
        render(<DeleteLinkModal isOpen={false} onClose={() => {}} onDelete={() => {}} />)
        const modalOverlay = screen.queryByTestId('modal-overlay')
        expect(modalOverlay).not.toBeInTheDocument()
    })

    it('calls onClose when clicking outside the modal content', () => {
        const onCloseMock = jest.fn()
        render(<DeleteLinkModal isOpen={true} onClose={onCloseMock} onDelete={() => {}} />)
        const modalOverlay = screen.getByTestId('modal-overlay')
        fireEvent.click(modalOverlay)
        expect(onCloseMock).toHaveBeenCalled()
    })

    it('calls onDelete and onClose when "Yes, I Want To Delete Link" button is clicked', () => {
        const onDeleteMock = jest.fn()
        const onCloseMock = jest.fn()
        render(<DeleteLinkModal isOpen={true} onClose={onCloseMock} onDelete={onDeleteMock} />)
        const deleteButton = screen.getByText(/Yes, I Want To Delete Link/i)
        fireEvent.click(deleteButton)
        expect(onDeleteMock).toHaveBeenCalled()
        expect(onCloseMock).toHaveBeenCalled()
    })

    it('calls onClose when "No, Keep Link" button is clicked', () => {
        const onCloseMock = jest.fn()
        render(<DeleteLinkModal isOpen={true} onClose={onCloseMock} onDelete={() => {}} />);
        const keepLinkButton = screen.getByText(/No, Keep Link/i)
        fireEvent.click(keepLinkButton)
        expect(onCloseMock).toHaveBeenCalled()
    })
})
