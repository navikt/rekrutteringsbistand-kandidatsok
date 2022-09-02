import { SuggestQuery } from '../../elasticSearchTyper';

export enum Forslagsfelt {
    ØnsketYrke = 'yrkeJobbonskerObj.styrkBeskrivelse.completion',
}

const byggSuggestion = (field: Forslagsfelt, prefix: string, size = 100): SuggestQuery => {
    return {
        suggest: {
            forslag: {
                prefix,
                completion: {
                    field,
                    size,
                    skip_duplicates: true,
                },
            },
        },
        _source: false,
    };
};

export default byggSuggestion;
