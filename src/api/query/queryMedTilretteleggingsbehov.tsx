const queryMedTilretteleggingsbehov = (harTilretteleggingsbehov: boolean | null) => {
    if (harTilretteleggingsbehov === null) {
        return [];
    }

    return [
        {
            term: {
                tilretteleggingsbehov: harTilretteleggingsbehov,
            },
        },
    ];
};

export default queryMedTilretteleggingsbehov;
