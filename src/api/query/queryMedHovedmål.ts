import { Mål } from '../../filter/Hovedmål';

export const queryMedHovedmål = (hovedmål: Set<Mål>) => {
    if (hovedmål.size === 0) {
        return [];
    }

    return [
        {
            terms: {
                hovedmaalkode: Array.from(hovedmål),
            },
        },
    ];
};
