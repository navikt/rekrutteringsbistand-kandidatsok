import React, { useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Respons } from '../elasticSearchTyper';
import { Kandidat as Kandidattype } from '../Kandidat';
import Kandidat from './Kandidat';
import css from './Resultat.module.css';
import Paginering from '../filter/Paginering';

type Props = {
    respons: Respons;
};

const Resultat = ({ respons }: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<Kandidattype>>(new Set());

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
        <main className={css.resultat}>
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
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
        </main>
    );
};

export default Resultat;
