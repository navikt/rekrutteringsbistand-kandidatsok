import { useState, useEffect } from 'react';
import { søk } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { byggQuery } from '../api/query/byggQuery';
import { målQuery } from '../api/query/målQuery';
import { Respons } from '../elasticSearchTyper';
import { InnloggetBruker } from './useBrukerensIdent';
import { KontekstAvKandidatliste } from './useKontekstAvKandidatliste';
import useSøkekriterier from './useSøkekriterier';

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
    HarTilretteleggingsbehov = 'tilretteleggingsbehov',
    Behovskategori = 'kategori',
    Hovedmål = 'hovedmal',
    Utdanningsnivå = 'utdanning',
    Arbeidserfaring = 'arbeidserfaring',
    Ferskhet = 'ferskhet',
    Språk = 'sprak',
}

export enum OtherParam {
    Kandidatliste = 'kandidatliste',
}

export type Param = FilterParam | OtherParam;

const useRespons = (innloggetBruker: InnloggetBruker, kontekst: KontekstAvKandidatliste | null) => {
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
                    error: (e as Error).message,
                });
            }
        };

        if (kontekst === null || kontekst.stilling.kind === 'suksess') {
            hentKandidater();
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [JSON.stringify(query), kontekst]);

    return respons;
};

export default useRespons;
