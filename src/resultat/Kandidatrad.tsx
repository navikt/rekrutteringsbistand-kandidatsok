import React, { FunctionComponent, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Checkbox, Detail } from '@navikt/ds-react';
import { Heart, Place } from '@navikt/ds-icons';

import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { lenkeTilKandidat, storForbokstav } from '../utils';
import { SessionState } from '../hooks/useSessionStorage';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import useNavigeringsstate from '../hooks/useNavigeringsstate';
import useScrollTilKandidat from '../hooks/useScrollTilKandidat';
import css from './Kandidatrad.module.css';

type Props = {
    kandidat: Kandidat;
    kandidater: string[];
    markerteKandidater: Set<string>;
    onMarker: () => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    sessionState: SessionState;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    kandidater,
    markerteKandidater,
    onMarker,
    kontekstAvKandidatliste,
    sessionState,
}) => {
    const location = useLocation();
    const navigeringsstate = useNavigeringsstate();
    const fremhevet = navigeringsstate.kandidat === kandidat.arenaKandidatnr;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);
    const element = useRef<HTMLDivElement | null>(null);

    useScrollTilKandidat(element, fremhevet, sessionState.lastScrollPosition);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

    const stateTilKandidatside = {
        search: location.search,
        kandidater,
        markerteKandidater,
    };

    return (
        <div
            ref={element}
            className={css.kandidatrad + (fremhevet ? ' ' + css.fremhevetKandidatrad : '')}
            key={kandidat.fodselsnummer}
            aria-selected={markert}
        >
            <Checkbox hideLabel value={kandidat} checked={markert} onChange={onMarker}>
                Valgt
            </Checkbox>
            <div className={css.kandidatinformasjon}>
                <div className={css.navn}>
                    <Link
                        className="navds-link"
                        state={stateTilKandidatside}
                        to={lenkeTilKandidat(
                            kandidat.arenaKandidatnr,
                            kontekstAvKandidatliste?.kandidatlisteId
                        )}
                    >
                        {hentKandidatensNavn(kandidat)}
                    </Link>
                </div>
                <Detail className={css.innsatsgruppe}>
                    {alleInnsatsgrupper[kandidat.kvalifiseringsgruppekode].label}
                </Detail>
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

export default Kandidatrad;
