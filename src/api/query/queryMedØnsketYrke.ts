const queryMedØnsketYrke = (ønsketYrke: string | null) => {
    if (ønsketYrke === null) {
        return [];
    }

    return [
        {
            bool: {
                should: [
                    {
                        match: {
                            'yrkeJobbonskerObj.styrkBeskrivelse': ønsketYrke,
                        },
                    },
                    {
                        match: {
                            'yrkeJobbonskerObj.sokeTitler': ønsketYrke,
                        },
                    },
                ],
            },
        },
    ];
};

export default queryMedØnsketYrke;
