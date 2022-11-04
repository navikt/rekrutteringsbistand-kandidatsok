import { Søkekriterier } from '../../hooks/useSøkekriterier';
import { Aggregeringer, SearchQuery } from '../../kandidater/elasticSearchTyper';
import { queryMedØnsketYrke } from './queryMedØnsketYrke';

export enum Aggregering {
    Kompetanse = 'kompetanse',
}

enum Aggregeringsfelt {
    Kompetanseord = 'kompetanseObj.kompKodeNavn.keyword',
}

export const byggAggregeringerQuery = (søkekriterier: Søkekriterier): SearchQuery => {
    const { ønsketYrke } = søkekriterier;

    return {
        query: {
            bool: {
                must: [...queryMedØnsketYrke(ønsketYrke, false)],
            },
        },
        _source: false,
        size: 0,
        track_total_hits: false,
        aggs: kompetanseaggregering,
    };
};

export const kompetanseaggregering: Aggregeringer = {
    [Aggregering.Kompetanse]: {
        terms: {
            field: Aggregeringsfelt.Kompetanseord,
            size: 12,
        },
    },
};
