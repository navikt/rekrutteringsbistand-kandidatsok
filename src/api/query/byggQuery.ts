import { InnloggetBruker } from '../../hooks/useBrukerensIdent';
import { queryMedArbeidserfaring } from './queryMedArbeidserfaring';
import { queryMedFørerkort } from './queryMedFørerkort';
import { queryMedFritekst } from './queryMedFritekst';
import { queryMedHovedmål } from './queryMedHovedmål';
import { queryMedInnsatsgruppe } from './queryMedInnsatsgruppe';
import { queryMedKompetanse } from './queryMedKompetanse';
import { queryMedKravOmBosted } from './queryMedKravOmBosted';
import { queryMedØnsketSted } from './queryMedØnsketSted';
import { queryMedØnsketYrke } from './queryMedØnsketYrke';
import { queryMedPortefølje } from './queryMedPortefølje';
import { queryMedPrioritertMålgruppe } from './queryMedPrioritertMålgruppe';
import { queryMedSpråk } from './queryMedSpråk';
import { queryMedUtdanningsnivå } from './queryMedUtdanningsnivå';
import { SearchQuery, Sorteringsrekkefølge } from '../../kandidater/elasticSearchTyper';
import { Søkekriterier } from '../../hooks/useSøkekriterier';
import { queryMedValgtKontor } from './queryMedValgtKontor';
import { Sortering } from '../../kandidater/sortering/Sortering';

export const PAGE_SIZE = 25;

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
    const { side, sortering } = søkekriterier;

    return {
        query: byggIndreQuery(søkekriterier, innloggetBruker),
        size: PAGE_SIZE,
        from: (side - 1) * PAGE_SIZE,
        track_total_hits: true,
        sort: sorter(sortering),
        _source: interessanteKandidatfelter,
    };
};

const sorter = (sortering: Sortering) => {
    switch (sortering) {
        case Sortering.FlestKriterier:
            return undefined;
        case Sortering.SisteFørst:
            return sorterSisteKandidaterFørst;
        default:
            return undefined;
    }
};

export const byggQueryForAktørIder = (
    søkekriterier: Søkekriterier,
    innloggetBruker: InnloggetBruker,
    maksAntallKandidater: number
): SearchQuery => {
    return {
        query: byggIndreQuery(søkekriterier, innloggetBruker),
        size: maksAntallKandidater,
        _source: ['aktorId'],
    };
};

export const byggIndreQuery = (søkekriterier: Søkekriterier, innloggetBruker: InnloggetBruker) => {
    return {
        bool: {
            must: [
                ...queryMedFritekst(søkekriterier.fritekst),
                ...queryMedPortefølje(søkekriterier.portefølje, innloggetBruker),
                ...queryMedValgtKontor(søkekriterier.portefølje, søkekriterier.valgtKontor),
                ...queryMedInnsatsgruppe(søkekriterier.innsatsgruppe),
                ...queryMedHovedmål(søkekriterier.hovedmål),
                ...queryMedØnsketYrke(søkekriterier.ønsketYrke),
                ...queryMedØnsketSted(søkekriterier.ønsketSted),
                ...queryMedKravOmBosted(søkekriterier.ønsketSted, søkekriterier.borPåØnsketSted),
                ...queryMedKompetanse(søkekriterier.kompetanse),
                ...queryMedFørerkort(søkekriterier.førerkort),
                ...queryMedPrioritertMålgruppe(søkekriterier.prioritertMålgruppe),
                ...queryMedUtdanningsnivå(søkekriterier.utdanningsnivå),
                ...queryMedArbeidserfaring(søkekriterier.arbeidserfaring, søkekriterier.ferskhet),
                ...queryMedSpråk(søkekriterier.språk),
            ],
        },
    };
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};
