import { useLocation } from 'react-router-dom';

export type Navigeringsstate = {
    kandidat?: string;
};

const useNavigeringsstate = () => {
    const { state } = useLocation();
    const navigeringsstate = (state as Navigeringsstate) || {};
    return navigeringsstate;
};

export default useNavigeringsstate;
