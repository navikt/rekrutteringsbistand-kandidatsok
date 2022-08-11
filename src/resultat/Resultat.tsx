import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Respons } from '../elasticSearchTyper';
import { Kandidat as Kandidattype } from '../Kandidat';
import Kandidat from './Kandidat';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';
import useSistBesøkteKandidat from '../hooks/useSistBesøkteKandidat';

type Props = {
    respons: Respons;
};

const Resultat = ({ respons }: Props) => {
    const sistBesøkteKandidat = useSistBesøkteKandidat();
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<Kandidattype>>(new Set());

    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);

    const onKandidatMarker = (kandidat: Kandidattype) => () => {
        const nyeMarkerteKandidater = new Set(markerteKandidater);

        if (markerteKandidater.has(kandidat)) {
            nyeMarkerteKandidater.delete(kandidat);
        } else {
            nyeMarkerteKandidater.add(kandidat);
        }

        setMarkerteKandidater(nyeMarkerteKandidater);
    };

    return (
        <div className={css.resultat}>
            <Heading size="medium" level="2">
                {antallTreff} kandidater
            </Heading>
            <ul className={css.kandidater}>
                {kandidater.map((kandidat) => (
                    <Kandidat
                        kandidat={kandidat}
                        key={kandidat.arenaKandidatnr}
                        erMarkert={markerteKandidater.has(kandidat)}
                        onMarker={onKandidatMarker(kandidat)}
                        erFremhevet={sistBesøkteKandidat === kandidat.arenaKandidatnr}
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </div>
    );
};

export default Resultat;
