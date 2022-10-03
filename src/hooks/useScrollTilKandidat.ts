import { MutableRefObject, useEffect, useState } from 'react';
import { useKandidatsøkØkt } from '../Økt';

const useScrollTilKandidat = (
    element: MutableRefObject<HTMLElement | null>,
    fremhevet: boolean
) => {
    const { forrigeØkt } = useKandidatsøkØkt();
    const { sisteScrollposisjon } = forrigeØkt;
    const [harScrollet, setHarScrollet] = useState<boolean>(false);

    useEffect(() => {
        if (fremhevet && element.current && !harScrollet) {
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

            setHarScrollet(true);
        }
    }, [element, sisteScrollposisjon, fremhevet, harScrollet]);
};

export default useScrollTilKandidat;
