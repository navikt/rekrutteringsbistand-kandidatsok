import React, { ReactNode } from 'react';
import { Heading } from '@navikt/ds-react';

import { Navigeringsstate } from '../hooks/useNavigeringsstate';
import { Respons } from '../elasticSearchTyper';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import Kandidatrad from './Kandidatrad';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';

export type Props = {
    respons: Respons;
    navigeringsstate: Navigeringsstate;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    knapper: ReactNode;
};

const Resultat = ({
    respons,
    navigeringsstate,
    kontekstAvKandidatliste,
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
                        kandidater={kandidater.map((k) => k.arenaKandidatnr)}
                        markerteKandidater={markerteKandidater}
                        erMarkert={markerteKandidater.has(kandidat.arenaKandidatnr)}
                        erFremhevet={navigeringsstate.fraKandidat === kandidat.arenaKandidatnr}
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
