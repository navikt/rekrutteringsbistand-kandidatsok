import { Innsatsgruppe } from '../../filter/VelgInnsatsgruppe';

export const queryMedInnsatsgruppe = (innsatsgruppe: Set<Innsatsgruppe>) => {
    if (innsatsgruppe.size === 0) {
        return [];
    }

    return [
        {
            terms: {
                kvalifiseringsgruppekode: Array.from(innsatsgruppe),
            },
        },
    ];
};
