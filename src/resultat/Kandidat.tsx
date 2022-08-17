import React, { FunctionComponent } from 'react';
import { BodyLong, BodyShort, Checkbox, Detail } from '@navikt/ds-react';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat as Kandidattype } from '../Kandidat';
import { storForbokstav } from '../utils';
import { Link, useLocation } from 'react-router-dom';
import css from './Resultat.module.css';
import { Heart, Place } from '@navikt/ds-icons';
import Kandidatinfo from './Kandidatinfo';

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
    const { kvalifiseringsgruppekode } = kandidat;

    let className = css.kandidat;
    if (erFremhevet) {
        className += ' ' + css.fremhevetKandidat;
    }

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

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
                <Detail>{alleInnsatsgrupper[kvalifiseringsgruppekode].label}</Detail>
                {(alleØnskedeYrker || alleØnskedeSteder) && (
                    <div className={css.jobbønske}>
                        {alleØnskedeYrker && (
                            <Kandidatinfo
                                label="Ønsket yrke"
                                ikon={<Heart />}
                                tekst={alleØnskedeYrker}
                            />
                        )}
                        {alleØnskedeSteder && (
                            <Kandidatinfo
                                label="Ønsket sted"
                                ikon={<Place />}
                                tekst={alleØnskedeSteder}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export const hentKandidatensNavn = (kandidat: Kandidattype) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const hentKandidatensØnskedeYrker = (kandidat: Kandidattype) =>
    kandidat.yrkeJobbonskerObj.length === 0
        ? undefined
        : kandidat.yrkeJobbonskerObj.map((jobbønske) => jobbønske.styrkBeskrivelse).join(', ');

const hentKandidatensØnskedeSteder = (kandidat: Kandidattype) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidattype) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidat;
