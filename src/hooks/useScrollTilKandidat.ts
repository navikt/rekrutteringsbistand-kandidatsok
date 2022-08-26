import { MutableRefObject, useEffect } from 'react';
import { useKandidatsøkSession } from '../KandidatsøkSession';

const useScrollTilKandidat = (
    element: MutableRefObject<HTMLElement | null>,
    fremhevet: boolean
) => {
    const { initialSessionState } = useKandidatsøkSession();
    const { lastScrollPosition } = initialSessionState;

    useEffect(() => {
        if (fremhevet && element.current) {
            if (lastScrollPosition) {
                window.scrollTo({
                    top: lastScrollPosition,
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
    }, [element, lastScrollPosition, fremhevet]);
};

export default useScrollTilKandidat;
