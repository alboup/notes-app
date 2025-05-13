import { useState, useEffect } from 'react';
import { useNotes, useDeleteNote } from './hooks/useNotes';
import type { Note } from './hooks/useNotes';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import CreateButton from './components/CreateButton';
import NoteForm from './components/NoteForm';
import ConfirmDialog from './components/ConfirmDialog';

export default function NotesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);
  const [deletingNote, setDeletingNote] = useState<Note | undefined>(undefined);
  
  const { data, isLoading, error } = useNotes(page, search);
  const deleteNote = useDeleteNote();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  if (isLoading) return <div>Cargando notas...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!data) return <div>No hay datos</div>;

  const handleCreateNote = () => {
    setEditingNote(undefined);
    setShowForm(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(undefined);
  };

  const handleDeleteNote = (note: Note) => {
    setDeletingNote(note);
  };

  const confirmDelete = async () => {
    if (!deletingNote) return;
    
    try {
      await deleteNote.mutateAsync(deletingNote.id);
      setDeletingNote(undefined);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const cancelDelete = () => {
    setDeletingNote(undefined);
  };

  return (
    <div>
      <h1>Bloc de Notas</h1>
      
      <SearchBar 
        value={searchInput}
        onChange={setSearchInput}
      />
      
      <CreateButton onClick={handleCreateNote} />
      
      <p>Total notas: {data.total}</p>
      
      <div>
        {data.data.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={() => handleEditNote(note)}
            onDelete={() => handleDeleteNote(note)}
          />
        ))}
      </div>
      
      <Pagination 
        current={data.current_page} 
        last={data.last_page} 
        onChange={setPage} 
      />
      
      {showForm && (
        <NoteForm
          note={editingNote}
          onClose={handleCloseForm}
        />
      )}
      
      {deletingNote && (
        <ConfirmDialog
          title="Eliminar Nota"
          message={`¿Estás seguro de que quieres eliminar la nota "${deletingNote.title}"? Esta acción no se puede deshacer.`}
          isLoading={deleteNote.isPending}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}