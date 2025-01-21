import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Footer from './Footer'

describe('Footer Component', () => {
    it('renders the copyright text', () => {
        const { getByText } = render(<Footer />)
        const copyrightText = getByText(/©2023 Biblio. All rights reserved./i)
        expect(copyrightText).toBeInTheDocument()
    })
})