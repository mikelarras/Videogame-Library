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
    companies: string[] | null;
    platforms: string[];
    screenshots: string[] | null;
    summary: string | null;
    story: string | null;
}
