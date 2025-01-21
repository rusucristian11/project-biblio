import { useState, useEffect } from 'react'
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"
import User from '../interfaces/user'

const useUserData = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const api = useAuthorizationInterceptor()

    const fetchUserData = async () => {
        try {
            const response = await api.get('/user/')

            const data: User = response.data
            setUserData(data)
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
        fetchUserData()
    }, [])

    return { userData, loading, error, setUserData }
}

export default useUserData
