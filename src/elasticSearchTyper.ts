import { Kandidat } from './Kandidat';

export type SearchQuery = {
    size?: number;
    from?: number;
    track_total_hits?: boolean;
    query: {
        term?: Record<string, string>;
        match?: Record<string, MatchQuery>;
        bool?: object;
        match_all?: object;
        multi_match?: {
            query: string;
            fields: string[];
        };
        filter?: any;
    };
    sort?: {
        [felt: string]: {
            order: Sorteringsrekkefølge;
        };
    };
    _source?: string[];
};

export type SuggestQuery = {
    suggest: {
        forslag: {
            prefix: string;
            completion: {
                field: string;
                size: number;
                skip_duplicates: boolean;
            };
        };
    };
    _source: boolean;
};

export type FuzzySuggestQuery = {
    query: {
        match_phrase: {
            [field: string]: {
                query: string;
                slop: number;
            };
        };
    };
    aggs: {
        suggestions: {
            terms: {
                field: string;
            };
        };
    };
    size: number;
    _source: boolean;
};

export type Sorteringsrekkefølge = 'asc' | 'desc';

type MatchQuery = {
    query: string;
};

export type Respons = {
    took: number;
    timed_out: boolean;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: 'eq';
        };
        max_score: number | null;
        hits: Array<Hit>;
    };
};

export type Hit = {
    _index: string;
    _type: string;
    _id: string;
    _score: number | null;
    _source: Kandidat;
    sort?: number[];
};

export type SuggestionRespons = {
    suggest: {
        forslag: Array<{
            text: string;
            offset: number;
            length: number;
            options: Option[];
        }>;
    };
};

export type FuzzySuggestionRespons = {
    aggregations: {
        suggestions: {
            buckets: Array<{
                key: string;
            }>;
        };
    };
};

export type Option = {
    text: string;
    _source?: object;
};
