import axios from 'axios';
import { BACKEND_API_URL } from '../../../shared/utils/urls';

export async function uploadFileToBackend(formData: FormData) {
  const response = await axios.post(`${BACKEND_API_URL}/totalum/excel-leads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { leadsProcessed, leadsOmitted } = response.data;

  return { leadsProcessed, leadsOmitted };
}
