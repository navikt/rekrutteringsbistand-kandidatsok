import { useState, useEffect } from 'react';
import { søk } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { byggQuery } from '../api/query/byggQuery';
import { Respons } from '../elasticSearchTyper';
import { Portefølje } from '../filter/PorteføljeTabs';
import { FiltrerbarInnsatsgruppe } from '../filter/Jobbmuligheter';
import { InnloggetBruker } from './useBrukerensIdent';
import useSøkekriterier from './useSøkekriterier';
import { PrioritertMålgruppe } from '../filter/prioriterte-målgrupper/PrioriterteMålgrupper';

export enum FilterParam {
    Fritekst = 'q',
    Side = 'side',
    Portefølje = 'portefolje',
    Innsatsgruppe = 'innsatsgruppe',
    ØnsketYrke = 'yrke',
    ØnsketSted = 'sted',
    PrioritertMålgruppe = 'malgruppe',
}

export enum OtherParam {
    Stilling = 'stilling',
}

export type Param = FilterParam | OtherParam;

export type Søkekriterier = {
    fritekst: string | null;
    portefølje: Portefølje;
    innsatsgruppe: Set<FiltrerbarInnsatsgruppe>;
    side: number;
    ønsketYrke: Set<string>;
    ønsketSted: Set<string>;
    prioritertMålgruppe: Set<PrioritertMålgruppe>;
};

const useRespons = (innloggetBruker: InnloggetBruker) => {
    const { søkekriterier } = useSøkekriterier();
    const [respons, setRespons] = useState<Nettressurs<Respons>>({
        kind: 'ikke-lastet',
    });

    const query = byggQuery(søkekriterier, innloggetBruker);

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
                let søkeresultat = await søk(query);

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
    }, [JSON.stringify(query)]);

    return respons;
};

export default useRespons;
