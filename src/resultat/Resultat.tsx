import React, { MouseEvent, useState } from 'react';
import { Checkbox, Heading } from '@navikt/ds-react';
import { Respons } from '../elasticSearchTyper';
import { Kandidat } from '../Kandidat';
import css from './Resultat.module.css';
import { Link } from 'react-router-dom';

type Props = {
    respons: Respons;
};

const Resultat = ({ respons }: Props) => {
    const treff = respons.hits.hits;
    const kandidater = treff.map((t) => t._source);
    const [markerteKandidater, setMarkerteKandidater] = useState<Set<Kandidat>>(new Set());

    const onKandidatClick = (kandidat: Kandidat) => () => {
        const nyeMarkerteKandidater = new Set(markerteKandidater);

        if (markerteKandidater.has(kandidat)) {
            nyeMarkerteKandidater.delete(kandidat);
        } else {
            nyeMarkerteKandidater.add(kandidat);
        }

        setMarkerteKandidater(nyeMarkerteKandidater);
    };

    const onKandidatlenkeClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
    };

    return (
        <main>
            <Heading size="medium" level="2">
                {respons.hits.total.value} kandidater
            </Heading>
            <ul className={css.kandidater}>
                {kandidater.map((kandidat) => (
                    <div
                        className={css.kandidat}
                        key={kandidat.fodselsnummer}
                        aria-selected={markerteKandidater.has(kandidat)}
                    >
                        <Checkbox
                            hideLabel
                            value={kandidat}
                            checked={markerteKandidater.has(kandidat)}
                            onChange={onKandidatClick(kandidat)}
                        >
                            Valgt
                        </Checkbox>
                        <Heading level="3" size="small">
                            <Link
                                className="navds-link"
                                to={lenkeTilKandidat(kandidat)}
                                onClick={onKandidatlenkeClick}
                            >
                                {hentKandidatensNavn(kandidat)}
                            </Link>
                        </Heading>
                    </div>
                ))}
            </ul>
        </main>
    );
};

const hentKandidatensNavn = (kandidat: Kandidat) => `${kandidat.etternavn}, ${kandidat.fornavn}`;

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidat) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Resultat;
