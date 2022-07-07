import { History } from 'history';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { søk } from './api/api';
import { Nettressurs } from './api/Nettressurs';
import { lagQuery } from './api/query';
import { Respons } from './elasticSearchTyper';

export type Params = {
    q?: string;
};

const useRespons = () => {
    const history: History = useHistory();

    const [respons, setRespons] = useState<Nettressurs<Respons>>({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        const hentKandidater = async (search: string) => {
            setRespons({
                kind: 'laster-inn',
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

        history.listen(() => {
            hentKandidater(history.location.search);
        });
    }, [history]);

    return respons;
};

export default useRespons;
