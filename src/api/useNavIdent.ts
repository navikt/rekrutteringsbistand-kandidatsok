import { useState, useEffect } from 'react';
import { get } from './api';

const useNavIdent = () => {
    const [navIdent, setNavIdent] = useState<string | null>(null);

    useEffect(() => {
        const hentNavIdent = async () => {
            const response = await get('/meg');
            const { navIdent } = await response.json();

            setNavIdent(navIdent);
        };

        hentNavIdent();
    }, []);

    return navIdent;
};

export default useNavIdent;
