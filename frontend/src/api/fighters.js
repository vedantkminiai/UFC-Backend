const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api/v1/fighter'

async function request(path = '', options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  const contentType = response.headers.get('content-type')
  return contentType?.includes('application/json') ? response.json() : response.text()
}

export const fighterApi = {
  getAll: () => request(),
  create: (fighter) =>
    request('', {
      method: 'POST',
      body: JSON.stringify(fighter),
    }),
  update: (fighter) =>
    request('', {
      method: 'PUT',
      body: JSON.stringify(fighter),
    }),
  remove: (fullName) =>
    request(`/${encodeURIComponent(fullName)}`, {
      method: 'DELETE',
    }),
}
