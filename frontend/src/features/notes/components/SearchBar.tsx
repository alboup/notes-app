import styles from './SearchBar.module.scss';

interface Props {
  value: string;
  onChange: (value: string) => void; 
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Buscar notas..." }: Props) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}