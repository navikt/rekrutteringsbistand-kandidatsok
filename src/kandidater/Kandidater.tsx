import React, { FunctionComponent, useContext, useEffect, useMemo } from 'react';
import { Button, Loader } from '@navikt/ds-react';
import { AddPerson, Error } from '@navikt/ds-icons';
import { InnloggetBruker } from '../hooks/useBrukerensIdent';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { Økt, ØktContext } from '../Økt';
import AntallKandidater from './AntallKandidater';
import useRespons from '../hooks/useRespons';
import Paginering from '../filter/Paginering';
import Kandidatrad from './kandidatrad/Kandidatrad';
import MarkerAlle from './MarkerAlle';
import css from './Kandidater.module.css';
import Matcheknapp from './matcheknapp/Matcheknapp';

type Props = {
    innloggetBruker: InnloggetBruker;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    onLagreIKandidatlisteClick: () => void;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    fjernMarkering: () => void;
    forrigeØkt: Økt | null;
    harTilgangTilAutomatiskMatching: boolean;
};

const Kandidater: FunctionComponent<Props> = ({
    innloggetBruker,
    kontekstAvKandidatliste,
    onLagreIKandidatlisteClick,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
    forrigeØkt,
    harTilgangTilAutomatiskMatching,
}) => {
    const respons = useRespons(innloggetBruker);

    const { kandidater, totaltAntallKandidater } = useMemo(() => {
        if (respons.kind === 'suksess' || respons.kind === 'oppdaterer') {
            const hits = respons.data.hits;
            return {
                kandidater: hits.hits.map((t) => t._source),
                totaltAntallKandidater: hits.total.value,
            };
        } else {
            return {
                kandidater: [],
                totaltAntallKandidater: 0,
            };
        }
    }, [respons]);

    const kandidatnumre = useMemo(() => kandidater.map((k) => k.arenaKandidatnr), [kandidater]);

    const { setØkt } = useContext(ØktContext);

    useEffect(() => {
        setØkt({
            kandidater: kandidatnumre,
        });
    }, [kandidatnumre, setØkt]);

    const skalViseKnappForAutomatiskMatching =
        harTilgangTilAutomatiskMatching && kandidater.length > 0;

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

            {skalViseKnappForAutomatiskMatching &&
                kontekstAvKandidatliste?.kandidatliste.kind === 'suksess' && (
                    <Matcheknapp
                        kandidatliste={kontekstAvKandidatliste?.kandidatliste.data}
                        kandidater={kandidater}
                        innloggetBruker={innloggetBruker}
                    />
                )}

            {respons.kind === 'laster-inn' && (
                <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />
            )}

            {kandidater.length > 0 && (
                <div className={css.overKandidater}>
                    <MarkerAlle
                        kandidater={kandidater}
                        markerteKandidater={markerteKandidater}
                        onMarkerKandidat={onMarkerKandidat}
                        kontekstAvKandidatliste={kontekstAvKandidatliste}
                    />
                </div>
            )}

            {kandidater.length > 0 && (
                <>
                    <ul className={css.kandidatrader}>
                        {kandidater.map((kandidat) => (
                            <Kandidatrad
                                key={kandidat.arenaKandidatnr}
                                kandidat={kandidat}
                                markerteKandidater={markerteKandidater}
                                kontekstAvKandidatliste={kontekstAvKandidatliste}
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
