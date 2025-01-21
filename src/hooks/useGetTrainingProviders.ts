import { useState, useEffect } from 'react'
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"
import TrainingProvider from "../interfaces/training-provider"

const useGetTrainingProviders = () => {
    const [trainingProviders, setTrainingProviders] = useState<TrainingProvider[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const api = useAuthorizationInterceptor()

    const fetchTrainingProviders = async () => {
        try {
            const response = await api.get('/qualifications/training-providers/')

            const data: TrainingProvider[] = response.data
            setTrainingProviders(data)
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
        fetchTrainingProviders()
    }, [])

    return { trainingProviders, loading, error, setTrainingProviders }
}

export default useGetTrainingProviders
