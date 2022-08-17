const bareTallRegex = /^\d+$/;
const arenaKandidatnrRegex = /^[a-zA-Z]{2}[0-9]+/;
const pamKandidatnrRegex = /^PAM[0-9a-zA-Z]+/;

const søkbareFelterIFritekstsøk = [
    'fritekst^0.8',
    'fornavn^1',
    'etternavn^1',
    'yrkeJobbonskerObj.styrkBeskrivelse^2.5',
    'yrkeJobbonskerObj.sokeTitler^2',
];

export const queryMedFritekst = (fritekst: string | null): Array<any> => {
    if (fritekst === null) {
        return [];
    }

    if (bareTallRegex.test(fritekst) && fritekst.length > 10) {
        return [
            {
                bool: {
                    should: [
                        {
                            term: {
                                aktorId: fritekst,
                            },
                        },
                        {
                            term: {
                                fodselsnummer: fritekst,
                            },
                        },
                    ],
                },
            },
        ];
    } else if (arenaKandidatnrRegex.test(fritekst) || pamKandidatnrRegex.test(fritekst)) {
        return [
            {
                term: {
                    kandidatnr: fritekst,
                },
            },
        ];
    } else {
        return [
            {
                multi_match: {
                    query: fritekst,
                    fields: søkbareFelterIFritekstsøk,
                },
            },
        ];
    }
};
