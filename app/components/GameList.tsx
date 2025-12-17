import GameListCard from './GameListCard';
import styles from './GameList.module.css';
import { GameService } from '../core/services/gameService';
import { GameRepository } from '../core/domain/GameRepository';
import { Game } from '../core/domain/Game';

export default async function GameList({
    gameRepository,
}: {
    gameRepository: GameRepository;
}) {
    const gameService = new GameService(gameRepository);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const gameList = await gameService.getGamesByYear(currentYear);

    console.log(gameList);
    return (
        <ol className={styles.gameList} data-testid="game-list">
            {gameList.map((game: Game) => (
                <GameListCard
                    key={game.id}
                    gameImage={game.cover}
                    gameName={game.name}
                />
            ))}
        </ol>
    );
}
