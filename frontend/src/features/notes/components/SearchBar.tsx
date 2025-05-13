import { useState, useEffect } from 'react';
import styles from './SearchBar.module.scss';

interface Props {
  onSearch: (search: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Buscar notas..." }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}