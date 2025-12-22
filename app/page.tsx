import Header from './components/Header';
import GameList from './components/GameList';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.content}>
            <Header />
            <GameList />
        </main>
    );
}
