import React, { ReactNode } from 'react';
import { Heading } from '@navikt/ds-react';

import { Respons } from '../elasticSearchTyper';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import Kandidatrad from './Kandidatrad';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';
import { SessionState } from '../hooks/useSessionStorage';

export type Props = {
    respons: Respons;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    sessionState: SessionState;
    knapper: ReactNode;
};

const Resultat = ({
    respons,
    kontekstAvKandidatliste,
    sessionState,
    markerteKandidater,
    onMarkerKandidat,
    knapper,
}: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);

    return (
        <div className={css.resultat}>
            <div className={css.telling}>
                <Heading size="medium" level="2">
                    {antallTreff} kandidater
                </Heading>
                <div>{knapper}</div>
            </div>
            <ul className={css.kandidater}>
                {kandidater.map((kandidat) => (
                    <Kandidatrad
                        key={kandidat.arenaKandidatnr}
                        kandidat={kandidat}
                        sessionState={sessionState}
                        kandidater={kandidater.map((k) => k.arenaKandidatnr)}
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
