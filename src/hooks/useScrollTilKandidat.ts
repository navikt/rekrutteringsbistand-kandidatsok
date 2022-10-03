import { useLayoutEffect, useState } from 'react';

const useScrollTilKandidat = (kandidatnr?: string) => {
    const [harScrollet, setHarScrollet] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (kandidatnr && harScrollet === false) {
            const element = document.getElementById(`kandidatrad-${kandidatnr}`);

            if (element) {
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
    }, [kandidatnr, harScrollet]);
};

export default useScrollTilKandidat;
