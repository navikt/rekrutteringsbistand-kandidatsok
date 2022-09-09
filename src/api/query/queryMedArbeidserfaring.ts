export const queryMedArbeidserfaring = (arbeidserfaring: Set<string>, ferskhet: number | null) => {
    if (arbeidserfaring.size === 0) {
        return [];
    }

    const ønsketArbeidserfaring = Array.from(arbeidserfaring).map((erfaring) => {
        const erfaringQuery = {
            match: {
                'yrkeserfaring.sokeTitler': {
                    query: erfaring,
                    operator: 'and',
                },
            },
        };

        if (ferskhet !== null) {
            return {
                nested: {
                    path: 'yrkeserfaring',
                    query: {
                        bool: {
                            must: [
                                erfaringQuery,
                                {
                                    range: {
                                        'yrkeserfaring.tilDato': {
                                            gte: `now-${ferskhet}y`,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            };
        } else {
            return {
                nested: {
                    path: 'yrkeserfaring',
                    query: erfaringQuery,
                },
            };
        }
    });

    return [
        {
            bool: {
                should: ønsketArbeidserfaring,
            },
        },
    ];
};
