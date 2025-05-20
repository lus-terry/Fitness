const API_URL = 'http://localhost:3000/api/users'; // prilagodi prema stvarnom endpointu

export const getAllUsers = async () => {
  const response = await fetch(API_URL, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Neuspješno dohvaćanje korisnika');
  return response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Korisnik nije pronađen');
  return response.json();
};

export const updateUserRole = async (id, role) => {
  const response = await fetch(`${API_URL}/${id}/role`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Greška pri ažuriranju uloge');
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Greška pri brisanju korisnika');
};
