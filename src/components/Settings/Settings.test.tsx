import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Settings from './Settings'
import mockedUser from '../../mocks/User.json'
import MockAdapter from "axios-mock-adapter"
import axios from "axios/index"

const mock = new MockAdapter(axios)

mock.onGet('/user/').reply(200, mockedUser)

describe('Settings', () => {
    it('renders the Settings component with user data', () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        )

        expect(screen.getByText('Settings')).toBeInTheDocument();
    })

    it('clicks the "View Your Account" link', () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        )

        const viewAccountLink = screen.getByText('View Your Account')
        fireEvent.click(viewAccountLink)
    })

    it('clicks the "Shared Links" link', () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        )

        const sharedLinksLink = screen.getByText('Shared Links')
        fireEvent.click(sharedLinksLink)
    })

    it('clicks the "Sign Out" menu item', () => {
        render(
            <MemoryRouter>
                <Settings />
            </MemoryRouter>
        )

        const signOutMenuItem = screen.getByText('Sign Out')
        fireEvent.click(signOutMenuItem)

    })
})