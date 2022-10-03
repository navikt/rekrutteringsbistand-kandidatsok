import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type StateFraKandidatside = null | {
    scrollTilKandidat?: undefined;
};

const useScrollTilKandidat = (kandidatnr: string, sistBesøkteKandidatnr?: string) => {
    const { state } = useLocation();
    const [harScrollet, setHarScrollet] = useState<boolean>(false);

    const element =
        kandidatnr === sistBesøkteKandidatnr
            ? document.getElementById(`kandidatrad-${kandidatnr}`)
            : null;

    useLayoutEffect(() => {
        if (
            (state as StateFraKandidatside)?.scrollTilKandidat &&
            element !== null &&
            harScrollet === false
        ) {
            if (element && elementErIkkeSynlig(element)) {
                element.scrollIntoView({
                    block: 'center',
                });

                setHarScrollet(true);
            }
        }
    }, [element, state, harScrollet]);
};

const elementErIkkeSynlig = (element: HTMLElement) => {
    const kandidatBoundary = element.getBoundingClientRect();

    const elementetErOverViewport = kandidatBoundary.top < 0;
    const elementetErUnderViewport =
        window.scrollY + window.innerHeight - (kandidatBoundary.bottom + window.scrollY) < 0;

    return elementetErOverViewport || elementetErUnderViewport;
};

export default useScrollTilKandidat;
