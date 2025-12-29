import { GameDetails } from '../core/domain/Game';
import styles from './GameDetailsInfo.module.css';
import { useState, useEffect } from 'react';

export default function GameDetailsInfo({
    gameDetails,
}: {
    gameDetails: GameDetails;
}) {
    const [imageIndex, setImageIndex] = useState(-1);

    useEffect(() => {
        const imageIndexToShow = gameDetails.screenshots
            ? Math.floor(Math.random() * gameDetails.screenshots?.length)
            : 0;
        setImageIndex(imageIndexToShow);
    }, []);

    const joinItems = (items: string[]) => {
        const jointItems = items
            .reduce((acc, item) => acc + item + ', ', '')
            .trim()
            .slice(0, -1);
        return jointItems;
    };

    return (
        <main>
            <section className={styles.imageContainer}>
                <div className={styles.backgroundBlur}></div>
                <img
                    src={gameDetails.screenshots?.[imageIndex]}
                    className={styles.mainImage}
                    alt="Captura del juego"
                ></img>
            </section>

            <div className={styles.content}>
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
            </div>
        </main>
    );
}
