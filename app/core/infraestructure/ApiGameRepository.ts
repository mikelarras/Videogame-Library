import { GameRepository } from '../domain/GameRepository';
import { Game, GameDetails } from '../domain/Game';
import { postRequest } from './FetchClient';

interface ApiImageDTO {
    url: string;
}

interface ApiGameDTO {
    id: number;
    name: string;
    cover?: number;
}

interface APIGameDetailsDTO {
    id: number;
    name: string;
    cover?: number;
    first_release_date: number;
    genres: number[];
    involved_companies?: number[];
    platforms: number[];
    screenshots?: number[];
    summary: string;
    storyline?: string;
}

interface APIGenreDTO {
    name: string;
}

interface APICompanyDTO {
    name: string;
}

interface APIPlatformDTO {
    name: string;
}

interface APIScreenshotDTO {
    url: string;
}

const GAMES_TO_FETCH = 10;
const MILLISECONDS_IN_SECOND = 1000;

export const ApiGameRepository: GameRepository = {
    listByYear: async (year: number) => {
        const epochDateFrom = yearToEpochTimestamp(year);
        const epochDateTo = yearToEpochTimestamp(year + 1);
        const gamesRequestBody = `fields id, name, cover; where first_release_date > ${epochDateFrom} & first_release_date < ${epochDateTo} ; limit ${GAMES_TO_FETCH};`;

        const gameListDTO: ApiGameDTO[] = await postRequest(
            'https://api.igdb.com/v4/games',
            gamesRequestBody
        );

        const gameListWithCovers = await Promise.all(
            gameListDTO.map(async (gameDTO) => {
                const imageRequestBody = `fields url; where id=${gameDTO.cover};`;
                const imageDTO = gameDTO.cover
                    ? await postRequest(
                          'https://api.igdb.com/v4/covers',
                          imageRequestBody
                      )
                    : [{ url: null }];

                return { gameDTO, imageDTO };
            })
        );

        const gameListByYear: Game[] = gameListWithCovers.map(
            ({ gameDTO, imageDTO }) => mapGameFromDTO(gameDTO, imageDTO[0])
        );

        return gameListByYear;
    },

    getGameDetails: async (gameId: number) => {
        const requestBody = `fields *;where id = ${gameId};`;
        const gameDetailsDTO: APIGameDetailsDTO[] = await postRequest(
            'https://api.igdb.com/v4/games',
            requestBody
        );

        const imageRequestBody = `fields url; where id=${gameDetailsDTO[0].cover};`;
        const imageDTO: ApiImageDTO[] = gameDetailsDTO[0].cover
            ? await postRequest(
                  'https://api.igdb.com/v4/covers',
                  imageRequestBody
              )
            : [{ url: null }];

        const genresDTO: APIGenreDTO[] | null = await resolvePromises(
            gameDetailsDTO[0].genres,
            'https://api.igdb.com/v4/genres',
            'name'
        );

        const companiesDTO: APICompanyDTO[] | null = !gameDetailsDTO[0]
            .involved_companies
            ? null
            : await resolvePromises(
                  gameDetailsDTO[0].involved_companies,
                  'https://api.igdb.com/v4/companies',
                  'name'
              );

        const platformsDTO: APIPlatformDTO[] | null = await resolvePromises(
            gameDetailsDTO[0].platforms,
            'https://api.igdb.com/v4/platforms',
            'name'
        );

        const screenshotsDTO: APIScreenshotDTO[] | null = !gameDetailsDTO[0]
            .screenshots
            ? null
            : await resolvePromises(
                  gameDetailsDTO[0].screenshots,
                  'https://api.igdb.com/v4/screenshots',
                  'url'
              );

        const gameDetails = mapGameDetailsFromDTO(
            gameDetailsDTO[0],
            imageDTO[0],
            genresDTO,
            companiesDTO,
            platformsDTO,
            screenshotsDTO
        );

        return gameDetails;
    },
};

const resolvePromises = async (
    fieldList: number[],
    requestUrl: string,
    requestParam: string
) => {
    return Promise.all(
        fieldList.map(async (field) => {
            const requestBody = `fields ${requestParam}; where id=${field};`;
            const fieldListDTO = field
                ? await postRequest(requestUrl, requestBody)
                : [null];
            return fieldListDTO[0];
        })
    );
};

const mapGameDetailsFromDTO = (
    gameDetailsDTO: APIGameDetailsDTO,
    imageDTO: ApiImageDTO,
    genresDTO: APIGenreDTO[],
    companiesDTO: APICompanyDTO[] | null,
    platformDTO: APIPlatformDTO[],
    screenshotDTO: APIScreenshotDTO[] | null
): GameDetails => {
    return {
        id: gameDetailsDTO.id,
        name: gameDetailsDTO.name,
        cover: imageDTO.url || null,
        year: epochTimestampToYear(gameDetailsDTO.first_release_date),
        genres: genresDTO.map((genre: APIGenreDTO) => genre.name),
        companies: ['Jakala'],
        platforms: platformDTO.map(
            (platform: APIPlatformDTO) => platform?.name ?? null
        ),
        screenshots: screenshotDTO
            ? screenshotDTO.map(
                  (screenshot: APIScreenshotDTO) => screenshot.url
              )
            : null,
        summary: gameDetailsDTO.summary || 'No hay descripción',
        story: gameDetailsDTO.storyline || null,
    };
};

const mapGameFromDTO = (gameDTO: ApiGameDTO, imageDTO: ApiImageDTO) => {
    if (!imageDTO.url) {
        return {
            id: gameDTO.id,
            name: gameDTO.name,
            cover: null,
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
    const dateTime = new Date(`${year}-01-01`);
    const epochDateTime = dateTime.getTime() / MILLISECONDS_IN_SECOND;
    return epochDateTime;
};

const epochTimestampToYear = (epoch: number): number => {
    const date = new Date(epoch * MILLISECONDS_IN_SECOND);
    return date.getFullYear();
};
