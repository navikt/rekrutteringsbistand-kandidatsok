import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { OtherParam } from './useRespons';

export type Navigeringsstate = Partial<{
    scrollTilKandidat: boolean;
    brukKriterierFraStillingen: boolean;
    fraMeny: boolean;
}>;

const skalBrukeKriterierFraStillingen = (searchParams: URLSearchParams) =>
    Boolean(searchParams.get(OtherParam.BrukKriterierFraStillingen));

const useNavigeringsstate = () => {
    const [search, setSearch] = useSearchParams();
    const [brukKriterierFraStillingen, setBrukKriterierFraStillingen] = useState<boolean>(
        skalBrukeKriterierFraStillingen(search)
    );

    useEffect(() => {
        if (skalBrukeKriterierFraStillingen(search)) {
            setBrukKriterierFraStillingen(true);

            search.delete(OtherParam.BrukKriterierFraStillingen);
            setSearch(search, {
                replace: true,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const location = useLocation();
    const { scrollTilKandidat, fraMeny } = (location.state || {}) as Navigeringsstate;

    return {
        scrollTilKandidat,
        brukKriterierFraStillingen,
        fraMeny,
    };
};

export default useNavigeringsstate;
