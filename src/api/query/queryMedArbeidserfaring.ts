export const queryMedArbeidserfaring = (
    arbeidserfaring: Set<string>,
    arbeidserfaringErFersk: boolean | null
) => {
    if (arbeidserfaring.size === 0) {
        return [];
    }

    const ønsketArbeidserfaring = Array.from(arbeidserfaring).map((erfaring) => {
        if (arbeidserfaringErFersk) {
            return {
                nested: {
                    path: 'yrkeserfaring',
                    query: {
                        bool: {
                            must: [
                                {
                                    match: {
                                        'yrkeserfaring.sokeTitler': {
                                            query: erfaring,
                                            operator: 'and',
                                        },
                                    },
                                },
                                {
                                    range: {
                                        'yrkeserfaring.tilDato': {
                                            gte: 'now-2y',
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
                    query: {
                        match: {
                            'yrkeserfaring.sokeTitler': {
                                query: erfaring,
                                operator: 'and',
                            },
                        },
                    },
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
