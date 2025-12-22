import { Game, GameDetails } from './Game';

export interface GameRepository {
    listByYear: (year: number) => Promise<Game[]>;
    getGameDetails: (gameId: number) => Promise<GameDetails>;
}
