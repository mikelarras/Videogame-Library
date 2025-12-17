import Header from './components/Header';
import GameList from './components/GameList';
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.content}>
            <Header />
            <GameList />
        </div>
    );
}
