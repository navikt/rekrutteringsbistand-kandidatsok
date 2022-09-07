const queryMedFørerkort = (førerkort: Set<string>) => {
    if (førerkort.size === 0) {
        return [];
    }

    const shouldQuery = Array.from(førerkort).map((klasse) => ({
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

export default queryMedFørerkort;
