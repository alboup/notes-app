import { useState } from 'react';
import { useNotes } from './hooks/useNotes';

export default function NotesPage() {
  const { data, isLoading, error } = useNotes();

  if (isLoading) return <div>Cargando notas...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No hay datos</div>;

  return (
    <div>
      <h1>Bloc de Notas</h1>
      <p>Total notas: {data.total} | Página: {data.current_page}/{data.last_page}</p>
      
      <div>
        {data.data.map(note => (
          <div key={note.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>Creado: {new Date(note.created_at).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}