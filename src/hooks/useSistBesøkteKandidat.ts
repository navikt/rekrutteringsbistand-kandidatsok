import { useLocation } from 'react-router-dom';

type Navigeringsstate = {
    kandidat?: string;
};

const useSistBesøkteKandidat = () => {
    const { state } = useLocation();
    const sisteBesøkteKandidat = (state as Navigeringsstate)?.kandidat;

    return sisteBesøkteKandidat;
};

export default useSistBesøkteKandidat;
