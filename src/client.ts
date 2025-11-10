import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
// These imports will be updated after code generation
import { Configuration } from './generated/configuration';
import { BaseAPI } from './generated/base';
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
 * Create a configured Axios instance for the API client
 */
function createAxiosInstance(options: HallocasaClientOptions): AxiosInstance {
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
export function createHallocasaClient(options: HallocasaClientOptions) {
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
    propertiesApi: new api.PropertiesApi(configuration, options.baseURL, axiosInstance),
    
    // Include the base axios instance for custom requests
    axios: axiosInstance,
    configuration,
  };
}

// This comment helps the update-client.js script locate where to insert API clients
// DO NOT REMOVE: API_CLIENTS_INSERTION_POINT 