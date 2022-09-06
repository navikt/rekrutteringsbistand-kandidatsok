const queryMedØnsketSted = (ønsketSted: Set<string>) => {
    if (ønsketSted.size === 0) {
        return [];
    }

    const ønskedeSteder = Array.from(ønsketSted).map((sted) => ({
        nested: {
            path: 'geografiJobbonsker',
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                'geografiJobbonsker.geografiKodeTekst': sted,
                            },
                        },
                        {
                            match: {
                                'geografiJobbonsker.geografiKode': sted,
                            },
                        },
                    ],
                },
            },
        },
    }));

    return [
        {
            bool: {
                should: ønskedeSteder,
            },
        },
    ];
};

export default queryMedØnsketSted;
