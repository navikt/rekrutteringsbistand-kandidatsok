import { useState, useEffect } from 'react';
import { søk } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { byggQuery } from '../api/query/byggQuery';
import { Respons } from '../elasticSearchTyper';
import { Portefølje } from '../filter/PorteføljeTabs';
import { Innsatsgruppe } from '../filter/VelgInnsatsgruppe';
import { InnloggetBruker } from './useBrukerensIdent';
import useSøkekriterier from './useSøkekriterier';

export enum Param {
    Fritekst = 'q',
    Side = 'side',
    Portefølje = 'portefolje',
    Innsatsgruppe = 'innsatsgruppe',
}

export type Søkekriterier = {
    fritekst: string | null;
    portefølje: Portefølje;
    innsatsgruppe: Set<Innsatsgruppe>;
    side: number;
};

const useRespons = (innloggetBruker: InnloggetBruker) => {
    const { søkekriterier } = useSøkekriterier();
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
                let søkeresultat = await søk(byggQuery(søkekriterier, innloggetBruker));

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
    }, [søkekriterier, innloggetBruker.navIdent, innloggetBruker.navKontor]);

    return respons;
};

export default useRespons;
