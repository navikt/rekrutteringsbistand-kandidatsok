import React, { useEffect, useState } from 'react';
import { Button } from '@navikt/ds-react';
import { AddPerson, Error } from '@navikt/ds-icons';

import { InnloggetBruker } from './hooks/useBrukerensIdent';
import { Kandidatliste, KontekstAvKandidatliste } from './hooks/useKontekstAvKandidatliste';
import { Navigeringsstate } from './hooks/useNavigeringsstate';
import { Økt } from './Økt';
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
import Søk from './Søk';
import Språk from './filter/Språk';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import Utdanningsnivå from './filter/Utdanningsnivå';
import VelgBehovskategorier from './filter/tilretteleggingsbehov/VelgBehovskategorier';
import css from './Kandidatsøk.module.css';

export type KandidatsøkProps = {
    forrigeØkt: Økt | null;
    setØkt: (økt: Økt) => void;
    innloggetBruker: InnloggetBruker;
    navigeringsstate: Navigeringsstate;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    navKontor: string | null;
};

enum Modal {
    IngenModal,
    LagreIMineKandidatlister,
    BekreftLagreIKandidatliste,
}

const Kandidatsøk = ({
    forrigeØkt,
    setØkt,
    innloggetBruker,
    kontekstAvKandidatliste,
}: KandidatsøkProps) => {
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);
    const { markerteKandidater, onMarkerKandidat, fjernMarkering } = useMarkerteKandidater(
        forrigeØkt?.markerteKandidater
    );

    useEffect(() => {
        setØkt({
            markerteKandidater: Array.from(markerteKandidater),
        });
    }, [markerteKandidater, setØkt]);

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
                        <Søk
                            innloggetBruker={innloggetBruker}
                            kontekstAvKandidatliste={kontekstAvKandidatliste}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            forrigeØkt={forrigeØkt}
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
                    </main>
                </PorteføljeTabs>
            </div>
            {kontekstAvKandidatliste === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatliste={kontekstAvKandidatliste}
                    onSuksess={onSuccessLagretKandidaterISpesifikkKandidatliste}
                />
            )}
        </>
    );
};

export default Kandidatsøk;
