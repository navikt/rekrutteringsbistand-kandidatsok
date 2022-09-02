import React, { useEffect, useState } from 'react';
import { AddPerson } from '@navikt/ds-icons';
import { Button, Loader } from '@navikt/ds-react';
import { Error } from '@navikt/ds-icons';
import { History } from 'history';

import { useKandidatsøkØkt, ØktContextProvider } from './Økt';
import Fritekstsøk from './filter/Fritekstsøk';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import PorteføljeTabs from './filter/PorteføljeTabs';
import Resultat from './resultat/Resultat';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';
import TømFiltre from './filter/TømFiltre';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import useKontekstAvKandidatliste from './hooks/useKontekstAvKandidatliste';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useRespons from './hooks/useRespons';
import useScrollPosition from './hooks/useScrollPosition';
import VelgInnsatsgruppe from './filter/Jobbmuligheter';
import Jobbønsker from './filter/jobbønsker/Jobbønsker';
import ØnsketYrke from './filter/jobbønsker/ØnsketYrke';
import ØnsketSted from './filter/jobbønsker/ØnsketSted';
import css from './App.module.css';

import '@reach/combobox/styles.css';

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
    const sisteScrollposisjon = useScrollPosition();

    const { forrigeØkt, setØkt } = useKandidatsøkØkt();

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt.markerteKandidater
    );

    useEffect(() => {
        setØkt({
            markerteKandidater: Array.from(markerteKandidater),
            sisteScrollposisjon: sisteScrollposisjon,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markerteKandidater, sisteScrollposisjon]);

    const onLagreIKandidatlisteClick = () => {
        setAktivModal(
            kontekstAvKandidatliste
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
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
                    <Jobbønsker>
                        <ØnsketYrke />
                        <ØnsketSted />
                    </Jobbønsker>
                    <VelgInnsatsgruppe />
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
                    onSuksess={fjernMarkering}
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
