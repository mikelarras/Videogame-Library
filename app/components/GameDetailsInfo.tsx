import { GameDetails } from '../core/domain/Game';
import styles from './GameDetailsInfo.module.css';
import { useState, useEffect } from 'react';
import GameDetailsContent from './game-details/GameDetailsContent';
import GameDetailsScreenshotGallery from './game-details/GameDetailsScreenshotGallery';

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
            <GameDetailsContent gameDetails={gameDetails} />
            <GameDetailsScreenshotGallery
                screenshots={gameDetails.screenshots}
            />
        </main>
    );
}
