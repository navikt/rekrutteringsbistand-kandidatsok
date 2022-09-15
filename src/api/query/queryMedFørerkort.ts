export enum Klasse {
    LettMotorsykkel = 'A1 - Lett motorsykkel',
    MellomtungMotorsykkel = 'A2 - Mellomtung motorsykkel',
    TungMotorsykkel = 'A - Tung motorsykkel',
    Personbil = 'B - Personbil',
    PersonbilMedTilhenger = 'BE - Personbil med tilhenger',
    LettLastebil = 'C1 - Lett lastebil',
    LettLastebilMedTilhenger = 'C1E - Lett lastebil med tilhenger',
    Lastebil = 'C - Lastebil',
    LastebilMedTilhenger = 'CE - Lastebil med tilhenger',
    Minibuss = 'D1 - Minibuss',
    MinibussMedTilhenger = 'D1E - Minibuss med tilhenger',
    Buss = 'D - Buss',
    BussMedTilhenger = 'DE - Buss med tilhenger',
}

export const queryMedFørerkort = (førerkort: Set<Klasse>) => {
    if (førerkort.size === 0) {
        return [];
    }

    const førerkortMedUnderklasser = new Set(førerkort);
    Array.from(førerkort).forEach((klasse) => {
        førerkortMedUnderklasser.add(klasse);

        implisitteKlasser[klasse].forEach((implisittKlasse) => {
            førerkortMedUnderklasser.add(implisittKlasse);
        });
    });

    const shouldQuery = Array.from(førerkortMedUnderklasser).map((klasse) => ({
        nested: {
            path: 'forerkort',
            query: {
                term: {
                    'forerkort.forerkortKodeKlasse': klasse,
                },
            },
            score_mode: 'sum',
        },
    }));

    return [
        {
            bool: {
                should: shouldQuery,
            },
        },
    ];
};

const implisitteKlasser = {
    [Klasse.LettMotorsykkel]: [Klasse.MellomtungMotorsykkel, Klasse.TungMotorsykkel],
    [Klasse.MellomtungMotorsykkel]: [Klasse.TungMotorsykkel],
    [Klasse.TungMotorsykkel]: [],
    [Klasse.Personbil]: [
        Klasse.PersonbilMedTilhenger,
        Klasse.LettLastebil,
        Klasse.LettLastebilMedTilhenger,
        Klasse.Lastebil,
        Klasse.LastebilMedTilhenger,
        Klasse.Minibuss,
        Klasse.MinibussMedTilhenger,
        Klasse.Buss,
        Klasse.BussMedTilhenger,
    ],
    [Klasse.PersonbilMedTilhenger]: [
        Klasse.LettLastebilMedTilhenger,
        Klasse.LastebilMedTilhenger,
        Klasse.MinibussMedTilhenger,
        Klasse.BussMedTilhenger,
    ],
    [Klasse.LettLastebil]: [
        Klasse.LettLastebilMedTilhenger,
        Klasse.Lastebil,
        Klasse.LastebilMedTilhenger,
    ],
    [Klasse.LettLastebilMedTilhenger]: [Klasse.LastebilMedTilhenger],
    [Klasse.Lastebil]: [Klasse.LastebilMedTilhenger],
    [Klasse.LastebilMedTilhenger]: [],
    [Klasse.Minibuss]: [Klasse.MinibussMedTilhenger, Klasse.Buss, Klasse.BussMedTilhenger],
    [Klasse.MinibussMedTilhenger]: [Klasse.BussMedTilhenger],
    [Klasse.Buss]: [Klasse.BussMedTilhenger],
    [Klasse.BussMedTilhenger]: [],
};
