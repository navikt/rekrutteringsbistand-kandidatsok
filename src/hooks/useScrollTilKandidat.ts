import { MutableRefObject, useEffect } from 'react';

const useScrollTilKandidat = (
    element: MutableRefObject<HTMLElement | null>,
    fremhevet: boolean,
    lastScrollPosition?: number
) => {
    useEffect(() => {
        if (fremhevet && element.current) {
            if (lastScrollPosition) {
                window.scrollTo({
                    top: lastScrollPosition,
                });
            }

            const kandidatBoundary = element.current.getBoundingClientRect();
            const kandidatErSynlig =
                kandidatBoundary.top >= 0 && kandidatBoundary.bottom <= window.innerHeight;

            if (!kandidatErSynlig) {
                element.current.scrollIntoView({
                    block: 'center',
                });
            }
        }
    }, [element, lastScrollPosition, fremhevet]);
};

export default useScrollTilKandidat;
