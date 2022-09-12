import { SuggestQuery } from '../../elasticSearchTyper';

export enum Forslagsfelt {
    ØnsketYrke = 'yrkeJobbonskerObj.styrkBeskrivelse.completion',
    ØnsketSted = 'geografiJobbonsker.geografiKodeTekst.completion',
    Kompetanse = 'samletKompetanseObj.samletKompetanseTekst.completion',
    Førerkort = 'samletKompetanseObj.samletKompetanseTekst.completion',
    Arbeidserfaring = 'yrkeserfaring.stillingstitlerForTypeahead',
}

const byggSuggestion = (
    field: Forslagsfelt,
    prefix: string,
    size = 15,
    source = false
): SuggestQuery => {
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
        _source: source,
    };
};

export default byggSuggestion;
