import { GameRepository } from "../domain/GameRepository";

export class GameService {
    constructor( private gameRepository: GameRepository ) {}

    async getGamesByYear(year: number) {
        const games = await this.gameRepository.listByYear(year)
        return games
    }
}