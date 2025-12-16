import { GameRepository } from "../domain/GameRepository"
import { Game } from "../domain/Game"

interface ApiImageResponse{
    imageId: string;
    url: string;
}

interface ApiGameResponse{
    id: number;
    name: string;
    cover: number;
}

export const ApiGameRepository: GameRepository = {
    listByYear: async (year: number) => {
        const epochDateFrom = yearToEpochTimestamp(year)
        const epochDateTo = yearToEpochTimestamp(year + 1)
        const requestBody = `fields id, name, cover; where first_release_date > ${epochDateFrom} & first_release_date < ${epochDateTo} ; limit 20;`
        
        const gameListResponse = await gameListFetch(requestBody)
        const gameListByYear: Game[] = []

        await Promise.all(gameListResponse.map(async (gameResponse: ApiGameResponse) => {
            const imageResponse = await gameCoverFetch(gameResponse?.cover)
            const game = mapGameFromDTO(gameResponse, imageResponse[0])
            gameListByYear.push(game)
        }));

        return gameListByYear
    }
}

const mapGameFromDTO = (gameDTO: ApiGameResponse, imageDTO: ApiImageResponse) => {
    const parsedUrl = imageDTO?.url?.replace('t_thumb', 't_logo_med')
    return {
        id: gameDTO.id,
        name: gameDTO.name,
        cover: imageDTO.url ? `https:${parsedUrl}` : ''
    }
}

const yearToEpochTimestamp = (year: number): number => {
    const MILLISECONDS_IN_SECOND = 1000
    const dateTime = new Date(`${year}-01-01`)
    const epochDateTime = dateTime.getTime()/MILLISECONDS_IN_SECOND
    return epochDateTime
}

const gameListFetch = async (requestBody: string)=> {
    const response = await fetch('https://api.igdb.com/v4/games', {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain',
            'Client-ID': `${process.env.IGDB_API_CLIENT_ID}`,
            'Authorization': `Bearer ${process.env.IGDB_API_TOKEN}`
        },
        body: requestBody
    });

    return response.json()
}

const gameCoverFetch = async (coverId: number) => {
    const response = await fetch('https://api.igdb.com/v4/covers', {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain',
            'Client-ID': `${process.env.IGDB_API_CLIENT_ID}`,
            'Authorization': `Bearer ${process.env.IGDB_API_TOKEN}`
        },
        body: `fields image_id, url; where id=${coverId};`
    });

    return response.json()
}