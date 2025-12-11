import Header from "./components/Header";
import GameList from "./components/GameList";
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.content}>
    <Header />
    {/* <img src="./videogame-characters.png" alt="videogame" className={styles.welcomeImage}></img>
    <h1 className={styles.welcomeText}>BIENVENIDO A TU BIBLIOTECA DE VIDEOJUEGOS</h1> */}
    <GameList />
    </div>
  );
}
