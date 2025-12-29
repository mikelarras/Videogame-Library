'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GameDetails } from '@/app/core/domain/Game';
import GameDetailsInfo from '@/app/components/GameDetailsInfo';
import styles from './page.module.css';

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

    if (!gameDetails) {
        return <p>Cargando detalles del juego {id}...</p>;
    }

    return (
        <div className={styles.gameDetailsView}>
            <GameDetailsInfo gameDetails={gameDetails} />
        </div>
    );
}
