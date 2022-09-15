export const queryMedSpråk = (språk: Set<string>) => {
    if (språk.size === 0) {
        return [];
    }

    const språkquery = Array.from(språk).map((språk) => ({
        nested: {
            path: 'sprak',
            query: {
                match: {
                    'sprak.sprakKodeTekst': {
                        query: språk,
                        operator: 'and',
                    },
                },
            },
            score_mode: 'sum',
        },
    }));

    return [
        {
            bool: {
                should: språkquery,
            },
        },
    ];
};
