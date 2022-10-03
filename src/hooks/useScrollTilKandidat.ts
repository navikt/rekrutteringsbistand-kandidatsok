import { useLayoutEffect, useState } from 'react';

const useScrollTilKandidat = (kandidatnr?: string) => {
    const [harScrollet, setHarScrollet] = useState<boolean>(false);
    const element = document.getElementById(`kandidatrad-${kandidatnr}`);

    useLayoutEffect(() => {
        console.log('useLayoutEffect');
        if (element && harScrollet === false) {
            console.log('element && harScrollet');
            if (element) {
                console.log('SCROLL!');
                const kandidatBoundary = element.getBoundingClientRect();
                const elementetErUnderViewport = kandidatBoundary.bottom >= 0;
                const elementetErOverViewport = kandidatBoundary.top - window.innerHeight <= 0;
                const kandidatErSynlig = elementetErUnderViewport || elementetErOverViewport;

                if (!kandidatErSynlig) {
                    element.scrollIntoView({
                        block: 'center',
                    });
                }

                setHarScrollet(true);
            }
        }
    }, [element, harScrollet]);
};

export default useScrollTilKandidat;
