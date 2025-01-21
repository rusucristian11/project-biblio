import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import ManualHandling from './ManualHandling'
import {MemoryRouter} from "react-router-dom"

describe('ManualHandling', () => {
    const qualificationId = 1

    it('renders with modal closed', () => {
        const onClose = jest.fn()
        const onDelete = jest.fn()

        render(
            <MemoryRouter>
                <ManualHandling
                    isOpen={false}
                    onClose={onClose}
                    qualificationId={qualificationId}
                    onDelete={onDelete}
                />
            </MemoryRouter>
        )

        const modal = screen.queryByTestId('modal-overlay')
        expect(modal).toBeNull()
    })

    it('renders with modal open', () => {
        const onClose = jest.fn()
        const onDelete = jest.fn()

        render(
            <MemoryRouter>
                <ManualHandling
                    isOpen={true}
                    onClose={onClose}
                    qualificationId={qualificationId}
                    onDelete={onDelete}
                />
            </MemoryRouter>
        )

        const modal = screen.getByTestId('modal-overlay')
        expect(modal).toBeInTheDocument()
    })

    it('calls onClose when clicking outside the modal', () => {
        const onClose = jest.fn()
        const onDelete = jest.fn()

        render(
            <MemoryRouter>
                <ManualHandling
                    isOpen={true}
                    onClose={onClose}
                    qualificationId={qualificationId}
                    onDelete={onDelete}
                />
            </MemoryRouter>
        )

        const modal = screen.getByTestId('modal-overlay')
        fireEvent.click(modal)
        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls handleEditQualification when clicking "Edit Qualification"', () => {
        const onClose = jest.fn()
        const onDelete = jest.fn()
        const handleEditQualification = jest.fn()

        render(
            <MemoryRouter>
                <ManualHandling
                    isOpen={true}
                    onClose={onClose}
                    qualificationId={qualificationId}
                    onDelete={onDelete}
                />
            </MemoryRouter>
        )

        const editButton = screen.getByText('Edit Qualification')
        editButton.onclick = () => {
            handleEditQualification()
        }
        fireEvent.click(editButton)
        expect(handleEditQualification).toHaveBeenCalledTimes(1)
    })

    it('calls handleArchivedQualifications when clicking "Archive Qualification" inside an open modal', () => {
        const onClose = jest.fn()
        const onDelete = jest.fn()
        const handleArchivedQualifications = jest.fn()

        render(
            <MemoryRouter>
                <ManualHandling
                    isOpen={true}
                    onClose={onClose}
                    qualificationId={qualificationId}
                    onDelete={onDelete}
                />
            </MemoryRouter>
        );

        const archiveButton = screen.getByText('Archive Qualification')

        archiveButton.onclick = () => {
            handleArchivedQualifications()
        }

        fireEvent.click(archiveButton)

        expect(handleArchivedQualifications).toHaveBeenCalledTimes(1)
    })
})
