import React, { ReactNode, useContext, useEffect, useMemo } from 'react';
import { Heading } from '@navikt/ds-react';

import { formaterStortTall } from '../utils';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { Respons } from '../elasticSearchTyper';
import { Økt, ØktContext } from '../Økt';
import Kandidatrad from './Kandidatrad';
import Paginering from '../filter/Paginering';
import MarkerAlle from './MarkerAlle';
import css from './Resultat.module.css';

export type Props = {
    respons: Respons;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string | string[]) => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    forrigeØkt: Økt | null;
    knapper: ReactNode;
};

const Resultat = ({
    respons,
    kontekstAvKandidatliste,
    markerteKandidater,
    onMarkerKandidat,
    forrigeØkt,
    knapper,
}: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;

    const kandidater = useMemo(() => treff.map((t) => t._source), [treff]);
    const kandidatnumre = useMemo(() => kandidater.map((k) => k.arenaKandidatnr), [kandidater]);

    const { setØkt } = useContext(ØktContext);

    useEffect(() => {
        setØkt({
            kandidater: kandidatnumre,
        });
    }, [kandidatnumre, setØkt]);

    return (
        <div className={css.resultat}>
            <div className={css.telling}>
                <Heading size="medium" level="2">
                    {formaterStortTall(antallTreff)} kandidater
                </Heading>
                <div>{knapper}</div>
            </div>
            <div className={css.overKandidater}>
                {kandidater.length > 0 && (
                    <MarkerAlle
                        kandidater={kandidater}
                        markerteKandidater={markerteKandidater}
                        onMarkerKandidat={onMarkerKandidat}
                        kontekstAvKandidatliste={kontekstAvKandidatliste}
                    />
                )}
            </div>
            <ul className={css.kandidater}>
                {kandidater.map((kandidat) => (
                    <Kandidatrad
                        key={kandidat.arenaKandidatnr}
                        kandidat={kandidat}
                        markerteKandidater={markerteKandidater}
                        kontekstAvKandidatliste={kontekstAvKandidatliste}
                        onMarker={() => {
                            onMarkerKandidat(kandidat.arenaKandidatnr);
                        }}
                        forrigeØkt={forrigeØkt}
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </div>
    );
};

export default Resultat;
