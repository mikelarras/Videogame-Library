import { NextRequest, NextResponse } from 'next/server';
import { GameService } from '@/app/core/services/gameService';
import { ApiGameRepository } from '@/app/core/infraestructure/ApiGameRepository';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: 'ID parameter is required' },
            { status: 400 }
        );
    }

    const gameService = new GameService(ApiGameRepository);
    try {
        const gameDetails = await gameService.getGameDetailsById(
            parseInt(id, 10)
        );
        return NextResponse.json(gameDetails);
    } catch {
        return NextResponse.json(
            { error: 'Unable to fetch game details' },
            { status: 500 }
        );
    }
}
