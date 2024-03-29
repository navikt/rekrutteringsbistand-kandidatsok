import { useState, useEffect, useContext } from 'react';
import { søk } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { PAGE_SIZE, byggQuery } from '../api/query/byggQuery';
import { målQuery } from '../api/query/målQuery';
import { Respons } from '../kandidater/elasticSearchTyper';
import { InnloggetBruker } from './useBrukerensIdent';
import useSøkekriterier from './useSøkekriterier';
import { ØktContext } from '../Økt';
import { useSearchParams } from 'react-router-dom';

export enum FilterParam {
    Fritekst = 'q',
    Side = 'side',
    Portefølje = 'portefolje',
    ValgtKontor = 'kontor',
    Innsatsgruppe = 'innsatsgruppe',
    ØnsketYrke = 'yrke',
    ØnsketSted = 'sted',
    BorPåØnsketSted = 'borDer',
    Kompetanse = 'kompetanse',
    Førerkort = 'forerkort',
    PrioritertMålgruppe = 'malgruppe',
    Hovedmål = 'hovedmal',
    Utdanningsnivå = 'utdanning',
    Arbeidserfaring = 'arbeidserfaring',
    Ferskhet = 'ferskhet',
    Språk = 'sprak',
    Sortering = 'sortering',
}

export enum OtherParam {
    Stilling = 'stilling',
    Kandidatliste = 'kandidatliste',
    BrukKriterierFraStillingen = 'brukKriterierFraStillingen',
}

export type Param = FilterParam | OtherParam;

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
        målQuery(søkekriterier);

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [JSON.stringify(query)]);

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
                    statuskode: (e as Response).status,
                    error: (e as Response).statusText,
                });
            }
        };

        hentKandidater();

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [JSON.stringify(query)]);

    return respons;
};

export default useRespons;
