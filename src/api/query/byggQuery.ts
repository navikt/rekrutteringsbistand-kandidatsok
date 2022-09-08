import { SearchQuery, Sorteringsrekkefølge } from '../../elasticSearchTyper';
import { InnloggetBruker } from '../../hooks/useBrukerensIdent';
import { Søkekriterier } from '../../hooks/useRespons';
import { queryMedFritekst } from './queryMedFritekst';
import { queryMedInnsatsgruppe } from './queryMedInnsatsgruppe';
import { queryMedPortefølje } from './queryMedPortefølje';
import queryMedØnsketYrke from './queryMedØnsketYrke';
import queryMedØnsketSted from './queryMedØnsketSted';
import queryMedPrioritertMålgruppe from './queryMedPrioritertMålgruppe';
import queryMedTilretteleggingsbehov from './queryMedTilretteleggingsbehov';
import queryMedKompetanse from './queryMedKompetanse';
import queryMedFørerkort from './queryMedFørerkort';
import { queryMedHovedmål } from './queryMedHovedmål';
import { queryMedUtdanningsnivå } from './queryMedUtdanningsnivå';
import { queryMedArbeidserfaring } from './queryMedArbeidserfaring';

export const PAGE_SIZE = 15;

const interessanteKandidatfelter = [
    'fodselsnummer',
    'fornavn',
    'etternavn',
    'arenaKandidatnr',
    'kvalifiseringsgruppekode',
    'yrkeJobbonskerObj',
    'geografiJobbonsker',
];

export const byggQuery = (
    søkekriterier: Søkekriterier,
    innloggetBruker: InnloggetBruker
): SearchQuery => {
    const { side } = søkekriterier;

    return {
        query: byggIndreQuery(søkekriterier, innloggetBruker),
        size: PAGE_SIZE,
        from: (side - 1) * PAGE_SIZE,
        track_total_hits: true,
        sort: søkekriterier.fritekst ? undefined : sorterSisteKandidaterFørst,
        _source: interessanteKandidatfelter,
    };
};

export const byggIndreQuery = (søkekriterier: Søkekriterier, innloggetBruker: InnloggetBruker) => {
    const {
        fritekst,
        portefølje,
        innsatsgruppe,
        hovedmål,
        ønsketYrke,
        ønsketSted,
        kompetanse,
        førerkort,
        prioritertMålgruppe,
        harTilretteleggingsbehov,
        behovskategori,
        utdanningsnivå,
        arbeidserfaring,
        arbeidserfaringErFersk,
    } = søkekriterier;

    return {
        bool: {
            must: [
                ...queryMedFritekst(fritekst),
                ...queryMedPortefølje(portefølje, innloggetBruker),
                ...queryMedInnsatsgruppe(innsatsgruppe),
                ...queryMedHovedmål(hovedmål),
                ...queryMedØnsketYrke(ønsketYrke),
                ...queryMedØnsketSted(ønsketSted),
                ...queryMedKompetanse(kompetanse),
                ...queryMedFørerkort(førerkort),
                ...queryMedPrioritertMålgruppe(prioritertMålgruppe),
                ...queryMedTilretteleggingsbehov(harTilretteleggingsbehov, behovskategori),
                ...queryMedUtdanningsnivå(utdanningsnivå),
                ...queryMedArbeidserfaring(arbeidserfaring, arbeidserfaringErFersk),
            ],
        },
    };
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};
