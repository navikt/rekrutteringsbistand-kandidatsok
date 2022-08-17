import React, { FunctionComponent, ReactNode } from 'react';
import { Checkbox, Detail } from '@navikt/ds-react';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { storForbokstav } from '../utils';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Place } from '@navikt/ds-icons';
import { Highlight } from '../elasticSearchTyper';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import css from './Resultat.module.css';

type Props = {
    kandidat: Kandidat;
    markerteKandidater: Set<string>;
    erMarkert: boolean;
    onMarker: () => void;
    erFremhevet: boolean;
    highlight: Highlight;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    erMarkert,
    onMarker,
    erFremhevet,
    highlight,
}) => {
    const { search } = useLocation();
    const { kvalifiseringsgruppekode } = kandidat;

    let className = css.kandidatrad;
    if (erFremhevet) {
        className += ' ' + css.fremhevetKandidatrad;
    }

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(
        kandidat,
        highlight?.['yrkeJobbonskerObj.styrkBeskrivelse']
    );
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
                            <TekstlinjeMedIkon
                                label="Ønsket yrke"
                                ikon={<Heart />}
                                tekst={alleØnskedeYrker}
                            />
                        )}
                        {alleØnskedeSteder && (
                            <TekstlinjeMedIkon
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

export const hentKandidatensNavn = (kandidat: Kandidat) =>
    `${storForbokstav(kandidat.etternavn)}, ${storForbokstav(kandidat.fornavn)}`;

const hentKandidatensØnskedeYrker = (kandidat: Kandidat, uthevet?: string[]): ReactNode => {
    if (kandidat.yrkeJobbonskerObj.length === 0) {
        return undefined;
    }

    return kandidat.yrkeJobbonskerObj.map((jobbønske) => {
        if (uthevet?.includes(jobbønske.styrkBeskrivelse)) {
            return (
                <span key={jobbønske.styrkBeskrivelse}>
                    <b>{jobbønske.styrkBeskrivelse}</b>,{' '}
                </span>
            );
        } else {
            return <span key={jobbønske.styrkBeskrivelse}>{jobbønske.styrkBeskrivelse}, </span>;
        }
    });
};

const hentKandidatensØnskedeSteder = (kandidat: Kandidat) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidat) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidatrad;
