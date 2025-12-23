import { ApiGameRepository } from './ApiGameRepository';

describe('the API game repository', () => {
    beforeEach(() => {
        const mockGameData = [{ id: 1, name: 'Game 1', cover: 123 }];
        const mockCoverData = [{ url: '//prueba' }];

        global.fetch = jest
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockGameData),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCoverData),
            });
    });

    it('should retrieve the game id, name and cover from the API', async () => {
        const gameListByYear = await ApiGameRepository.listByYear(2025);
        expect(gameListByYear[0]).toEqual({
            id: 1,
            name: 'Game 1',
            cover: 'https://prueba',
        });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});

describe('the game details API repository', () => {
    beforeEach(() => {
        const mockGameDetails = [
            {
                id: 1,
                name: 'Game 1',
                cover: 123,
                first_release_date: 1766491590,
                genres: [9],
                involved_companies: [36393],
                platforms: [48],
                screenshots: [192916],
                summary: 'Lorem ipsum',
                storyline: 'Story: lorem ipsum',
            },
        ];

        const mockedCoverData = [{ url: '//prueba' }];

        const mockedGenreData = [{ name: 'Accion' }];

        const mockedCompanyData = [{ name: 'company' }];

        const mockedPlatformData = [{ name: 'PS6' }];

        const mockedScreenshotData = [{ url: 'https://captura1' }];

        global.fetch = jest
            .fn()
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockGameDetails),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockedCoverData),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockedGenreData),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockedCompanyData),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockedPlatformData),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockedScreenshotData),
            });
    });

    it('should retrieve all the required fields', async () => {
        const gameDetails = await ApiGameRepository.getGameDetails(1);
        expect(gameDetails).toEqual({
            id: 1,
            name: 'Game 1',
            cover: '//prueba',
            year: 2025,
            genres: ['Accion'],
            companies: ['Jakala'],
            platforms: ['PS6'],
            screenshots: ['https://captura1'],
            summary: 'Lorem ipsum',
            story: 'Story: lorem ipsum',
        });
    });
});
