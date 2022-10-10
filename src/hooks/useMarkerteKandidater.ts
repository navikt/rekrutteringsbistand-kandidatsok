import { useCallback, useState } from 'react';

const useMarkerteKandidater = (initiellVerdi: string[] = []) => {
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<string>>(
        new Set(initiellVerdi)
    );

    const onMarkerKandidat = useCallback(
        (kandidatNr: string | string[]) => {
            if (typeof kandidatNr === 'string') {
                const nyeMarkerteKandidater = new Set(markerteKandidater);

                if (markerteKandidater.has(kandidatNr)) {
                    nyeMarkerteKandidater.delete(kandidatNr);
                } else {
                    nyeMarkerteKandidater.add(kandidatNr);
                }

                setMarkerteKandidater(nyeMarkerteKandidater);
            } else {
                setMarkerteKandidater(new Set(kandidatNr));
            }
        },
        [markerteKandidater]
    );

    const fjernMarkering = useCallback(() => {
        setMarkerteKandidater(new Set());
    }, []);

    return {
        markerteKandidater,
        onMarkerKandidat,
        fjernMarkering,
    };
};

export default useMarkerteKandidater;
