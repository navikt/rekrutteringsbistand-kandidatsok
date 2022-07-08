import { Query } from '../elasticSearchTyper';
import { Params } from '../useRespons';

export const lagQuery = (searchParams: URLSearchParams): Query => {
    const { q } = searchToParams(searchParams);

    const query = q
        ? {
              match: {
                  message: {
                      query: q,
                  },
              },
          }
        : {
              match_all: {},
          };

    return {
        track_total_hits: true,
        query,
    };
};

const searchToParams = (searchParams: URLSearchParams): Params =>
    Object.fromEntries(searchParams.entries());
