import { useState } from 'react';

const useMarkerteKandidater = () => {
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<string>>(new Set());

    const onMarkerKandidat = (kandidatNr: string) => {
        console.log('SABLA');

        const nyeMarkerteKandidater = new Set(markerteKandidater);

        if (markerteKandidater.has(kandidatNr)) {
            nyeMarkerteKandidater.delete(kandidatNr);
        } else {
            nyeMarkerteKandidater.add(kandidatNr);
        }

        setMarkerteKandidater(nyeMarkerteKandidater);
    };

    return {
        markerteKandidater,
        onMarkerKandidat,
    };
};

export default useMarkerteKandidater;
