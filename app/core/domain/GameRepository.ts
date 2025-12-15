import { Game } from './Game'

export interface GameRepository {
    listByYear: (year: number) => Promise<Game[]>
}