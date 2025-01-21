import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './NavBar'

describe('Navbar Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )
    })

    it('renders Navbar with links', () => {
        const homeLink = screen.getByText('Home')
        const addQualificationsLink = screen.getByText('Add Qualifications')
        const settingsLink = screen.getByText('Settings')

        expect(homeLink).toBeInTheDocument()
        expect(addQualificationsLink).toBeInTheDocument()
        expect(settingsLink).toBeInTheDocument()
    })

    it('clicking on Home link updates active link state', () => {
        const homeLink = screen.getByText('Home')
        const handleLinkClick = jest.fn()

        homeLink.onclick = () => {
            handleLinkClick()
        }
        fireEvent.click(homeLink)

        expect(homeLink.parentElement).toHaveClass('active')
    })

    it('clicking on Add Qualifications link updates active link state', () => {
        const addQualificationsLink = screen.getByText('Add Qualifications')
        const handleLinkClick = jest.fn()

        addQualificationsLink.onclick = () => {
            handleLinkClick()
        }

        fireEvent.click(addQualificationsLink)

        expect(addQualificationsLink.parentElement).toHaveClass('active')
    })

    it('clicking on Settings link updates active link state', () => {
        const settingsLink = screen.getByText('Settings')
        const handleLinkClick = jest.fn()

        settingsLink.onclick = () => {
            handleLinkClick()
        }

        fireEvent.click(settingsLink)

        expect(settingsLink.parentElement).toHaveClass('active')
    })
})
