import { Button, Heading, Loader, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { hentMineKandidatlister, lagreKandidaterIValgteKandidatlister } from '../api/api';
import { AddPerson } from '@navikt/ds-icons';
import VelgKandidatlister from './VelgKandidatlister';
import css from './LagreKandidaterModal.module.css';
import { Kandidat } from '../Kandidat';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
};

export type MineKandidatlister = {
    liste: Kandidatliste[];
    antall: number;
};

export type Kandidatliste = {
    kandidatlisteId: string;
    tittel: string;
    organisasjonNavn: string | null;
    antallKandidater: number;
    kandidater: Kandidat[];
};

export type LagreKandidaterDto = Array<{
    kandidatnr: string;
}>;

const LagreKandidaterModal: FunctionComponent<Props> = ({ vis, onClose, markerteKandidater }) => {
    const [markerteLister, setMarkerteLister] = useState<Set<string>>(new Set());
    const [mineKandidatlister, setMineKandidatlister] = useState<Nettressurs<MineKandidatlister>>({
        kind: 'ikke-lastet',
    });
    const [lagreIKandidatlister, setLagreIKandidatlister] = useState<
        Nettressurs<LagreKandidaterDto>
    >({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        const lastInnKandidatlister = async () => {
            setMineKandidatlister({
                kind: 'laster-inn',
            });

            try {
                const mineKandidatlister = await hentMineKandidatlister();

                setMineKandidatlister({
                    kind: 'suksess',
                    data: mineKandidatlister,
                });
            } catch (e) {
                setMineKandidatlister({
                    kind: 'feil',
                    error: e as string,
                });
            }
        };

        if (vis) {
            lastInnKandidatlister();
        }
    }, [vis]);

    const onKandidatlisteMarkert = (event: ChangeEvent<HTMLInputElement>) => {
        const kandidatlisteId = event.target.value;
        const markerte = new Set(markerteLister);

        if (event.target.checked) {
            markerte.add(kandidatlisteId);
        } else {
            markerte.delete(kandidatlisteId);
        }

        setMarkerteLister(markerte);
    };

    const onLagreKandidater = async () => {
        const lagreKandidaterDto = Array.from(markerteKandidater).map((kandidat) => ({
            kandidatnr: kandidat,
        }));

        setLagreIKandidatlister({ kind: 'laster-opp', data: lagreKandidaterDto });

        try {
            const markerteKandidatlister = Array.from(markerteLister);

            const mineOppdaterteKandidatlister = await lagreKandidaterIValgteKandidatlister(
                lagreKandidaterDto,
                markerteKandidatlister
            );

            setLagreIKandidatlister({ kind: 'suksess', data: lagreKandidaterDto });
            setMineKandidatlister({
                kind: 'suksess',
                data: mineOppdaterteKandidatlister[0],
            });

            setMarkerteLister(new Set());
        } catch (e) {
            setLagreIKandidatlister({
                kind: 'feil',
                error: e as string,
            });
        }
    };

    return (
        <Modal closeButton open={vis} onClose={onClose}>
            <div className={css.innhold}>
                <Heading size="medium" level="1">
                    Lagre kandidater
                </Heading>
                {mineKandidatlister.kind === 'laster-inn' && <Loader />}
                {mineKandidatlister.kind === 'suksess' && (
                    <VelgKandidatlister
                        markerteLister={markerteLister}
                        mineKandidatlister={mineKandidatlister.data}
                        onKandidatlisteMarkert={onKandidatlisteMarkert}
                    />
                )}
                <div className={css.knapper}>
                    <Button
                        variant="primary"
                        size="small"
                        onClick={onLagreKandidater}
                        disabled={markerteLister.size === 0}
                        loading={lagreIKandidatlister.kind === 'laster-opp'}
                    >
                        <AddPerson />
                        Lagre i lister
                    </Button>
                    <Button variant="secondary" size="small" onClick={onClose}>
                        Avbryt
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LagreKandidaterModal;
