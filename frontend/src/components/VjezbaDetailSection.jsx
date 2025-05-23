// Komponenta za prikaz i uređivanje vježbi u master-detail formi termina
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VjezbeDetailSection({ idTreninga }) {
  const [vjezbe, setVjezbe] = useState([]);
  const [editId, setEditId] = useState(null);
  const [novaVjezba, setNovaVjezba] = useState({
    naziv: '',
    ponavljanja: '',
    serije: '',
    uteg: ''
  });

  useEffect(() => {
    if (idTreninga) {
      axios.get(`/vjezbe/trening/${idTreninga}`).then(res => setVjezbe(res.data));
    } else {
      setVjezbe([]);
    }
  }, [idTreninga]);

  const handleInput = (e, id) => {
    setVjezbe(prev => prev.map(v =>
      v.id_vjezbe === id ? { ...v, [e.target.name]: e.target.value } : v
    ));
  };

  const handleUpdate = async (vjezba) => {
    await axios.put(`/vjezbe/${vjezba.id_vjezbe}`, vjezba);
    setEditId(null);
  };

  const handleCreate = async () => {
    const res = await axios.post('/vjezbe', novaVjezba);
    await axios.post('/trening_vjezba', { id_treninga: idTreninga, id_vjezbe: res.data.id_vjezbe });
    setNovaVjezba({ naziv: '', ponavljanja: '', serije: '', uteg: '' });
    const updated = await axios.get(`/vjezbe/trening/${idTreninga}`);
    setVjezbe(updated.data);
  };

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Detalji treninga – Vježbe</h3>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Naziv</th>
            <th className="border p-2">Ponavljanja</th>
            <th className="border p-2">Serije</th>
            <th className="border p-2">Uteg</th>
            <th className="border p-2">Akcija</th>
          </tr>
        </thead>
        <tbody>
          {vjezbe.map(v => (
            <tr key={v.id_vjezbe}>
              {editId === v.id_vjezbe ? (
                <>
                  <td className="border p-2"><input name="naziv" value={v.naziv} onChange={e => handleInput(e, v.id_vjezbe)} className="w-full border px-2" /></td>
                  <td className="border p-2"><input name="ponavljanja" value={v.ponavljanja} onChange={e => handleInput(e, v.id_vjezbe)} className="w-full border px-2" /></td>
                  <td className="border p-2"><input name="serije" value={v.serije} onChange={e => handleInput(e, v.id_vjezbe)} className="w-full border px-2" /></td>
                  <td className="border p-2"><input name="uteg" value={v.uteg} onChange={e => handleInput(e, v.id_vjezbe)} className="w-full border px-2" /></td>
                  <td className="border p-2">
                    <button onClick={() => handleUpdate(v)} className="text-green-600">Spremi</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{v.naziv}</td>
                  <td className="border p-2">{v.ponavljanja}</td>
                  <td className="border p-2">{v.serije}</td>
                  <td className="border p-2">{v.uteg}</td>
                  <td className="border p-2">
                    <button onClick={() => setEditId(v.id_vjezbe)} className="text-blue-600">Uredi</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <h4 className="font-medium mb-2">Dodaj novu vježbu</h4>
        <div className="grid grid-cols-4 gap-2 mb-2">
          <input placeholder="Naziv" value={novaVjezba.naziv} onChange={e => setNovaVjezba({ ...novaVjezba, naziv: e.target.value })} className="border px-2 py-1" />
          <input placeholder="Ponavljanja" value={novaVjezba.ponavljanja} onChange={e => setNovaVjezba({ ...novaVjezba, ponavljanja: e.target.value })} className="border px-2 py-1" />
          <input placeholder="Serije" value={novaVjezba.serije} onChange={e => setNovaVjezba({ ...novaVjezba, serije: e.target.value })} className="border px-2 py-1" />
          <input placeholder="Uteg" value={novaVjezba.uteg} onChange={e => setNovaVjezba({ ...novaVjezba, uteg: e.target.value })} className="border px-2 py-1" />
        </div>
        <button onClick={handleCreate} className="bg-green-600 text-white px-4 py-1 rounded">
          ➕ Dodaj vježbu
        </button>
      </div>
    </div>
  );
}
