import { useState, useEffect } from 'react';
import { get } from '../api/api';

export type InnloggetBruker = {
    navIdent: string | null;
    navKontor: string | null;
};

const useInnloggetBruker = (navKontor: string | null): InnloggetBruker => {
    const [navIdent, setNavIdent] = useState<string | null>(null);

    useEffect(() => {
        const hentNavIdent = async () => {
            const response = await get('/meg');
            const { navIdent } = await response.json();

            setNavIdent(navIdent);
        };

        hentNavIdent();
    }, []);

    return {
        navIdent,
        navKontor,
    };
};

export default useInnloggetBruker;
