import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { søk } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { lagQuery } from '../api/query';
import { Respons } from '../elasticSearchTyper';
import { InnloggetBruker } from './useBrukerensIdent';

export enum Param {
    Fritekst = 'q',
    Side = 'side',
    Portefølje = 'portefolje',
}

export type Params = {
    [Param.Fritekst]?: string;
    [Param.Side]?: string;
    [Param.Portefølje]?: string;
};

const useRespons = (innloggetBruker: InnloggetBruker) => {
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
                let søkeresultat = await søk(lagQuery(searchParams, innloggetBruker));

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
    }, [searchParams, innloggetBruker.navIdent, innloggetBruker.navKontor]);

    return respons;
};

export default useRespons;
