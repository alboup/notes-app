import styles from './SearchBar.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void; 
  onEnter?: () => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, onEnter, placeholder = "Buscar notas..." }: Props) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onEnter?.()
          }
        }}
      />
    </div>
  );
}