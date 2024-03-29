import { FunctionComponent, useMemo } from 'react';
import { BodyShort, Button, Loader } from '@navikt/ds-react';
import { PersonPlusIcon, XMarkIcon } from '@navikt/aksel-icons';

import { InnloggetBruker } from '../hooks/useBrukerensIdent';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { Økt } from '../Økt';
import { Kandidat } from './Kandidat';
import AntallKandidater from './AntallKandidater';
import useRespons from '../hooks/useRespons';
import Paginering from '../filter/Paginering';
import Kandidatrad from './kandidatrad/Kandidatrad';
import MarkerAlle from './MarkerAlle';
import Sortering from './sortering/Sortering';
import useLagreØkt from '../hooks/useLagreØkt';
import css from './Kandidater.module.css';

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
    useLagreØkt(innloggetBruker);

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
                            icon={<XMarkIcon aria-hidden />}
                            className={css.fjernMarkeringKnapp}
                            onClick={fjernMarkering}
                        >
                            {markerteKandidater.size} markert
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="primary"
                        icon={<PersonPlusIcon aria-hidden />}
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
