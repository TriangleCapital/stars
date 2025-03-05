const isTest = true;

const prodApiUrl = 'https://api.novafinance.es';
const localApiUrl = 'http://localhost:3100';
export const BACKEND_API_URL = isTest ? localApiUrl : prodApiUrl;