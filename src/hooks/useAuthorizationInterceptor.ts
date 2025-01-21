import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'

interface AccessTokenResponse {
    access: string
}

type AxiosHeaders = {
    [key: string]: string
}

const api = axios.create({
    baseURL: 'https://biblio.nebulalabs.cc/api'
})

const useAuthorizationInterceptor = () => {
    const [tokenRefreshing, setTokenRefreshing] = useState(false)

    const refreshAccessToken = async (refreshToken: string) => {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await api.post<AccessTokenResponse>('/token/refresh/', {
                refresh: refreshToken
            })
            return response.data;
        } catch (error) {
            throw error
        }
    }

    const applyHeaders = <T>(config: AxiosRequestConfig) => {
        const token = localStorage.getItem('access')
        if (token) {
            // Remove quotes from token
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            } as AxiosHeaders
        }
        return config as AxiosRequestConfig & T
    }

    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(
            async (config: AxiosRequestConfig) => applyHeaders(config),
            (error: AxiosError) => Promise.reject(error)
        )

        const responseInterceptor = api.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                if (error.response?.status === 401 && !tokenRefreshing) {
                    setTokenRefreshing(true)
                    const refreshToken = localStorage.getItem('refresh')

                    if (refreshToken) {
                        try {
                            const newAccessToken = await refreshAccessToken(refreshToken)
                            localStorage.setItem('access', newAccessToken.access)
                            setTokenRefreshing(false)
                            const newConfig = applyHeaders<AxiosRequestConfig>(error.config || {})
                            newConfig.headers = {
                                ...newConfig.headers,
                                Authorization: `Bearer ${newAccessToken.access}`,
                            }
                            return api.request(newConfig)
                        } catch (refreshError) {
                            setTokenRefreshing(false)
                        }
                    } else {
                        // Handle missing refresh token
                        setTokenRefreshing(false)
                    }
                }
                return Promise.reject(error)
            }
        )

        return () => {
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
        }
    }, [tokenRefreshing])

    return api
}

export default useAuthorizationInterceptor
