import { useState, useEffect } from 'react';
import type { Note } from '../hooks/useNotes';
import { useCreateNote, useUpdateNote } from '../hooks/useNotes';
import styles from './NoteForm.module.scss';

interface Props {
  note?: Note; // Para edición, undefined para creación
  onClose: () => void;
}

export default function NoteForm({ note, onClose }: Props) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  
  const createNote = useCreateNote();
  const updateNote = useUpdateNote();
  
  const isEditing = !!note;
  const isLoading = createNote.isPending || updateNote.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    try {
      if (isEditing) {
        await updateNote.mutateAsync({ id: note.id, title, content });
      } else {
        await createNote.mutateAsync({ title, content });
      }
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        
        <h2 className={styles.title}>
          {isEditing ? 'Editar Nota' : 'Nueva Nota'}
        </h2>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="title">
              Título
            </label>
            <input
              id="title"
              type="text"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa el título..."
              required
            />
          </div>
          
          <div className={styles.field}>
            <label className={styles.label} htmlFor="content">
              Contenido
            </label>
            <textarea
              id="content"
              className={styles.textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido de tu nota..."
              required
            />
          </div>
          
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !title.trim() || !content.trim()}
            >
              {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}