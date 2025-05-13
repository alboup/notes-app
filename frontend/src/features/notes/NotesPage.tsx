import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useNotes(1, search);

  if (isLoading) return <div>Cargando notas...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No hay datos</div>;

  return (
    <div>
      <h1>Bloc de Notas</h1>
      
      <SearchBar onSearch={setSearch} />
      
      <p>Total notas: {data.total} | Página: {data.current_page}/{data.last_page}</p>
      
      <div>
        {data.data.map(note => (
          <NoteCard 
            key={note.id} 
            note={note} 
            onEdit={() => console.log('Edit note', note.id)} 
            onDelete={() => console.log('Delete note', note.id)}
          />
        ))}
      </div>
    </div>
  );
}