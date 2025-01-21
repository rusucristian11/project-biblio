import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import QualificationCard from './QualificationCard'
jest.mock('../ManualHandling', () => {
    return function MockManualHandling(props: {
        isOpen: boolean,
        onClose: () => void,
        qualificationId: number,
        onDelete: (qualificationId: number | null) => void
    }) {
        return (
            <div data-testid="manualHandlingMock">
                Manual Handling Modal Mock
                <button onClick={props.onClose}>Close</button>
            </div>
        )
    }
})


const qualification = {
    id: 20,
    certificate_name: "image-2023-06-29-11-22-52-272",
    certificate_image:
        "https://biblio-api-01.s3.amazonaws.com/uploads/certificates/a01c42ec-4490-4cb7-8ac5-7cfb1f767a54.png",
    qualification_title: "image-2023-06-29-11-22-52-272",
    issue_date: "2023-09-04T00:00:00Z",
    expire_date: "2023-09-30T00:00:00Z",
    archived: false,
    awarding_organisation: {
        id: 4,
        name: "FreeCodeCamp.org",
        created_at: "2023-07-17T11:23:36.548000Z",
        updated_at: "2023-07-17T11:23:36.548000Z",
        approved: true,
        deleted: false
    },
    module: {
        id: 4,
        name: "Module #3",
        created_at: "2023-07-17T11:04:44.646000Z",
        updated_at: "2023-07-17T11:04:44.646000Z",
        approved: true,
        deleted: false
    },
    training_provider: {
        id: 5,
        name: "HTMX.org",
        created_at: "2023-07-17T10:17:14.710000Z",
        updated_at: "2023-07-17T10:17:14.711000Z",
        approved: true,
        deleted: false
    },
    created_at: "2023-09-06T13:58:00.505252Z",
    updated_at: "2023-09-06T13:58:00.505272Z",
    deleted: false,
    user: {
        id: 16,
        user_detail: { deleted: false, token_code: "1234" },
        address_line_1: "Ceva 123",
        address_line_2: "",
        address_line_3: "",
        city: "Petrosani",
        created_at: "2023-08-11T07:10:58.357000Z",
        date_joined: "2023-08-11T07:10:58Z",
        deleted: false,
        email: "default_user@mail.com",
        first_name: "Cristian",
        full_name: "Cristian Rusu",
        last_name: "Rusu",
        phone_number: "0712817911",
        postcode: "332026",
        role: "ceva",
        updated_at: "2023-09-07T09:57:33.801096Z",
        userpic:
            "https://biblio-api-01.s3.amazonaws.com/uploads/userpics/326b4fad-0339-40cb-9afc-9c375f04b0ca.jpg"
    }
}



describe('QualificationCard Component', () => {
    it('renders qualification card correctly', () => {
        render(<QualificationCard qualification={qualification} onDelete={() => {}} />)

        expect(screen.getByTestId('qualification-title')).toBeInTheDocument()
        expect(screen.getByTestId('certificate-name')).toBeInTheDocument()
        expect(screen.getByTestId('module-name')).toBeInTheDocument()
        expect(screen.getByTestId('provider-name')).toBeInTheDocument()
        expect(screen.getByTestId('organisation-name')).toBeInTheDocument()
        expect(screen.getByTestId('issue-date')).toBeInTheDocument()
        expect(screen.getByTestId('expiry-date')).toBeInTheDocument()
    })

    it('opens Manual Handling modal when three dots are clicked', () => {
        render(<QualificationCard qualification={qualification} onDelete={() => {}} />)

        fireEvent.click(screen.getByTestId('three-dots-icon'))

        expect(screen.getByTestId('manualHandlingMock')).toBeInTheDocument()
    })

    it('closes Manual Handling modal when Close button is clicked', () => {
        render(<QualificationCard qualification={qualification} onDelete={() => {}} />)

        fireEvent.click(screen.getByTestId('three-dots-icon'))

        fireEvent.click(screen.getByText('Close'))

        expect(screen.queryByTestId('manualHandlingMock')).toBeNull()
    })
})
