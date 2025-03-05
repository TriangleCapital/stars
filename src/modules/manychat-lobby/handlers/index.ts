import axios from 'axios';
import { BACKEND_API_URL } from '../../../shared/utils/urls';

export async function uploadFileToBackend(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${BACKEND_API_URL}/totalum/excel-leads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.leadsProcessed;
}
