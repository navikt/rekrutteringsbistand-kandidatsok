export const queryMedØnsketYrke = (ønsketYrke: Set<string>) => {
    if (ønsketYrke.size === 0) {
        return [];
    }

    const ønskedeYrker = Array.from(ønsketYrke).flatMap((yrke) => [
        {
            match: {
                'yrkeJobbonskerObj.styrkBeskrivelse': {
                    query: yrke,
                    fuzziness: 'AUTO',
                    operator: 'and',
                },
            },
        },
        {
            match: {
                'yrkeJobbonskerObj.sokeTitler': {
                    query: yrke,
                    fuzziness: 0,
                    operator: 'and',
                },
            },
        },
    ]);

    return [
        {
            bool: {
                should: ønskedeYrker,
            },
        },
    ];
};
