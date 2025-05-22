import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../api/users';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Jesi siguran da želiš obrisati korisnika?')) {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  return (
    <div>
      <h2>Korisnici</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
            <button onClick={() => handleDelete(user.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
