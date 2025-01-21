import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AppHeader from './AppHeader'

describe('AppHeader Component', () => {
    it('renders without crashing', () => {
        render(<AppHeader openModal={() => {}} />)
    })

    it('renders the Biblio logo', () => {
        const { getByAltText } = render(<AppHeader openModal={() => {}} />)
        const biblioLogo = getByAltText('Biblio Logo')
        expect(biblioLogo).toBeInTheDocument()
    })

    it('calls the openModal function when the share button is clicked', () => {
        const openModalMock = jest.fn()
        const { getByAltText } = render(<AppHeader openModal={openModalMock} />)
        const shareButton = getByAltText('Share')

        fireEvent.click(shareButton)

        expect(openModalMock).toHaveBeenCalled()
    })
})
