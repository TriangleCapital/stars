import { BACKEND_API_URL } from '../utils/urls';

export const autotraficApi = {};

type RequestParams = '';

const makeRequest = async (endpoint: string, data?: RequestParams) => {
  try {
    const response = await fetch(`${BACKEND_API_URL}/${endpoint}`, {
      method: data ? 'POST' : 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error('Failed to parse JSON');
    }

    return result;
  } catch (error: any) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error(error.message);
    }
  }
};
