export const queryMedØnsketYrke = (ønsketYrke: Set<string>, brukSynonymer = true) => {
    if (ønsketYrke.size === 0) {
        return [];
    }

    const ønskedeYrker = Array.from(ønsketYrke).flatMap((yrke) => {
        const filter = [];

        filter.push({
            match: {
                'yrkeJobbonskerObj.styrkBeskrivelse': {
                    query: yrke,
                    fuzziness: 0,
                    operator: 'and',
                },
            },
        });

        if (brukSynonymer) {
            filter.push({
                match: {
                    'yrkeJobbonskerObj.sokeTitler': {
                        query: yrke,
                        fuzziness: 0,
                        operator: 'and',
                    },
                },
            });
        }

        return filter;
    });

    return [
        {
            bool: {
                should: ønskedeYrker,
            },
        },
    ];
};
