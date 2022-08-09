import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { søk } from './api/api';
import { Nettressurs } from './api/Nettressurs';
import { lagQuery } from './api/query';
import { Respons } from './elasticSearchTyper';

export enum Param {
    Fritekst = 'q',
}

export type Params = {
    [Param.Fritekst]?: string;
};

const useRespons = () => {
    const [searchParams] = useSearchParams();
    const [respons, setRespons] = useState<Nettressurs<Respons>>({
        kind: 'ikke-lastet',
    });

    const setOpptatt = () => {
        setRespons(
            respons.kind === 'suksess'
                ? {
                      kind: 'oppdaterer',
                      data: respons.data,
                  }
                : {
                      kind: 'laster-inn',
                  }
        );
    };

    useEffect(() => {
        const hentKandidater = async () => {
            setOpptatt();

            try {
                let søkeresultat = await søk(lagQuery(searchParams));

                setRespons({
                    kind: 'suksess',
                    data: søkeresultat,
                });
            } catch (e) {
                setRespons({
                    kind: 'feil',
                    error: (e as Error).message,
                });
            }
        };

        hentKandidater();

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [searchParams]);

    return respons;
};

export default useRespons;
