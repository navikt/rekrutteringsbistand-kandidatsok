const queryMedKompetanse = (kompetanse: Set<string>) => {
    if (kompetanse.size === 0) {
        return [];
    }

    const kravTilKompetanse = Array.from(kompetanse).map((yrke) => ({
        match_phrase: {
            'samletKompetanseObj.samletKompetanseTekst': {
                query: yrke,
                slop: 4,
            },
        },
    }));

    return [
        {
            bool: {
                should: kravTilKompetanse,
            },
        },
    ];
};

export default queryMedKompetanse;
