import { Query, Sorteringsrekkefølge } from '../../elasticSearchTyper';
import { Portefølje } from '../../filter/PorteføljeTabs';
import { InnloggetBruker } from '../../hooks/useBrukerensIdent';
import { Params } from '../../hooks/useRespons';
import { queryMedFritekst } from './queryMedFritekst';
import { queryMedPortefølje } from './queryMedPortefølje';

export const PAGE_SIZE = 10;

export const byggQuery = (
    searchParams: URLSearchParams,
    innloggetBruker: InnloggetBruker
): Query => {
    const { q, side, portefolje } = searchToParams(searchParams);
    const sidetall = Number(side) || 1;
    const portefølje = (portefolje as Portefølje) || Portefølje.Alle;

    return {
        query: {
            bool: {
                must: [...queryMedFritekst(q), ...queryMedPortefølje(portefølje, innloggetBruker)],
            },
        },
        size: PAGE_SIZE,
        from: (sidetall - 1) * PAGE_SIZE,
        track_total_hits: true,
        sort: sorterSisteKandidaterFørst,
    };
};

const sorterSisteKandidaterFørst = {
    tidsstempel: {
        order: 'desc' as Sorteringsrekkefølge,
    },
};

const searchToParams = (searchParams: URLSearchParams): Params =>
    Object.fromEntries(searchParams.entries());
