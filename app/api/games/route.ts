import { NextResponse } from 'next/server';
import { GameService } from '@/app/core/services/gameService';
import { ApiGameRepository } from '@/app/core/infraestructure/ApiGameRepository';

export async function GET() {
    const gameService = new GameService(ApiGameRepository);

    try {
        const games = await gameService.getGamesByYear(2025);
        return NextResponse.json(games);
    } catch {
        return NextResponse.json(
            { error: 'Unable to fetch games' },
            { status: 500 }
        );
    }
}
