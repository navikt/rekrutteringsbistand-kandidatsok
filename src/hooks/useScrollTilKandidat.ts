import { useLayoutEffect, useState } from 'react';

const useScrollTilKandidat = (kandidatnr: string, sistBesøkteKandidatnr?: string) => {
    const [harScrollet, setHarScrollet] = useState<boolean>(false);
    const element =
        kandidatnr === sistBesøkteKandidatnr
            ? document.getElementById(`kandidatrad-${kandidatnr}`)
            : null;

    useLayoutEffect(() => {
        if (element !== null && harScrollet === false) {
            if (element && elementErIkkeSynlig(element)) {
                element.scrollIntoView({
                    block: 'center',
                });

                setHarScrollet(true);
            }
        }
    }, [element, harScrollet]);
};

const elementErIkkeSynlig = (element: HTMLElement) => {
    const kandidatBoundary = element.getBoundingClientRect();

    const elementetErOverViewport = kandidatBoundary.top < 0;
    const elementetErUnderViewport =
        window.scrollY + window.innerHeight - (kandidatBoundary.bottom + window.scrollY) < 0;

    return elementetErOverViewport || elementetErUnderViewport;
};

export default useScrollTilKandidat;
