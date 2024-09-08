import axios from './axios'

const apiClient = async (endpoint: string, params = {}, method = 'GET', data = null) => {
  try {
    const response = await axios.request({
      method,
      url: endpoint,
      data,
      params: {...axios.defaults.params, ...params}
    });
    return response.data;
  } catch (error: any) {
    console.error('API Error:', endpoint, error.response);
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
};

export default apiClient;
