import { GameDetails } from '@/app/core/domain/Game';
import styles from './GameDetailsContent.module.css';

export default function GameDetailsContent({
    gameDetails,
}: {
    gameDetails: GameDetails;
}) {
    const joinItems = (items: string[]) => {
        const jointItems = items
            .reduce((acc, item) => acc + item + ', ', '')
            .trim()
            .slice(0, -1);
        return jointItems;
    };

    return (
        <section className={styles.content}>
            <div className={styles.title}>
                <h1>{gameDetails.name}</h1>
                <span>{gameDetails.year}</span>
            </div>
            <ul className={styles.technicalDetails}>
                <li>
                    Developers:{' '}
                    <span>
                        {gameDetails.companies
                            ? joinItems(gameDetails.companies)
                            : '-'}
                    </span>
                </li>
                <li>
                    Genres:{' '}
                    <span>
                        {gameDetails.genres
                            ? joinItems(gameDetails.genres)
                            : '-'}
                    </span>
                </li>
                <li>
                    Platforms:{' '}
                    <span>
                        {gameDetails.platforms
                            ? joinItems(gameDetails.platforms)
                            : '-'}
                    </span>
                </li>
            </ul>
            <p className={styles.summary}>{gameDetails.summary}</p>
            {gameDetails.story && (
                <div className={styles.story}>
                    <h3>Story</h3>
                    <p>{gameDetails.story}</p>
                </div>
            )}
        </section>
    );
}
