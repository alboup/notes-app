import { useState, useEffect } from 'react';
import { useNotes } from './hooks/useNotes';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';

export default function NotesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  const { data, isLoading, error } = useNotes(page, search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // Solo resetear cuando aplicamos la búsqueda
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  if (isLoading) return <div>Cargando notas...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No hay datos</div>;

  return (
    <div>
      <h1>Bloc de Notas</h1>
      
      <SearchBar 
        value={searchInput}
        onChange={setSearchInput}
      />
      
      <p>Total notas: {data.total}</p>
      
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
      
      <Pagination 
        current={data.current_page} 
        last={data.last_page} 
        onChange={setPage} 
      />
    </div>
  );
}