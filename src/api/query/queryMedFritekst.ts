const bareTallRegex = /^\d+$/;
const arenaKandidatnrRegex = /^[a-zA-Z]{2}[0-9]+/;
const pamKandidatnrRegex = /^PAM[0-9a-zA-Z]+/;

const søkbareFelterIFritekstsøk = [
    'fritekst',
    'fornavn',
    'etternavn',
    'yrkeJobbonskerObj.styrkBeskrivelse',
    'yrkeJobbonskerObj.sokeTitler',

    // TODO: Dette fungerer ikke fordi feltet er indeksert som et "nested" field,
    // som indekserer det som et helt eget felt. Man kan søke på nested fields
    // med en nested query, men dette er ikke anbefalt mtp. ytelse. Løsningen
    // er muligens å fjerne "nested"-typen fra feltet i indeksen, men har dette
    // andre konsekvenser?
    'geografiJobbonsker.geografiKodeTekst',
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
