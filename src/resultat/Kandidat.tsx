import React, { FunctionComponent } from 'react';
import { BodyLong, BodyShort, Checkbox, Detail } from '@navikt/ds-react';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat as Kandidattype } from '../Kandidat';
import { storForbokstav } from '../utils';
import { Link, useLocation } from 'react-router-dom';
import css from './Resultat.module.css';
import { Heart, Place } from '@navikt/ds-icons';

type Props = {
    kandidat: Kandidattype;
    markerteKandidater: Set<string>;
    erMarkert: boolean;
    onMarker: () => void;
    erFremhevet: boolean;
};

const Kandidat: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    erMarkert,
    onMarker,
    erFremhevet,
}) => {
    const { search } = useLocation();

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
                <div>
                    <Link
                        className="navds-link"
                        to={lenkeTilKandidat(kandidat)}
                        state={{
                            search,
                            markerteKandidater,
                        }}
                    >
                        {hentKandidatensNavn(kandidat)}
                    </Link>
                </div>
                <Detail>{alleInnsatsgrupper[kandidat.kvalifiseringsgruppekode]?.label}</Detail>
                <div>
                    {kandidat.yrkeJobbonskerObj.length > 0 && (
                        <div title="Ønsket yrke" className={css.ønsketYrke}>
                            <Heart />
                            <BodyLong className={css.jobbønsker}>
                                {kandidat.yrkeJobbonskerObj
                                    .map((jobbønske) => jobbønske.styrkBeskrivelse)
                                    .join(', ')}
                            </BodyLong>
                        </div>
                    )}
                    {kandidat.geografiJobbonsker.length > 0 && (
                        <div title="Ønsket sted" className={css.ønsketYrke}>
                            <Place />
                            <BodyLong className={css.jobbønsker}>
                                {kandidat.geografiJobbonsker
                                    .map((sted) => sted.geografiKodeTekst)
                                    .join(', ')}
                            </BodyLong>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const hentKandidatensNavn = (kandidat: Kandidattype) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidattype) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidat;
