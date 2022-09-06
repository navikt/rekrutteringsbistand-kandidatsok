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

export const PAGE_SIZE = 15;

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
    };
};

export const byggIndreQuery = (søkekriterier: Søkekriterier, innloggetBruker: InnloggetBruker) => {
    const {
        fritekst,
        portefølje,
        innsatsgruppe,
        ønsketYrke,
        ønsketSted,
        prioritertMålgruppe,
        harTilretteleggingsbehov,
    } = søkekriterier;

    return {
        bool: {
            must: [
                ...queryMedFritekst(fritekst),
                ...queryMedPortefølje(portefølje, innloggetBruker),
                ...queryMedInnsatsgruppe(innsatsgruppe),
                ...queryMedØnsketYrke(ønsketYrke),
                ...queryMedØnsketSted(ønsketSted),
                ...queryMedPrioritertMålgruppe(prioritertMålgruppe),
                ...queryMedTilretteleggingsbehov(harTilretteleggingsbehov),
            ],
        },
    };
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};
