import { Kandidat } from './Kandidat';

export type Query = {
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
    highlight?: {
        pre_tags?: string;
        post_tags?: string;
        fields: Record<HighlightedField, {}>;
    };
    sort?: {
        [felt: string]: {
            order: Sorteringsrekkefølge;
        };
    };
};

export type HighlightedField = 'yrkeJobbonskerObj.styrkBeskrivelse';

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
    highlight: Highlight;
    sort?: number[];
};

export type Highlight = Record<HighlightedField, string[] | undefined> | undefined;
