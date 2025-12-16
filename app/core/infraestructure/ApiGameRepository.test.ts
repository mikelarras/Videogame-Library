import { ApiGameRepository } from "./ApiGameRepository";

describe('the API game repository', () => {
    beforeEach(() => {
        const mockGameData = [{ id: 1, name: 'Game 1', cover: 123}];
        const mockCoverData = [{ url: '//prueba' }];
        
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockGameData)
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve(mockCoverData)
            });
    })
    
    it('should retrieve the game id, name and cover from the API', async () => {
        const gameListByYear = await ApiGameRepository.listByYear(2025)
        expect(gameListByYear[0]).toEqual({
            id: 1,
            name: 'Game 1',
            cover: 'https://prueba'
        });
        expect(global.fetch).toHaveBeenCalledTimes(2)
    });

    afterEach(() => {
        jest.clearAllMocks()
    });
})