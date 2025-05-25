import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from './generated/configuration';
import * as api from './generated/api';
/**
 * Configuration options for the Hallocasa API client
 */
export interface HallocasaClientOptions {
    /**
     * Base URL for the API
     */
    baseURL: string;
    /**
     * Optional API key for authentication
     */
    apiKey?: string;
    /**
     * Optional authentication token
     */
    token?: string;
    /**
     * Additional Axios configuration options
     */
    axiosConfig?: AxiosRequestConfig;
}
/**
 * Creates a configured Hallocasa API client with the provided options
 */
export declare function createHallocasaClient(options: HallocasaClientOptions): {
    countriesApi: api.CountriesApi;
    geoLocationApi: api.GeoLocationApi;
    languagesApi: api.LanguagesApi;
    alertsApi: api.AlertsApi;
    axios: AxiosInstance;
    configuration: Configuration;
};
