import React, { FunctionComponent } from 'react';
import { Checkbox, Detail } from '@navikt/ds-react';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat as Kandidattype } from '../Kandidat';
import { storForbokstav } from '../utils';
import { Link } from 'react-router-dom';
import css from './Resultat.module.css';

type Props = {
    kandidat: Kandidattype;
    erMarkert: boolean;
    onMarker: () => void;
    erFremhevet: boolean;
};

const Kandidat: FunctionComponent<Props> = ({ kandidat, erMarkert, onMarker, erFremhevet }) => {
    let className = css.kandidat;
    if (erFremhevet) {
        className += ' ' + css.fremhevetKandidat;
    }

    return (
        <div className={className} key={kandidat.fodselsnummer} aria-selected={erMarkert}>
            <Checkbox hideLabel value={kandidat} checked={erMarkert} onChange={onMarker}>
                Valgt
            </Checkbox>
            <div className={css.kandidatinformasjon}>
                <Link className="navds-link" to={lenkeTilKandidat(kandidat)}>
                    {hentKandidatensNavn(kandidat)}
                </Link>
                <Detail>{alleInnsatsgrupper[kandidat.kvalifiseringsgruppekode]?.label}</Detail>
                <Detail className={css.jobbønsker}>
                    {kandidat.yrkeJobbonskerObj
                        .map((jobbønske) => jobbønske.styrkBeskrivelse)
                        .join(', ')}
                </Detail>
            </div>
        </div>
    );
};

export const hentKandidatensNavn = (kandidat: Kandidattype) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidattype) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidat;
