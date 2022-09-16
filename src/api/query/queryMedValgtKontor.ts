import { Portefølje } from '../../filter/porteføljetabs/PorteføljeTabs';

export const queryMedValgtKontor = (portefølje: Portefølje, valgtKontor: Set<string>) => {
    if (portefølje !== Portefølje.VelgKontor) {
        return [];
    }

    const kontorQuery = Array.from(valgtKontor).map((kontor) => ({
        term: {
            navkontor: kontor,
        },
    }));

    return [
        {
            bool: {
                should: kontorQuery,
            },
        },
    ];
};
