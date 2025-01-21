import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ManageSharedLinks from './ManageSharedLinks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockedData from '../../mocks/SharedLinks.json'
import * as useGetSharedLinksModule from '../../hooks/useGetSharedLinks'
import {MemoryRouter} from "react-router-dom"

const mock = new MockAdapter(axios)

mock.onGet('/qualifications/shared-links/').reply(200, mockedData)

describe('ManageSharedLinks', () => {

    let getSharedLinksSpy: jest.SpyInstance

    it('renders the component with mocked data', () => {
        render(
            <MemoryRouter>
                <ManageSharedLinks/>
            </MemoryRouter>
        )

        expect(screen.getByText('Manage Links')).toBeInTheDocument();
    })

    it('renders empty state when there are no shared links', () => {
        jest.mock('../../hooks/useGetSharedLinks', () => ({
            __esModule: true,
            default: jest.fn(() => ({
                sharedLinks: [],
                setSharedLinks: jest.fn()
            }))
        }))

        render(
            <MemoryRouter>
                <ManageSharedLinks />
            </MemoryRouter>
        )

        expect(screen.getByText("Get Started")).toBeInTheDocument()
        expect(screen.getByText("It's currently empty in here, go ahead and share some links.")).toBeInTheDocument()
    })
})
