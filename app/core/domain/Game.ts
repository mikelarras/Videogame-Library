export interface Game {
    id: number;
    name: string;
    cover: string | null;
}

export interface GameDetails {
    id: number;
    name: string;
    cover: string | null;
    year: number;
    genres: string[];
    companies: string[];
    platforms: string[];
    screenshots: string[];
    summary: string | null;
    story: string | null;
}
