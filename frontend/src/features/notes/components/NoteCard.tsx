import type { Note } from '../hooks/useNotes';
import styles from './NoteCard.module.scss';

interface Props {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <article className={styles.noteCard}>
      <header className={styles.header}>
        <h3>{note.title}</h3>
        <time>{formatDate(note.created_at)}</time>
      </header>
      <p className={styles.content}>{note.content}</p>
      <footer className={styles.actions}>
        <button className={styles.editBtn} onClick={onEdit}>
          Editar
        </button>
        <button className={styles.deleteBtn} onClick={onDelete}>
          Eliminar
        </button>
      </footer>
    </article>
  );
}