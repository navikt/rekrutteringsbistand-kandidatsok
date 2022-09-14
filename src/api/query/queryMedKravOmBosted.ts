import { GEOGRAFI_SEPARATOR } from '../../filter/jobbønsker/ØnsketSted';

export const queryMedKravOmBosted = (ønsketSted: Set<string>, borPåØnsketSted: boolean | null) => {
    if (!borPåØnsketSted) {
        return [];
    }

    const borPåØnsketStedRegex = Array.from(ønsketSted).map((sted) => {
        const [, fylkeskode, kommunenummer] = sted.split(GEOGRAFI_SEPARATOR);

        if (kommunenummer) {
            return kommunenummer;
        } else {
            const fylkesnummer = fylkeskode.substring(2);
            return `${fylkesnummer}.*`;
        }
    });

    const borPåØnsketStedQuery = borPåØnsketStedRegex.map((regex) => ({
        regexp: {
            kommunenummerstring: regex,
        },
    }));

    return [
        {
            bool: {
                should: borPåØnsketStedQuery,
            },
        },
    ];
};
