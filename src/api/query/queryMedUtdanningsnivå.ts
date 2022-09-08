import { Nivå } from '../../filter/Utdanningsnivå';

export const queryMedUtdanningsnivå = (valgtNivå: Set<Nivå>) => {
    if (valgtNivå.size === 0) {
        return [];
    }

    const nusKoderQuery = Array.from(valgtNivå)
        .map((nivå) => hentNuskoderTilUtdanningsnivå(nivå))
        .map((nusKoder) => {
            const must = nusKoder.include
                ? [
                      {
                          nested: {
                              path: 'utdanning',
                              query: {
                                  regexp: {
                                      'utdanning.nusKode': nusKoder.include,
                                  },
                              },
                          },
                      },
                  ]
                : [];

            const must_not = nusKoder.exclude
                ? [
                      {
                          nested: {
                              path: 'utdanning',
                              query: {
                                  regexp: {
                                      'utdanning.nusKode': nusKoder.exclude,
                                  },
                              },
                          },
                      },
                  ]
                : [];

            return {
                bool: {
                    must,
                    must_not,
                },
            };
        });

    return [
        {
            bool: {
                should: nusKoderQuery,
            },
        },
    ];
};

const hentNuskoderTilUtdanningsnivå = (utdanningsnivå: Nivå) => {
    switch (utdanningsnivå) {
        case Nivå.Videregående:
            return {
                include: '[3-4][0-9]*',
                exclude: '[5-8][0-9]*',
            };

        case Nivå.Fagskole:
            return {
                include: '5[0-9]*',
                exclude: '[6-8][0-9]*',
            };

        case Nivå.Bachelor:
            return {
                include: '6[0-9]*',
                exclude: '[7-8][0-9]*',
            };

        case Nivå.Master:
            return {
                include: '7[0-9]*',
                exclude: '8[0-9]*',
            };

        case Nivå.Doktorgrad:
            return {
                include: '8[0-9]*',
            };
    }
};
