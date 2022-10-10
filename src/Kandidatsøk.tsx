import React, { useEffect, useState } from 'react';

import { InnloggetBruker } from './hooks/useBrukerensIdent';
import { Kandidatliste, KontekstAvKandidatliste } from './hooks/useKontekstAvKandidatliste';
import { Navigeringsstate } from './hooks/useNavigeringsstate';
import { Økt } from './Økt';
import Kandidater from './kandidater/Kandidater';
import LagreKandidaterIMineKandidatlisterModal from './kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import LagreKandidaterISpesifikkKandidatlisteModal from './kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import PorteføljeTabs from './filter/porteføljetabs/PorteføljeTabs';
import Stillingsbanner from './stillingsbanner/Stillingsbanner';
import TømFiltre from './filter/TømFiltre';
import useMarkerteKandidater from './hooks/useMarkerteKandidater';
import css from './Kandidatsøk.module.css';
import Filter from './filter/Filter';

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
                    <Filter />
                </aside>
                <PorteføljeTabs>
                    <main className={css.hovedinnhold}>
                        <Kandidater
                            innloggetBruker={innloggetBruker}
                            kontekstAvKandidatliste={kontekstAvKandidatliste}
                            onLagreIKandidatlisteClick={onLagreIKandidatlisteClick}
                            markerteKandidater={markerteKandidater}
                            onMarkerKandidat={onMarkerKandidat}
                            fjernMarkering={fjernMarkering}
                            forrigeØkt={forrigeØkt}
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
