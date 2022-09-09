const queryMedØnsketSted = (ønsketSted: Set<string>) => {
    console.log('ønsketSted', ønsketSted);
    if (ønsketSted.size === 0) {
        return [];
    }

    const ønskedeSteder = Array.from(ønsketSted)
        .map((enkodetSted) => enkodetSted.split('.')[0])
        .map((sted) => ({
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
