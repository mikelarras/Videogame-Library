import { GameRepository } from "../domain/GameRepository";

export class GameService {
    constructor( private gameRepository: GameRepository ) {}

    getGamesByYear(year: number) {
        const games = this.gameRepository.listByYear(year)
        return games
    }
}