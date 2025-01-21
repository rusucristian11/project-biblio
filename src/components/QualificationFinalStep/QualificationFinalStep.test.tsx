import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import QualificationFinalStep from './QualificationFinalStep'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockModules from '../../mocks/Modules.json'
import mockTrainingProviders from '../../mocks/TrainingProviders.json'
import mockAwardingOrganisations from '../../mocks/AwardingOrganisations.json'
import * as useGetModulesModule from '../../hooks/useGetModules'
import * as useGetTrainingProvidersModule from '../../hooks/useGetTrainingProviders'
import * as useGetAwardingOrganisationsModule from '../../hooks/useGetAwardingOrganisations'
import {MemoryRouter} from "react-router-dom"

const mock = new MockAdapter(axios)

mock.onGet('/qualifications/modules/').reply(200, mockModules)
mock.onGet('/qualifications/training-providers/').reply(200, mockTrainingProviders)
mock.onGet('/qualifications/awarding-organisations/').reply(200, mockAwardingOrganisations)

describe('QualificationFinalStep', () => {
    let getModulesSpy: jest.SpyInstance
    let getTrainingProvidersSpy: jest.SpyInstance
    let getAwardingOrganisationsSpy: jest.SpyInstance
    it('renders the QualificationFinalStep component with mocked data', async () => {
        render(
            <MemoryRouter>
                <QualificationFinalStep onNext={() => {
                }} onBack={() => {
                }} image={null} certificateName="Sample Certificate"/>
            </MemoryRouter>
        )
        getModulesSpy = jest.spyOn(useGetModulesModule, 'default')
        getModulesSpy.mockReturnValue({
            modules: mockModules,
            loading: false,
            error: null,
            setModules: jest.fn()
        })

        getTrainingProvidersSpy = jest.spyOn(useGetTrainingProvidersModule, 'default')
        getTrainingProvidersSpy.mockReturnValue({
            trainingProviders: mockTrainingProviders,
            loading: false,
            error: null,
            setTrainingProviders: jest.fn()
        })

        getAwardingOrganisationsSpy = jest.spyOn(useGetAwardingOrganisationsModule, 'default')
        getAwardingOrganisationsSpy.mockReturnValue({
            awardingOrganisations: mockAwardingOrganisations,
            loading: false,
            error: null,
            setAwardingOrganisations: jest.fn()
        })

        getModulesSpy.mockRestore()
        getTrainingProvidersSpy.mockRestore()
        getAwardingOrganisationsSpy.mockRestore()

        await waitFor(() => {
            expect(screen.getByText('Qualification Details')).toBeInTheDocument()
        })
    })
})
