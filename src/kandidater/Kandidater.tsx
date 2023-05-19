import React, { FunctionComponent, useContext, useEffect, useMemo } from 'react';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { AddPerson, Error } from '@navikt/ds-icons';
import { InnloggetBruker } from '../hooks/useBrukerensIdent';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { Økt, ØktContext } from '../Økt';
import AntallKandidater from './AntallKandidater';
import useRespons from '../hooks/useRespons';
import Paginering from '../filter/Paginering';
import Kandidatrad from './kandidatrad/Kandidatrad';
import MarkerAlle from './MarkerAlle';
import css from './Kandidater.module.css';
import Sortering from './sortering/Sortering';
import { Kandidat } from './Kandidat';
import { PAGE_SIZE } from '../api/query/byggQuery';

type Props = {
    innloggetBruker: InnloggetBruker;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
    onLagreIKandidatlisteClick: () => void;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    fjernMarkering: () => void;
    forrigeØkt: Økt | null;
    setKandidaterPåSiden: (kandidater: Kandidat[]) => void;
};

const Kandidater: FunctionComponent<Props> = ({
    innloggetBruker,
    kontekstAvKandidatlisteEllerStilling,
    onLagreIKandidatlisteClick,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
    forrigeØkt,
    setKandidaterPåSiden,
}) => {
    const respons = useRespons(innloggetBruker);

    const { kandidater, totaltAntallKandidater } = useMemo(() => {
        if (respons.kind === 'suksess' || respons.kind === 'oppdaterer') {
            const hits = respons.data.hits;
            const kandidater = hits.hits.map((t) => t._source);

            setKandidaterPåSiden(kandidater);

            return {
                kandidater,
                totaltAntallKandidater: hits.total.value,
            };
        } else {
            return {
                kandidater: [],
                totaltAntallKandidater: 0,
            };
        }
    }, [respons, setKandidaterPåSiden]);

    const kandidatnumre = useMemo(() => kandidater.map((k) => k.arenaKandidatnr), [kandidater]);

    const { setØkt } = useContext(ØktContext);

    useEffect(() => {
        setØkt({
            kandidaterPåSiden: kandidatnumre,
            totaltAntallKandidater,
            sidestørrelse: PAGE_SIZE,
        });
    }, [kandidatnumre, setØkt]);

    return (
        <div className={css.kandidater}>
            <div className={css.handlinger}>
                <AntallKandidater respons={respons} />
                <div className={css.knapper}>
                    {markerteKandidater.size > 0 && (
                        <Button
                            size="small"
                            variant="secondary"
                            aria-label="Fjern markerte kandidater"
                            icon={<Error aria-hidden />}
                            className={css.fjernMarkeringKnapp}
                            onClick={fjernMarkering}
                        >
                            {markerteKandidater.size} markert
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="primary"
                        icon={<AddPerson aria-hidden />}
                        disabled={markerteKandidater.size === 0}
                        onClick={onLagreIKandidatlisteClick}
                    >
                        Lagre i kandidatliste
                    </Button>
                </div>
            </div>

            {respons.kind === 'laster-inn' && (
                <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
            )}

            {respons.kind === 'feil' && (
                <BodyShort className={css.feilmelding} aria-live="assertive">
                    {respons.statuskode === 403
                        ? 'Du har ikke tilgang til kandidatsøket'
                        : respons.error}
                </BodyShort>
            )}

            {kandidater.length > 0 && (
                <>
                    <div className={css.overKandidater}>
                        <MarkerAlle
                            kandidater={kandidater}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            kontekstAvKandidatlisteEllerStilling={
                                kontekstAvKandidatlisteEllerStilling
                            }
                        />
                        <Sortering />
                    </div>
                    <ul className={css.kandidatrader}>
                        {kandidater.map((kandidat) => (
                            <Kandidatrad
                                key={kandidat.arenaKandidatnr}
                                kandidat={kandidat}
                                markerteKandidater={markerteKandidater}
                                kontekstAvKandidatlisteEllerStilling={
                                    kontekstAvKandidatlisteEllerStilling
                                }
                                forrigeØkt={forrigeØkt}
                                onMarker={() => {
                                    onMarkerKandidat(kandidat.arenaKandidatnr);
                                }}
                            />
                        ))}
                    </ul>
                    <Paginering antallTreff={totaltAntallKandidater} />
                </>
            )}
        </div>
    );
};

export default Kandidater;
