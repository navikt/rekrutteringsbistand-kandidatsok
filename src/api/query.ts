import { Query } from '../elasticSearchTyper';

export const lagQuery = (search: string): Query => {
    return {
        track_total_hits: true,
        query: {
            match_all: {},
        },
    };
};
