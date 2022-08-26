import { useLocation } from 'react-router-dom';

export type Navigeringsstate = {
    kandidat?: string;
    markerteKandidater?: Set<string>;
    scroll?: number;
};

const useNavigeringsstate = () => {
    const { state } = useLocation();
    const navigeringsstate = (state as Navigeringsstate) || {};
    return navigeringsstate;
};

export default useNavigeringsstate;
