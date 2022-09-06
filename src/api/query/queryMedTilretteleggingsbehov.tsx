import { Behovskategori } from '../../filter/tilretteleggingsbehov/VelgBehovskategorier';

const queryMedTilretteleggingsbehov = (
    harTilretteleggingsbehov: boolean | null,
    behovskategorier: Set<Behovskategori>
) => {
    if (harTilretteleggingsbehov === null) {
        return [];
    }

    if (behovskategorier.size === 0) {
        return [
            {
                term: {
                    tilretteleggingsbehov: harTilretteleggingsbehov,
                },
            },
        ];
    }

    const minstEnKategori = Array.from(behovskategorier).map((behov) => ({
        term: {
            'veilTilretteleggingsbehov.keyword': behov,
        },
    }));

    return [
        {
            bool: {
                should: minstEnKategori,
            },
        },
    ];
};

export default queryMedTilretteleggingsbehov;
