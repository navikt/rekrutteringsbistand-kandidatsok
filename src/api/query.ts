import { Query } from '../elasticSearchTyper';
import { Params } from '../useRespons';

export const lagQuery = (search: string): Query => {
    const { q } = searchToParams(search);

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

const searchToParams = (search: string): Params => {
    const searchParams = new URLSearchParams(search);

    return Object.fromEntries(searchParams.entries());
};
