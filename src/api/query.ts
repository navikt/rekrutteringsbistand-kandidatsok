import { Query, Sorteringsrekkefølge } from '../elasticSearchTyper';
import { Params } from '../useRespons';

export const PAGE_SIZE = 10;

export const lagQuery = (searchParams: URLSearchParams): Query => {
    const { q, side } = searchToParams(searchParams);

    const sidetall = Number(side) || 1;
    const query = q ? fritekstsøk(q) : alleKandidater;

    return {
        query,
        size: PAGE_SIZE,
        from: (sidetall - 1) * PAGE_SIZE,
        track_total_hits: true,
        sort: sorterSisteKandidaterFørst,
    };
};

const søkbareFelterIFritekstsøk = [
    'fritekst',
    'fornavn',
    'etternavn',
    'yrkeJobbonskerObj.styrkBeskrivelse',
];

const fritekstsøk = (q: string) => ({
    multi_match: {
        query: q,
        fields: søkbareFelterIFritekstsøk,
    },
});

const alleKandidater = {
    match_all: {},
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};

const searchToParams = (searchParams: URLSearchParams): Params =>
    Object.fromEntries(searchParams.entries());
