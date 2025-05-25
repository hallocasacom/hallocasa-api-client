import axios from 'axios';
// These imports will be updated after code generation
import { Configuration } from './generated/configuration';
import * as api from './generated/api';
/**
 * Create a configured Axios instance for the API client
 */
function createAxiosInstance(options) {
    const { baseURL, apiKey, token, axiosConfig = {} } = options;
    // Create and configure axios instance
    const instance = axios.create({
        baseURL,
        ...axiosConfig,
    });
    // Add authentication headers if provided
    instance.interceptors.request.use((config) => {
        const updatedConfig = { ...config };
        if (apiKey) {
            updatedConfig.headers = updatedConfig.headers || {};
            updatedConfig.headers['X-API-Key'] = apiKey;
        }
        if (token) {
            updatedConfig.headers = updatedConfig.headers || {};
            updatedConfig.headers['Authorization'] = `Bearer ${token}`;
        }
        return updatedConfig;
    });
    return instance;
}
/**
 * Creates a configured Hallocasa API client with the provided options
 */
export function createHallocasaClient(options) {
    const axiosInstance = createAxiosInstance(options);
    // Create API configuration
    const configuration = new Configuration({
        basePath: options.baseURL,
        apiKey: options.apiKey,
        accessToken: options.token,
    });
    return {
        // API clients
        countriesApi: new api.CountriesApi(configuration, options.baseURL, axiosInstance),
        geoLocationApi: new api.GeoLocationApi(configuration, options.baseURL, axiosInstance),
        languagesApi: new api.LanguagesApi(configuration, options.baseURL, axiosInstance),
        alertsApi: new api.AlertsApi(configuration, options.baseURL, axiosInstance),
        // Include the base axios instance for custom requests
        axios: axiosInstance,
        configuration,
    };
}
// This comment helps the update-client.js script locate where to insert API clients
// DO NOT REMOVE: API_CLIENTS_INSERTION_POINT 
