import type { Note } from '../hooks/useNotes';

interface Props { 
  note: Note; 
  onEdit: () => void; 
  onDelete: () => void; 
}

export default function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '1rem', 
      margin: '1rem 0',
      backgroundColor: 'white',
      borderRadius: '4px'
    }}>
      <h3 style={{ margin: '0 0 0.5rem 0' }}>{note.title}</h3>
      <p style={{ color: '#666', marginBottom: '0.5rem' }}>
        {note.content}
      </p>
      <div style={{ fontSize: '0.8rem', color: '#888' }}>
        {new Date(note.created_at).toLocaleDateString()}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={onEdit} style={{ marginRight: '0.5rem' }}>
          Editar
        </button>
        <button onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}