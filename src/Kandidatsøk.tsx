import React, { useEffect, useState } from 'react';

import { InnloggetBruker } from './hooks/useBrukerensIdent';
import {
    Kandidatliste,
    KontekstAvKandidatlisteEllerStilling,
} from './hooks/useKontekstAvKandidatlisteEllerStilling';
import { Økt } from './Økt';
import Kandidater from './kandidater/Kandidater';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import Kandidatlistebanner from './kandidatlistebanner/Kandidatlistebanner';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';
import { Kandidat } from './kandidater/Kandidat';

export type KandidatsøkProps = {
    forrigeØkt: Økt | null;
    setØkt: (økt: Økt) => void;
    innloggetBruker: InnloggetBruker;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling | null;
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
    kontekstAvKandidatlisteEllerStilling,
}: KandidatsøkProps) => {
    const [aktivModal, setAktivModal] = useState<Modal>(Modal.IngenModal);
    const [kandidaterPåSiden, setKandidaterPåSiden] = useState<Kandidat[]>([]);
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
            kontekstAvKandidatlisteEllerStilling
                ? Modal.BekreftLagreIKandidatliste
                : Modal.LagreIMineKandidatlister
        );
    };

    const onSuccessLagretKandidaterISpesifikkKandidatliste = (
        oppdatertKandidatliste: Kandidatliste
    ) => {
        fjernMarkering();
        kontekstAvKandidatlisteEllerStilling?.setOppdatertKandidatliste(oppdatertKandidatliste);
    };

    return (
        <>
            {kontekstAvKandidatlisteEllerStilling !== null && (
                <Kandidatlistebanner kontekst={kontekstAvKandidatlisteEllerStilling} />
            )}
            <div className={css.container}>
                <TømFiltre />
                <aside className={css.filter}>
                    <Filter />
                </aside>
                <PorteføljeTabs>
                    <main className={css.hovedinnhold}>
                        <Kandidater
                            innloggetBruker={innloggetBruker}
                            kontekstAvKandidatlisteEllerStilling={
                                kontekstAvKandidatlisteEllerStilling
                            }
                            onLagreIKandidatlisteClick={onLagreIKandidatlisteClick}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            fjernMarkering={fjernMarkering}
                            forrigeØkt={forrigeØkt}
                            setKandidaterPåSiden={setKandidaterPåSiden}
                        />
                    </main>
                </PorteføljeTabs>
            </div>
            {kontekstAvKandidatlisteEllerStilling === null ? (
                <LagreKandidaterIMineKandidatlisterModal
                    vis={aktivModal === Modal.LagreIMineKandidatlister}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kandidaterPåSiden={kandidaterPåSiden}
                />
            ) : (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={aktivModal === Modal.BekreftLagreIKandidatliste}
                    onClose={() => setAktivModal(Modal.IngenModal)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvKandidatlisteEllerStilling={kontekstAvKandidatlisteEllerStilling}
                    onSuksess={onSuccessLagretKandidaterISpesifikkKandidatliste}
                />
            )}
        </>
    );
};

export default Kandidatsøk;
