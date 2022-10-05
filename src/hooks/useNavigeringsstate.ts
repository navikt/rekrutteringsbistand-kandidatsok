import { useLocation } from 'react-router-dom';

export type Navigeringsstate = Partial<{
    scrollTilKandidat: boolean;
    brukKriterierFraStillingen: boolean;
    brukNyØkt: boolean;
}>;

const useNavigeringsstate = () => {
    const location = useLocation();
    const navigeringsstate = (location.state || {}) as Navigeringsstate;

    return navigeringsstate;
};

export default useNavigeringsstate;
