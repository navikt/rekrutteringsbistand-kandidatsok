import { FuzzySuggestQuery } from '../../elasticSearchTyper';

const byggFuzzySuggestion = (
    field: string,
    sourceField: string,
    query: string
): FuzzySuggestQuery => {
    return {
        query: {
            match_phrase: {
                [sourceField]: {
                    query,
                    slop: 5,
                },
            },
        },
        aggs: {
            suggestions: {
                terms: {
                    field,
                },
            },
        },
        size: 0,
        _source: false,
    };
};

export default byggFuzzySuggestion;
