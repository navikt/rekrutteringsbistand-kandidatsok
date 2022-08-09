import { Query, Sorteringsrekkefølge } from '../elasticSearchTyper';
import { Params } from '../useRespons';

export const lagQuery = (searchParams: URLSearchParams): Query => {
    const { q } = searchToParams(searchParams);

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

    return {
        query,
        size: 40,
        from: 0,
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
