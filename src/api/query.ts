import { Query } from '../elasticSearchTyper';

export const lagQuery = (search: string): Query => {
    return {
        query: {
            match_all: {},
        },
    };
};
