import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { søk } from './api/api';
import { Nettressurs } from './api/Nettressurs';
import { lagQuery } from './api/query';
import { Respons } from './elasticSearchTyper';

const useRespons = () => {
    const { search } = useLocation();
    const [respons, setRespons] = useState<Nettressurs<Respons>>({
        kind: 'ikkeLastet',
    });

    useEffect(() => {
        const hentKandidater = async () => {
            setRespons({
                kind: 'lasterInn',
            });

            try {
                let respons = await søk(lagQuery(search));

                setRespons({
                    kind: 'suksess',
                    data: respons,
                });
            } catch (e) {
                setRespons({
                    kind: 'feil',
                    error: (e as Error).message,
                });
            }
        };

        hentKandidater();
    }, [search]);

    return respons;
};

export default useRespons;
