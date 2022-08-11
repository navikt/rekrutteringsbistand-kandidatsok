import { Query, Sorteringsrekkefølge } from '../elasticSearchTyper';
import { Portefølje } from '../filter/PorteføljeTabs';
import { InnloggetBruker } from '../hooks/useBrukerensIdent';
import { Params } from '../hooks/useRespons';

export const PAGE_SIZE = 10;

export const lagQuery = (
    searchParams: URLSearchParams,
    innloggetBruker: InnloggetBruker
): Query => {
    const { q, side, portefolje } = searchToParams(searchParams);
    const sidetall = Number(side) || 1;
    const portefølje = (portefolje as Portefølje) || Portefølje.Alle;

    return {
        query: {
            bool: {
                must: [
                    q ? queryMedFritekstsøk(q) : queryUtenFritekstsøk,
                    ...queryMedPortefølje(portefølje, innloggetBruker),
                ],
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

const queryMedPortefølje = (portefølje: Portefølje, innloggetBruker: InnloggetBruker) => {
    if (portefølje === Portefølje.MineBrukere) {
        return [
            {
                term: {
                    veileder: innloggetBruker.navIdent || '',
                },
            },
        ];
    } else if (portefølje === Portefølje.MittKontor) {
        return [
            {
                term: {
                    navKontorNr: innloggetBruker.navKontor || '',
                },
            },
        ];
    } else {
        return [];
    }
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};

const searchToParams = (searchParams: URLSearchParams): Params =>
    Object.fromEntries(searchParams.entries());
