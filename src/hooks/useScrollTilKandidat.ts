import { MutableRefObject, useEffect } from 'react';
import { useKandidatsøkØkt } from '../Økt';

const useScrollTilKandidat = (
    element: MutableRefObject<HTMLElement | null>,
    fremhevet: boolean
) => {
    const { forrigeØkt } = useKandidatsøkØkt();
    const { sisteScrollposisjon } = forrigeØkt;

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