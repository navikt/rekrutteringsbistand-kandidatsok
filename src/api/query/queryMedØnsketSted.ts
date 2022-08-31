const queryMedØnsketSted = (ønsketSted: string | null) => {
    if (ønsketSted === null) {
        return [];
    }

    return [
        {
            nested: {
                path: 'geografiJobbonsker',
                query: {
                    bool: {
                        should: [
                            {
                                match: {
                                    'geografiJobbonsker.geografiKodeTekst': ønsketSted,
                                },
                            },
                            {
                                match: {
                                    'geografiJobbonsker.geografiKode': ønsketSted,
                                },
                            },
                        ],
                    },
                },
            },
        },
    ];
};

export default queryMedØnsketSted;
