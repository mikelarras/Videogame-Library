import styles from './GameListCard.module.css';

export default function GameListCard({ gameImage, gameName, gameDescription= 'Sin descripción' }: { gameImage: string, gameName: string, gameDescription: string }) {
  return (
    <li className={styles.gameListCard} style={{ backgroundImage: `url(${gameImage})` }}>
      <img className={styles.gameImage} src={gameImage} alt={gameName} />
      <p>{gameName}</p>
      <p>{gameDescription}</p>
      <img className={styles.plusIcon} src="./imagenes/plus-icon.svg" alt="añadir a la biblioteca" />
    </li>
  );
}