import { Checkbox } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Kandidat as Kandidattype } from '../Kandidat';
import css from './Resultat.module.css';

type Props = {
    kandidat: Kandidattype;
    erMarkert: boolean;
    onMarker: () => void;
};

const Kandidat: FunctionComponent<Props> = ({ kandidat, erMarkert, onMarker }) => {
    return (
        <div className={css.kandidat} key={kandidat.fodselsnummer} aria-selected={erMarkert}>
            <Checkbox hideLabel value={kandidat} checked={erMarkert} onChange={onMarker}>
                Valgt
            </Checkbox>
            <Link className="navds-link" to={lenkeTilKandidat(kandidat)}>
                {hentKandidatensNavn(kandidat)}
            </Link>
        </div>
    );
};

const hentKandidatensNavn = (kandidat: Kandidattype) =>
    `${kandidat.etternavn}, ${kandidat.fornavn}`;

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidattype) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidat;
