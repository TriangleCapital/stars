const isTest = false;

const prodApiUrl = 'https://api.novafinance.es';
const localApiUrl = 'http://localhost:3300';
export const BACKEND_API_URL = isTest ? localApiUrl : prodApiUrl;