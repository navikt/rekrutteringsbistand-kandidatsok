const queryMedØnsketSted = (ønsketSted: Set<string>) => {
    if (ønsketSted.size === 0) {
        return [];
    }

    const ønskedeSteder = Array.from(ønsketSted)
        .map((sted) => sted.split('.').slice(1))
        .map((sted) => `${sted.join('.')}|${sted[0]}${sted.length == 1 ? '.*' : ''}|NO`)
        .map((sted) => ({
            nested: {
                path: 'geografiJobbonsker',
                query: {
                    bool: {
                        should: [
                            {
                                regexp: {
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
