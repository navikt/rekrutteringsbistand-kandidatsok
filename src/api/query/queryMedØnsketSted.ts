import { GEOGRAFI_SEPARATOR } from '../../filter/jobbønsker/ØnsketSted';

export const queryMedØnsketSted = (ønsketSted: Set<string>) => {
    if (ønsketSted.size === 0) {
        return [];
    }

    const ønskedeStederRegex = Array.from(ønsketSted).map((sted) => {
        const [, fylkesnummer, kommunenummer] = sted.split(GEOGRAFI_SEPARATOR);

        const kommune = kommunenummer ? `${fylkesnummer}.${kommunenummer}` : `${fylkesnummer}.*`;
        const norge = 'NO';

        return `${kommune}|${fylkesnummer}|${norge}`;
    });

    const ønskedeStederQuery = ønskedeStederRegex.map((regex) => ({
        nested: {
            path: 'geografiJobbonsker',
            query: {
                bool: {
                    should: [
                        {
                            regexp: {
                                'geografiJobbonsker.geografiKode': regex,
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
                should: ønskedeStederQuery,
            },
        },
    ];
};
