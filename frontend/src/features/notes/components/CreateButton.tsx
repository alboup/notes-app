import styles from './CreateButton.module.scss';

interface Props {
  onClick: () => void;
}

export default function CreateButton({ onClick }: Props) {
  return (
    <button className={styles.createButton} onClick={onClick}>
      <span className={styles.icon}>✏️</span>
      Nueva Nota
    </button>
  );
}