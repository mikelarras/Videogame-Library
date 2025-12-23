import styles from './GameListCard.module.css';
import Link from 'next/link';

export default function GameListCard({
    gameId,
    gameImage,
    gameName,
}: {
    gameId: number;
    gameImage: string | null;
    gameName: string;
}) {
    const backgroundImageUrl = gameImage ?? './imagenes/no_disponible.png';
    return (
        <li>
            <Link href={`/games/${gameId}`} className={styles.gameListCard}>
                <div
                    className={styles.backgroundImage}
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                ></div>
                <div className={styles.backgroundGradient}></div>
                <img
                    className={styles.gameImage}
                    src={backgroundImageUrl}
                    alt={`Portada de ${gameName}`}
                />
                <p>{gameName}</p>
                <img
                    className={styles.plusIcon}
                    src="./imagenes/plus-icon.svg"
                    alt="añadir a la biblioteca"
                />
            </Link>
        </li>
    );
}
