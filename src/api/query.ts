import { Query, Sorteringsrekkefølge } from '../elasticSearchTyper';
import { Params } from '../useRespons';

export const PAGE_SIZE = 10;

export const lagQuery = (searchParams: URLSearchParams): Query => {
    const { q, side } = searchToParams(searchParams);

    const query = q
        ? {
              match: {
                  fritekst: {
                      query: q,
                  },
              },
          }
        : {
              match_all: {},
          };

    const sidetall = Number(side) || 1;

    return {
        query,
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
