import { useState } from 'react';

const useMarkerteKandidater = () => {
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<string>>(new Set());

    const onMarkerKandidat = (kandidatNr: string) => {
        const nyeMarkerteKandidater = new Set(markerteKandidater);

        if (markerteKandidater.has(kandidatNr)) {
            nyeMarkerteKandidater.delete(kandidatNr);
        } else {
            nyeMarkerteKandidater.add(kandidatNr);
        }

        setMarkerteKandidater(nyeMarkerteKandidater);
    };

    const fjernMarkering = () => {
        setMarkerteKandidater(new Set());
    };

    return {
        markerteKandidater,
        onMarkerKandidat,
        fjernMarkering,
    };
};

export default useMarkerteKandidater;
