import { useState, useEffect } from 'react'
import useAuthorizationInterceptor from "./useAuthorizationInterceptor"
import SharedLink from "../interfaces/shared-links"

const useGetSharedLinks = () => {
    const [sharedLinks, setSharedLinks] = useState<SharedLink[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const api = useAuthorizationInterceptor()

    const fetchSharedLinks = async () => {
        try {
            const response = await api.get('/qualifications/shared-links/')

            const data: SharedLink[] = response.data
            setSharedLinks(data.filter(link => !link.deleted))
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
        fetchSharedLinks()
    }, [])

    return { sharedLinks, loading, error, setSharedLinks }
}

export default useGetSharedLinks
