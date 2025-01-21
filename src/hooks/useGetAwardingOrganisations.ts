import { useState, useEffect } from 'react'
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"
import AwardingOrganisations from "../interfaces/awarding-organisations"

const useGetAwardingOrganisations = () => {
    const [awardingOrganisations, setAwardingOrganisations] = useState<AwardingOrganisations[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const api = useAuthorizationInterceptor()

    const fetchAwardingOrganisations = async () => {
        try {
            const response = await api.get('/qualifications/awarding-organisations/')

            const data: AwardingOrganisations[] = response.data
            setAwardingOrganisations(data)
            setLoading(false)
        } catch (errorResponse) {
            if (typeof errorResponse === 'string') {
                setError(errorResponse)
            } else {
                setError("An error occurred.")
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAwardingOrganisations()
    }, [])

    return { awardingOrganisations, loading, error, setAwardingOrganisations }
}

export default useGetAwardingOrganisations
