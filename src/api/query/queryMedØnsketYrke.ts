const queryMedØnsketYrke = (ønsketYrke: Set<string>) => {
    if (ønsketYrke.size === 0) {
        return [];
    }

    const ønskedeYrker = Array.from(ønsketYrke).flatMap((yrke) => [
        {
            match: {
                'yrkeJobbonskerObj.styrkBeskrivelse': yrke,
            },
        },
        {
            match: {
                'yrkeJobbonskerObj.sokeTitler': yrke,
            },
        },
    ]);

    return [
        {
            bool: {
                should: ønskedeYrker,
            },
        },
    ];
};

export default queryMedØnsketYrke;
