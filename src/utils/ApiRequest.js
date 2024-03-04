const baseUrl = '/api/v1';

const API_URL = process.env.REACT_APP_API_URL

async function apiRequest(url, method = 'GET', body = null) {
  const sessionToken = localStorage.getItem('sessionToken');
  const requestOptions = {
    method,
    headers: {
      'Authorization': `Bearer ${sessionToken}`,
    },
    body,
  };

  if (!(body instanceof FormData)) {
    requestOptions.headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${API_URL}${baseUrl}${url}`, requestOptions);
  const data = await response.json();
  return data;
}

export default apiRequest;
