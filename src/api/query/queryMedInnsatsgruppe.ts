import {
    andreInnsatsgrupper,
    FiltrerbarInnsatsgruppe,
    Innsatsgruppe,
} from '../../filter/VelgInnsatsgruppe';

export const queryMedInnsatsgruppe = (innsatsgruppe: Set<Innsatsgruppe>) => {
    if (innsatsgruppe.size === 0) {
        return [];
    }

    if (innsatsgruppe.has(FiltrerbarInnsatsgruppe.AndreInnsatsgrupper)) {
        andreInnsatsgrupper.forEach((gruppe) => {
            innsatsgruppe.add(gruppe);
        });
    }

    return [
        {
            terms: {
                kvalifiseringsgruppekode: Array.from(innsatsgruppe),
            },
        },
    ];
};
