import axios, { AxiosRequestConfig, AxiosError } from 'axios'

interface RefreshResponse {
    access: string
}

const api = axios.create()

const refreshToken = async (): Promise<string> => {
    try {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) {
            throw new Error('Refresh token not found')
        }

        // Remove surrounding quotes from the refresh token
        const cleanRefreshToken = refreshToken.replace(/^"(.*)"$/, '$1')

        const response = await api.post<RefreshResponse>(
            'https://biblio.nebulalabs.cc/api/token/refresh/',
            { refresh: cleanRefreshToken }
        )

        return response.data.access
    } catch (error) {
        throw new Error(`Token refresh failed: ${error}`)
    }
}

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            const storedAccessToken = localStorage.getItem('access')
            if (!storedAccessToken) {
                return Promise.reject(error)
            }

            try {
                const newAccessToken = await refreshToken()
                localStorage.setItem('access', newAccessToken)

                const config: AxiosRequestConfig = {
                    ...error.config,
                    headers: {
                        ...error.config?.headers,
                        Authorization: `Bearer ${newAccessToken}`,
                    },
                };

                return api.request(config)
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError)
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api
