import styles from './GameListCard.module.css';

export default function GameListCard({
    gameImage,
    gameName,
}: {
    gameImage: string | null;
    gameName: string;
}) {
    return (
        <li
            className={styles.gameListCard}
            style={
                gameImage ? { backgroundImage: `url(${gameImage})` } : undefined
            }
        >
            <img
                className={styles.gameImage}
                src={gameImage ?? undefined}
                alt={gameName}
            />
            <p>{gameName}</p>
            {/* <img className={styles.plusIcon} src="./imagenes/plus-icon.svg" alt="añadir a la biblioteca" /> */}
        </li>
    );
}
