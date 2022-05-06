export const apiPost = async <T, K>(
  url: string,
  payload: K,
  resHandler: 'statusText' | 'json' = 'statusText'
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    if (resHandler === 'json') {
      const err = await response.json();
      throw new Error(err.message);
    } else {
      throw new Error(response.statusText);
    }
  }
  return response.json();
};

const corsHeaders = new Headers();
corsHeaders.append('Content-Type', 'application/json');
corsHeaders.append('Accept', 'application/json');
corsHeaders.append('Origin', 'https://localhost:3000');

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: corsHeaders,
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const apiGetWOCors = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const apiPostWithToken = async <T, K>(
  url: string,
  payload: K,
  token: string
): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
