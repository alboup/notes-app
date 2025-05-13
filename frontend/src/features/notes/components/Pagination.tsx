import styles from './Pagination.module.scss';

interface Props { 
  current: number; 
  last: number; 
  onChange: (page: number) => void; 
}

export default function Pagination({ current, last, onChange }: Props) {
  return (
    <div className={styles.pagination}>
      <button 
        className={styles.pageButton}
        disabled={current === 1} 
        onClick={() => onChange(current - 1)}
      >
        Anterior
      </button>
      
      <span className={styles.pageInfo}>
        Página {current} de {last}
      </span>
      
      <button 
        className={styles.pageButton}
        disabled={current === last} 
        onClick={() => onChange(current + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}