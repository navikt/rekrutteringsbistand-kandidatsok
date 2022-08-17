import React from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { Error } from '@navikt/ds-icons';

import { Navigeringsstate } from '../hooks/useNavigeringsstate';
import { Respons } from '../elasticSearchTyper';
import Kandidatrad from './Kandidatrad';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';

export type Props = {
    respons: Respons;
    navigeringsstate: Navigeringsstate;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    fjernMarkering: () => void;
};

const Resultat = ({
    respons,
    navigeringsstate,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
}: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;

    return (
        <div className={css.resultat}>
            <div className={css.telling}>
                <Heading size="medium" level="2">
                    {antallTreff} kandidater
                </Heading>
                {markerteKandidater.size > 0 && (
                    <Button
                        size="small"
                        variant="secondary"
                        aria-label="Fjern markerte kandidater"
                        onClick={fjernMarkering}
                    >
                        <Error />
                        {markerteKandidater.size} markert
                    </Button>
                )}
            </div>
            <ul className={css.kandidater}>
                {treff.map(({ _source: kandidat, highlight }) => (
                    <Kandidatrad
                        kandidat={kandidat}
                        highlight={highlight}
                        key={kandidat.arenaKandidatnr}
                        markerteKandidater={markerteKandidater}
                        erMarkert={markerteKandidater.has(kandidat.arenaKandidatnr)}
                        onMarker={() => {
                            onMarkerKandidat(kandidat.arenaKandidatnr);
                        }}
                        erFremhevet={navigeringsstate.fraKandidat === kandidat.arenaKandidatnr}
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </div>
    );
};

export default Resultat;
