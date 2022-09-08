export const queryMedArbeidserfaring = (arbeidserfaring: Set<string>) => {
    if (arbeidserfaring.size === 0) {
        return [];
    }

    const ønsketArbeidserfaring = Array.from(arbeidserfaring).map((erfaring) => ({
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
    }));

    return [
        {
            bool: {
                should: ønsketArbeidserfaring,
            },
        },
    ];
};
