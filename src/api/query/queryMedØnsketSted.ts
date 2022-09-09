const queryMedØnsketSted = (ønsketSted: Set<string>) => {
    console.log('ønsketSted', ønsketSted);
    if (ønsketSted.size === 0) {
        return [];
    }

    const ønskedeSteder = Array.from(ønsketSted)
        .map((sted) => {
            const stedArray = sted.split('.').slice(1);
            var regex = `${stedArray.join('.')}|NO|${stedArray[0]}${
                stedArray.length == 1 ? '.*' : ''
            }`;
            console.log('regex', regex);
            return regex;
        })
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
