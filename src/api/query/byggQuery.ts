import { Query, Sorteringsrekkefølge } from '../../elasticSearchTyper';
import { InnloggetBruker } from '../../hooks/useBrukerensIdent';
import { Søkekriterier } from '../../hooks/useRespons';
import { queryMedFritekst } from './queryMedFritekst';
import { queryMedInnsatsgruppe } from './queryMedInnsatsgruppe';
import { queryMedPortefølje } from './queryMedPortefølje';

export const PAGE_SIZE = 10;

export const byggQuery = (
    søkekriterier: Søkekriterier,
    innloggetBruker: InnloggetBruker
): Query => {
    const { fritekst, portefølje, side, innsatsgruppe } = søkekriterier;

    return {
        query: {
            bool: {
                must: [
                    ...queryMedFritekst(fritekst),
                    ...queryMedPortefølje(portefølje, innloggetBruker),
                    ...queryMedInnsatsgruppe(innsatsgruppe),
                ],
            },
        },
        size: PAGE_SIZE,
        from: (side - 1) * PAGE_SIZE,
        track_total_hits: true,
        sort: sorterSisteKandidaterFørst,
    };
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};
