import { useState } from 'react';
import { useNotes } from './hooks/useNotes';

export default function NotesPage() {
  const { data, isLoading, error } = useNotes();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No hay datos</div>;

  return (
    <div>
      <h1>Notes App</h1>
      <p>Total notas: {data.total}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}