const bareTallRegex = /^\d+$/;
const arenaKandidatnrRegex = /^[a-zA-Z]{2}[0-9]+/;
const pamKandidatnrRegex = /^PAM[0-9a-zA-Z]+/;

const søkbareFelterIFritekstsøk = [
    'fritekst',
    'fornavn',
    'etternavn',
    'yrkeJobbonskerObj.styrkBeskrivelse',
    'yrkeJobbonskerObj.sokeTitler',
];

export const queryMedFritekst = (fritekst?: string): Array<any> => {
    if (fritekst === undefined) {
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
                    fuzziness: 'AUTO',
                },
            },
        ];
    }
};
