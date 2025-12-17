import Header from './components/Header';
import GameList from './components/GameList';
import styles from './page.module.css';
import { ApiGameRepository } from './core/infraestructure/ApiGameRepository';

export default function Home() {
    return (
        <div className={styles.content}>
            <Header />
            {/* <img src="./videogame-characters.png" alt="videogame" className={styles.welcomeImage}></img>
    <h1 className={styles.welcomeText}>BIENVENIDO A TU BIBLIOTECA DE VIDEOJUEGOS</h1> */}
            <GameList gameRepository={ApiGameRepository} />
        </div>
    );
}
