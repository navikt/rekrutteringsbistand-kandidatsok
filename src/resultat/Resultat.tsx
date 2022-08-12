import React from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { Error } from '@navikt/ds-icons';

import { Respons } from '../elasticSearchTyper';
import Kandidat from './Kandidat';
import Paginering from '../filter/Paginering';
import useSistBesøkteKandidat from '../hooks/useSistBesøkteKandidat';
import css from './Resultat.module.css';

type Props = {
    respons: Respons;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    fjernMarkering: () => void;
};

const Resultat = ({ respons, markerteKandidater, onMarkerKandidat, fjernMarkering }: Props) => {
    const sistBesøkteKandidat = useSistBesøkteKandidat();

    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);

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
                {kandidater.map((kandidat) => (
                    <Kandidat
                        kandidat={kandidat}
                        key={kandidat.arenaKandidatnr}
                        erMarkert={markerteKandidater.has(kandidat.arenaKandidatnr)}
                        onMarker={() => {
                            onMarkerKandidat(kandidat.arenaKandidatnr);
                        }}
                        erFremhevet={sistBesøkteKandidat === kandidat.arenaKandidatnr}
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </div>
    );
};

export default Resultat;
