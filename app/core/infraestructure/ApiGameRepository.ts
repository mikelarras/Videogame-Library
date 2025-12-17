import { GameRepository } from '../domain/GameRepository';
import { Game } from '../domain/Game';
import { postRequest } from './FetchClient';

interface ApiImageDTO {
    url: string;
}

interface ApiGameDTO {
    id: number;
    name: string;
    cover?: number;
}

export const ApiGameRepository: GameRepository = {
    listByYear: async (year: number) => {
        const epochDateFrom = yearToEpochTimestamp(year);
        const epochDateTo = yearToEpochTimestamp(year + 1);
        const gamesRequestBody = `fields id, name, cover; where first_release_date > ${epochDateFrom} & first_release_date < ${epochDateTo} ; limit 20;`;

        const gameListDTO: ApiGameDTO[] = await postRequest(
            'https://api.igdb.com/v4/games',
            gamesRequestBody
        );

        const gameListWithCovers = await Promise.all(
            gameListDTO.map(async (gameDTO) => {
                const imageRequestBody = `fields url; where id=${gameDTO.cover};`;
                const imageDTO = await postRequest(
                    'https://api.igdb.com/v4/covers',
                    imageRequestBody
                );
                return { gameDTO, imageDTO };
            })
        );

        const gameListByYear: Game[] = gameListWithCovers.map(
            ({ gameDTO, imageDTO }) => mapGameFromDTO(gameDTO, imageDTO[0])
        );

        return gameListByYear;
    },
};

const mapGameFromDTO = (gameDTO: ApiGameDTO, imageDTO?: ApiImageDTO) => {
    if (!imageDTO) {
        return {
            id: gameDTO.id,
            name: gameDTO.name,
            cover: '',
        };
    }

    const parsedUrl = imageDTO.url.replace('t_thumb', 't_logo_med');
    return {
        id: gameDTO.id,
        name: gameDTO.name,
        cover: `https:${parsedUrl}`,
    };
};

const yearToEpochTimestamp = (year: number): number => {
    const MILLISECONDS_IN_SECOND = 1000;
    const dateTime = new Date(`${year}-01-01`);
    const epochDateTime = dateTime.getTime() / MILLISECONDS_IN_SECOND;
    return epochDateTime;
};
