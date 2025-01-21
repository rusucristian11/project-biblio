import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ShareProfileModal from './ShareProfileModal'
describe('ShareProfileModal', () => {
    it('renders the ShareProfileModal component', () => {
        const onClose = jest.fn()

        render(
            <ShareProfileModal isOpen={true} onClose={onClose} />
        )

        expect(screen.getByText('Share Your Profile')).toBeInTheDocument()
        expect(screen.getByText('Recipient Email')).toBeInTheDocument()
        expect(screen.getByText('Recipient Name')).toBeInTheDocument()
        expect(screen.getByText('Share Via Email')).toBeInTheDocument()
    })

    it('calls onClose when the close button is clicked', () => {
        const onClose = jest.fn()

        render(
            <ShareProfileModal isOpen={true} onClose={onClose} />
        )

        const closeButton = screen.getByAltText('Close Button')
        fireEvent.click(closeButton)

        expect(onClose).toHaveBeenCalledTimes(1)
    })
})
