import {useState, useEffect} from 'react'
import Qualification from "../interfaces/qualifications"
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"

const useGetQualifications = () => {
    const [userQualifications, setUserQualifications] = useState<Qualification[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const api = useAuthorizationInterceptor()

    const fetchUserQualifications = async () => {
        try {
            const cacheResponse = await caches.match('/api/qualifications/');
            if (cacheResponse) {
                const data: Qualification[] = await cacheResponse.json();
                setUserQualifications(data);
            }
            const response = await api.get('/qualifications/');
            const data: Qualification[] = response.data;
            setUserQualifications(data);

            const cache = await caches.open('api-data-cache');
            const cacheData = new Response(JSON.stringify(data), {
                headers: {'Content-Type': 'application/json'},
            });
            cache.put('/api/qualifications/', cacheData);

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

    const refreshQualifications = async () => {
        setLoading(true);
        try {
            await fetchUserQualifications()
        } catch (errorResponse) {
            if (typeof errorResponse === 'string') {
                setError(errorResponse)
            } else {
                setError('An error occurred.')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const tokenWithQuotes = localStorage.getItem('access')
        const token = tokenWithQuotes ? tokenWithQuotes.replace(/"/g, '') : ''

        if (token) {
            fetchUserQualifications()
        } else {
            setLoading(false)
        }
    }, [])

    return {userQualifications, loading, error, setUserQualifications, refreshQualifications}
}

export default useGetQualifications
