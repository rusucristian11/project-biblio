import { useState, useEffect } from 'react'
import Modules from "../interfaces/modules"
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"
const useGetModules = () => {
    const [modules, setModules] = useState<Modules[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const api = useAuthorizationInterceptor()
    const fetchModules = async () => {
        try {
            const response = await api.get('/qualifications/modules/')

            const data: Modules[] = response.data
            setModules(data)
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
            fetchModules()
    }, [])

    return { modules, loading, error, setModules }
}

export default useGetModules
