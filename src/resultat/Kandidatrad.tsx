import React, { FunctionComponent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Detail } from '@navikt/ds-react';
import { Heart, Place } from '@navikt/ds-icons';

import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { lenkeTilKandidat, storForbokstav } from '../utils';
import { useKandidatsøkSession } from '../KandidatsøkSession';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import useScrollTilKandidat from '../hooks/useScrollTilKandidat';
import css from './Kandidatrad.module.css';

type Props = {
    kandidat: Kandidat;
    markerteKandidater: Set<string>;
    onMarker: () => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    onMarker,
    kontekstAvKandidatliste,
}) => {
    const { initialSessionState } = useKandidatsøkSession();
    const fremhevet = kandidat.arenaKandidatnr === initialSessionState.sistBesøkteKandidat;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);
    const element = useRef<HTMLDivElement | null>(null);

    useScrollTilKandidat(element, fremhevet);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

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
