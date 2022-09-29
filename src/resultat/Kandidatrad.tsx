import React, { FunctionComponent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Detail } from '@navikt/ds-react';
import { Heart, Place, DecisionCheck } from '@navikt/ds-icons';
import { alleInnsatsgrupper } from '../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { Kandidatliste, KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { lenkeTilKandidat, storForbokstav } from '../utils';
import { useKandidatsøkØkt } from '../Økt';
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
    const { forrigeØkt } = useKandidatsøkØkt();
    const fremhevet = kandidat.arenaKandidatnr === forrigeØkt.sistBesøkteKandidat;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);
    const element = useRef<HTMLDivElement | null>(null);

    useScrollTilKandidat(element, fremhevet);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

    const kandidatAlleredeLagtTilPåKandidatlista = kontekstAvKandidatliste?.kandidatliste.kind === 'suksess'
        ? kandidatenErPåKandidatlista(kandidat, kontekstAvKandidatliste.kandidatliste.data)
        : false;

    return (
        <div
            ref={element}
            className={css.kandidatrad + (fremhevet ? ' ' + css.fremhevetKandidatrad : '')}
            key={kandidat.fodselsnummer}
            aria-selected={markert}
        >
            <Checkbox
                hideLabel
                value={kandidat}
                checked={markert}
                onChange={onMarker}
                disabled={kandidatAlleredeLagtTilPåKandidatlista}
            >
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
                <div>
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
                <div className={css.kandidatPåListe}>
                    {kandidatAlleredeLagtTilPåKandidatlista &&
                        <DecisionCheck height="1.5rem" width="1.5rem"/>
                    }
                </div>
            </div>
        </div>
    );
};

const kandidatenErPåKandidatlista = (kandidat: Kandidat, kandidatliste: Kandidatliste): boolean => {
    console.log("Sjekker om noen av kandidatene i søketreffet allerede finnes på lista");
    console.log("Sjekker lista om noen av kandidatene har kandidatnr " + kandidat.arenaKandidatnr);
    kandidatliste.kandidater.some((kandidatPåLista) => {
        console.log("Sammenligner mot " + kandidatPåLista.arenaKandidatnr);
        return kandidatPåLista.arenaKandidatnr === kandidat.arenaKandidatnr;
    });
}

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
