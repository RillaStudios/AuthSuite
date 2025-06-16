export const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

export const AUTH_API_ENDPOINTS = {
    LOGIN: `${AUTH_API_BASE_URL}/login`,
    REGISTER: `${AUTH_API_BASE_URL}/register`,
    LOGOUT: `${AUTH_API_BASE_URL}/logout`,
    REFRESH: `${AUTH_API_BASE_URL}/refresh`,
}