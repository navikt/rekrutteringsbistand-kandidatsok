import { useLocation } from 'react-router-dom';

export type Navigeringsstate = {
    fraKandidat?: string;
    markerteKandidater?: Set<string>;
};

const useNavigeringsstate = () => {
    const { state } = useLocation();
    const navigeringsstate = (state as Navigeringsstate) || {};
    return navigeringsstate;
};

export default useNavigeringsstate;
