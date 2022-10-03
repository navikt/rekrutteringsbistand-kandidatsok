import React, { useEffect, useState } from 'react';
import { AddPerson } from '@navikt/ds-icons';
import { Button, Loader } from '@navikt/ds-react';
import { Error } from '@navikt/ds-icons';
import { History } from 'history';

import { setNavKontorIAmplitude } from './amplitude';
import { useKandidatsøkØkt, ØktContextProvider } from './Økt';
import Arbeidserfaring from './filter/Arbeidserfaring';
import BorPåØnsketSted from './filter/jobbønsker/BorPåØnsketSted';
import Filtergruppe from './filter/Filtergruppe';
import Førerkort from './filter/Førerkort';
import Fritekstsøk from './filter/Fritekstsøk';
import HarTilretteleggingsbehov from './filter/tilretteleggingsbehov/HarTilretteleggingsbehov';
import Hovedmål from './filter/Hovedmål';
import Jobbmuligheter from './filter/Jobbmuligheter';
import Kompetanse from './filter/Kompetanse';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import ØnsketSted from './filter/jobbønsker/ØnsketSted';
import ØnsketYrke from './filter/jobbønsker/ØnsketYrke';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import PrioriterteMålgrupper from './filter/prioriterte-målgrupper/PrioriterteMålgrupper';
import Resultat from './resultat/Resultat';
import Språk from './filter/Språk';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';
import TømFiltre from './filter/TømFiltre';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatliste, { Kandidatliste } from './hooks/useKontekstAvKandidatliste';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useRespons from './hooks/useRespons';
import useScrollTilKandidat from './hooks/useScrollTilKandidat';
import Utdanningsnivå from './filter/Utdanningsnivå';
import VelgBehovskategorier from './filter/tilretteleggingsbehov/VelgBehovskategorier';
import css from './App.module.css';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

enum Modal {
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const App = ({ navKontor }: AppProps) => {
    const [aktivModal, setAktivModal] = useState<Modal | null>();

    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);
    const kontekstAvKandidatliste = useKontekstAvKandidatliste();
    const { forrigeØkt, setØkt } = useKandidatsøkØkt();

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt.markerteKandidater
    );

    useEffect(() => {
        if (navKontor) {
            setNavKontorIAmplitude(navKontor);
        }
    }, [navKontor]);

    useEffect(() => {
        setØkt({
            markerteKandidater: Array.from(markerteKandidater),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markerteKandidater]);

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            kontekstAvKandidatliste
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
    };

    const onSuccessLagretKandidaterISpesifikkKandidatliste = (
        oppdatertKandidatliste: Kandidatliste
    ) => {
        fjernMarkering();
        kontekstAvKandidatliste?.setOppdatertKandidatliste(oppdatertKandidatliste);
    };

    return (
        <>
            {kontekstAvKandidatliste !== null && (
                <Stillingsbanner kontekst={kontekstAvKandidatliste} />
            )}
            <div className={css.container}>
                <TømFiltre />
                <aside className={css.filter}>
                    <Fritekstsøk />
                    <Filtergruppe tittel="Jobbønske">
                        <ØnsketYrke />
                        <ØnsketSted />
                        <BorPåØnsketSted />
                    </Filtergruppe>
                    <Filtergruppe tittel="Jobbmuligheter">
                        <Jobbmuligheter />
                    </Filtergruppe>
                    <Filtergruppe tittel="Hovedmål">
                        <Hovedmål />
                    </Filtergruppe>
                    <Filtergruppe tittel="Krav til kandidaten">
                        <Kompetanse />
                        <Førerkort />
                        <Språk />
                        <Arbeidserfaring />
                        <Utdanningsnivå />
                    </Filtergruppe>
                    <Filtergruppe tittel="Prioriterte målgrupper">
                        <PrioriterteMålgrupper />
                    </Filtergruppe>
                    <Filtergruppe tittel="Tilretteleggingsbehov">
                        <HarTilretteleggingsbehov />
                        <VelgBehovskategorier />
                    </Filtergruppe>
                </aside>
                <PorteføljeTabs>
                    <main className={css.hovedinnhold}>
                        {respons.kind === 'laster-inn' && (
                            <Loader
                                variant="interaction"
                                size="2xlarge"
                                className={css.lasterInn}
                            />
                        )}
                        {(respons.kind === 'suksess' || respons.kind === 'oppdaterer') && (
                            <Resultat
                                respons={respons.data}
                                kontekstAvKandidatliste={kontekstAvKandidatliste}
                                markerteKandidater={markerteKandidater}
                                onMarkerKandidat={onMarkerKandidat}
                                knapper={
                                    <>
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
                                    </>
                                }
                            />
                        )}
                    </main>
                </PorteføljeTabs>
            </div>
            {kontekstAvKandidatliste === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(null)}
                    markerteKandidater={markerteKandidater}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(null)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatliste={kontekstAvKandidatliste}
                    onSuksess={onSuccessLagretKandidaterISpesifikkKandidatliste}
                />
            )}
        </>
    );
};

const MedSession = (props: AppProps) => (
    <ØktContextProvider>
        <App {...props} />
    </ØktContextProvider>
);

export default MedSession;
