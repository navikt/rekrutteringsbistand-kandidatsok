import { Query, Sorteringsrekkefølge } from '../elasticSearchTyper';
import { Portefølje } from '../filter/PorteføljeTabs';
import { Params } from '../useRespons';

export const PAGE_SIZE = 10;

export const lagQuery = (
    searchParams: URLSearchParams,
    navIdent: string | null,
    valgtNavKontor: string | null
): Query => {
    const { q, side, portefolje } = searchToParams(searchParams);

    const sidetall = Number(side) || 1;
    const query = q ? queryMedFritekstsøk(q) : queryUtenFritekstsøk;

    let krav = [];
    krav.push(query);

    if (portefolje === Portefølje.MineBrukere) {
        krav.push({
            term: {
                veileder: navIdent,
            },
        });
    } else if (portefolje === Portefølje.MittKontor) {
        krav.push({
            term: {
                navKontorNr: valgtNavKontor,
            },
        });
    }

    return {
        query: {
            bool: {
                must: krav,
            },
        },
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

const queryMedFritekstsøk = (q: string) => {
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

const queryUtenFritekstsøk = {
    match_all: {},
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};

const searchToParams = (searchParams: URLSearchParams): Params =>
    Object.fromEntries(searchParams.entries());
