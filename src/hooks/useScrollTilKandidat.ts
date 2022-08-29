import { MutableRefObject, useEffect } from 'react';
import { useKandidatsøkSession } from '../KandidatsøkSession';

const useScrollTilKandidat = (
    element: MutableRefObject<HTMLElement | null>,
    fremhevet: boolean
) => {
    const { initialSessionState } = useKandidatsøkSession();
    const { sisteScrollposisjon } = initialSessionState;

    useEffect(() => {
        if (fremhevet && element.current) {
            if (sisteScrollposisjon) {
                window.scrollTo({
                    top: sisteScrollposisjon,
                });
            }

            const kandidatBoundary = element.current.getBoundingClientRect();
            const elementetErUnderViewport = kandidatBoundary.bottom >= 0;
            const elementetErOverViewport = kandidatBoundary.top - window.innerHeight <= 0;
            const kandidatErSynlig = elementetErUnderViewport || elementetErOverViewport;

            if (!kandidatErSynlig) {
                element.current.scrollIntoView({
                    block: 'center',
                });
            }
        }
    }, [element, sisteScrollposisjon, fremhevet]);
};

export default useScrollTilKandidat;
