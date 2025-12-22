import styles from './GameListCard.module.css';

export default function GameListCard({
    gameImage,
    gameName,
}: {
    gameImage: string | null;
    gameName: string;
}) {
    return (
        <li className={styles.gameListCard}>
            <div
                className={styles.backgroundImage}
                style={
                    gameImage
                        ? { backgroundImage: `url(${gameImage})` }
                        : undefined
                }
            ></div>
            <div className={styles.backgroundGradient}></div>
            <img
                className={styles.gameImage}
                src={gameImage ?? undefined}
                alt={`Portada de ${gameName}`}
            />
            <p>{gameName}</p>
            <img
                className={styles.plusIcon}
                src="./imagenes/plus-icon.svg"
                alt="añadir a la biblioteca"
            />
        </li>
    );
}
