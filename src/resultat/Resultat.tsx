import React, { ReactNode, useEffect } from 'react';
import { Heading } from '@navikt/ds-react';

import { formaterStortTall } from '../utils';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { Respons } from '../elasticSearchTyper';
import { useKandidatsøkØkt } from '../Økt';
import Kandidatrad from './Kandidatrad';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';

export type Props = {
    respons: Respons;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    knapper: ReactNode;
};

const Resultat = ({
    respons,
    kontekstAvKandidatliste,
    markerteKandidater,
    onMarkerKandidat,
    knapper,
}: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);
    const kandidatnumre = kandidater.map((k) => k.arenaKandidatnr);

    const { setØkt } = useKandidatsøkØkt();

    useEffect(() => {
        setØkt({
            kandidater: kandidatnumre,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(kandidatnumre)]);

    return (
        <div className={css.resultat}>
            <div className={css.telling}>
                <Heading size="medium" level="2">
                    {formaterStortTall(antallTreff)} kandidater
                </Heading>
                <div>{knapper}</div>
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
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </div>
    );
};

export default Resultat;
