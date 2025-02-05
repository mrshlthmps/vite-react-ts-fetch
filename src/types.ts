export type ApiResponse = {
    total: number;
    limit: number;
    offset: number;
    page: number;
    pages: number;
};

export type CharactersResponse = ApiResponse & {
    docs: Array<Character>;
};

export type QuotesResponse = ApiResponse & {
    docs: Array<Quote>;
};

export type Character = {
    _id: string;
    name: string;
    wikiUrl: string;
    race: string;
    birth?: string | number;
    gender?: string;
    death?: string | number;
    hair?: string;
    height?: string;
    realm?: string;
    spouse?: string;
};

export type Quote = {
    _id: string;
    dialog: string;
    movie: string;
    character?: string;
};