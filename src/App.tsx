import React, { useState } from 'react';
import { Button, Loader } from '@navikt/ds-react';
import { Error } from '@navikt/ds-icons';
import { History } from 'history';

import Resultat from './resultat/Resultat';
import useRespons from './hooks/useRespons';
import Fritekstsøk from './filter/Fritekstsøk';
import PorteføljeTabs from './filter/PorteføljeTabs';
import useInnloggetBruker from './hooks/useBrukerensIdent';
import VelgInnsatsgruppe from './filter/Jobbmuligheter';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import useNavigeringsstate from './hooks/useNavigeringsstate';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';
import useKontekstAvKandidatliste from './hooks/useKontekstAvKandidatliste';
import css from './App.module.css';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import { AddPerson } from '@navikt/ds-icons';

export type AppProps = {
    navKontor: string | null;
    history: History;
};

enum Modal {
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const App = ({ navKontor }: AppProps) => {
    const innloggetBruker = useInnloggetBruker(navKontor);
    const respons = useRespons(innloggetBruker);
    const navigeringsstate = useNavigeringsstate();
    const kontekstAvKandidatliste = useKontekstAvKandidatliste();
    const [aktivModal, setAktivModal] = useState<Modal | null>();

    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        navigeringsstate.markerteKandidater
    );

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
                                navigeringsstate={navigeringsstate}
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

export default App;
