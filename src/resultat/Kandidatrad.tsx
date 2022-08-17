import React, { FunctionComponent } from 'react';
import { Checkbox, Detail } from '@navikt/ds-react';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { storForbokstav } from '../utils';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Place } from '@navikt/ds-icons';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import css from './Resultat.module.css';

type Props = {
    kandidat: Kandidat;
    markerteKandidater: Set<string>;
    erMarkert: boolean;
    onMarker: () => void;
    erFremhevet: boolean;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    erMarkert,
    onMarker,
    erFremhevet,
}) => {
    const { search } = useLocation();
    const { kvalifiseringsgruppekode } = kandidat;

    let className = css.kandidatrad;
    if (erFremhevet) {
        className += ' ' + css.fremhevetKandidatrad;
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

const hentKandidatensØnskedeYrker = (kandidat: Kandidat) =>
    kandidat.yrkeJobbonskerObj.length === 0
        ? undefined
        : kandidat.yrkeJobbonskerObj.map((jobbønske) => jobbønske.styrkBeskrivelse).join(', ');

const hentKandidatensØnskedeSteder = (kandidat: Kandidat) =>
    kandidat.geografiJobbonsker.length === 0
        ? undefined
        : kandidat.geografiJobbonsker.map((jobbønske) => jobbønske.geografiKodeTekst).join(', ');

const lenkeTilKandidat = ({ arenaKandidatnr }: Kandidat) =>
    `/kandidater/kandidat/${arenaKandidatnr}/cv`;

export default Kandidatrad;