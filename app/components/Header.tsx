import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <span>Video Game Library</span>
            <div className={styles.searchContainer}>
                <label htmlFor="game-search" className="sr-only">
                    Buscar juego
                </label>
                <img
                    src="./search-icon.svg"
                    alt=""
                    className={styles.searchIcon}
                />
                <input
                    id="game-search"
                    type="search"
                    placeholder="Busca un juego..."
                    className={styles.searchInput}
                />
            </div>
            <span>My Games</span>
        </header>
    );
}
