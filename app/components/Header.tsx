import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
    <span>Video Game Library</span>
    <div className={styles.searchContainer}>
      <img src="./search-icon.svg" alt="buscar" className={styles.searchIcon}/>
      <input type="text" placeholder="Busca un juego..." className={styles.searchInput}/>
    </div>
    <span>My Games</span>
    </div>
  );
}