"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHallocasaClient = createHallocasaClient;
const axios_1 = __importDefault(require("axios"));
// These imports will be updated after code generation
const configuration_1 = require("./generated/configuration");
const api = __importStar(require("./generated/api"));
/**
 * Create a configured Axios instance for the API client
 */
function createAxiosInstance(options) {
    const { baseURL, apiKey, token, axiosConfig = {} } = options;
    // Create and configure axios instance
    const instance = axios_1.default.create({
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
function createHallocasaClient(options) {
    const axiosInstance = createAxiosInstance(options);
    // Create API configuration
    const configuration = new configuration_1.Configuration({
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
