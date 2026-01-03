'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GameDetails } from '@/app/core/domain/Game';
import GameDetailsInfo from '@/app/components/GameDetailsInfo';
import styles from './page.module.css';
import Link from 'next/link';

export default function GameDetailsView() {
    const params = useParams();
    const id = params?.id as string;
    const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);

    useEffect(() => {
        if (!id) return;

        fetch(`/api/game-details?id=${id}`)
            .then((res) => {
                return res.json();
            })
            .then(setGameDetails)
            .catch(console.error);
    }, [id]);

    return (
        <div className={styles.pageContainer}>
            <header className={styles.detailsHeader}>
                <Link href={`/`}>
                    <img className={styles.homeIcon} src="/home-icon.svg"></img>
                </Link>
                <div className={styles.addButton}>
                    <span>Add to library</span>
                    <img src="/add-icon.svg"></img>
                </div>
            </header>
            {!gameDetails ? (
                <p className={styles.loadingText}>
                    Cargando detalles del juego {id} ...
                </p>
            ) : (
                <div className={styles.gameDetailsView}>
                    <GameDetailsInfo gameDetails={gameDetails} />
                </div>
            )}
        </div>
    );
}
