import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Detail } from '@navikt/ds-react';
import { Heart, Place, DecisionCheck } from '@navikt/ds-icons';

import { alleInnsatsgrupper } from '../../filter/Jobbmuligheter';
import { Kandidat } from '../Kandidat';
import { Kandidatliste, KontekstAvKandidatliste } from '../../hooks/useKontekstAvKandidatliste';
import { lenkeTilKandidat, storForbokstav } from '../../utils';
import { Økt } from '../../Økt';
import TekstlinjeMedIkon from './TekstlinjeMedIkon';
import useScrollTilKandidat from '../../hooks/useScrollTilKandidat';
import css from './Kandidatrad.module.css';

type Props = {
    kandidat: Kandidat;
    markerteKandidater: Set<string>;
    onMarker: () => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    forrigeØkt: Økt | null;
};

const Kandidatrad: FunctionComponent<Props> = ({
    kandidat,
    markerteKandidater,
    onMarker,
    kontekstAvKandidatliste,
    forrigeØkt,
}) => {
    const fremhevet = kandidat.arenaKandidatnr === forrigeØkt?.sistBesøkteKandidat;
    const markert = markerteKandidater.has(kandidat.arenaKandidatnr);

    useScrollTilKandidat(kandidat.arenaKandidatnr, forrigeØkt?.sistBesøkteKandidat);

    const alleØnskedeYrker = hentKandidatensØnskedeYrker(kandidat);
    const alleØnskedeSteder = hentKandidatensØnskedeSteder(kandidat);

    const kandidatAlleredeLagtTilPåKandidatlista =
        kontekstAvKandidatliste?.kandidatliste.kind === 'suksess'
            ? kandidatenErPåKandidatlista(kandidat, kontekstAvKandidatliste.kandidatliste.data)
            : false;

    return (
        <div
            id={`kandidatrad-${kandidat.arenaKandidatnr}`}
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
                {kandidatAlleredeLagtTilPåKandidatlista && (
                    <div
                        title="Kandidater er allerede lagt til på kandidatlisten"
                        className={css.kandidatPåListe}
                    >
                        <DecisionCheck />
                    </div>
                )}
            </div>
        </div>
    );
};

const kandidatenErPåKandidatlista = (kandidat: Kandidat, kandidatliste: Kandidatliste): boolean => {
    return kandidatliste.kandidater.some((kandidatPåLista) => {
        return kandidatPåLista.kandidatnr === kandidat.arenaKandidatnr;
    });
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
