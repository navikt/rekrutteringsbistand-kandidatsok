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
    'yrkeJobbonskerObj.sokeTitler',
];

const bareTallRegex = /^\d+$/;
const arenaKandidatnrRegex = /^[a-zA-Z]{2}[0-9]+/;
const pamKandidatnrRegex = /^PAM[0-9a-zA-Z]+/;

const fritekstsøk = (q: string) => {
    if (bareTallRegex.test(q) && q.length > 10) {
        return {
            bool: {
                should: [
                    {
                        term: {
                            aktorId: q,
                        },
                    },
                    {
                        term: {
                            fodselsnummer: q,
                        },
                    },
                ],
            },
        };
    } else if (arenaKandidatnrRegex.test(q) || pamKandidatnrRegex.test(q)) {
        return {
            term: {
                kandidatnr: q,
            },
        };
    } else {
        return {
            multi_match: {
                query: q,
                fields: søkbareFelterIFritekstsøk,
                fuzziness: 'AUTO',
            },
        };
    }
};

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
