'use client';
import GameListCard from './GameListCard';
import styles from './GameList.module.css';
import { Game } from '../core/domain/Game';
import { useEffect, useState } from 'react';

export default function GameList() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch('/api/games')
            .then((res) => res.json())
            .then(setGames)
            .catch(console.error);
    }, []);

    return (
        <ol className={styles.gameList} data-testid="game-list">
            {games.length > 0 ? (
                games.map((game: Game) => (
                    <GameListCard
                        key={game.id}
                        gameId={game.id}
                        gameImage={game.cover}
                        gameName={game.name}
                    />
                ))
            ) : (
                <p>Cargando juegos...</p>
            )}
        </ol>
    );
}
