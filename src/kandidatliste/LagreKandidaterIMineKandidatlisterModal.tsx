import { Button, Heading, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { lagreKandidaterIValgteKandidatlister } from '../api/api';
import VelgKandidatlister from './VelgKandidatlister';
import SøkPåKandidatliste from './SøkPåKandidatliste';
import css from './LagreKandidaterIMineKandidatlisterModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
};

export type LagreKandidaterDto = Array<{
    kandidatnr: string;
}>;

const LagreKandidaterIMineKandidatlisterModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
}) => {
    const [markerteLister, setMarkerteLister] = useState<Set<string>>(new Set());
    const [lagredeLister, setLagredeLister] = useState<Set<string>>(new Set());
    const [lagreIKandidatlister, setLagreIKandidatlister] = useState<
        Nettressurs<LagreKandidaterDto>
    >({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        if (vis) {
            setMarkerteLister(new Set());
            setLagredeLister(new Set());
            setLagreIKandidatlister({
                kind: 'ikke-lastet',
            });
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

            await lagreKandidaterIValgteKandidatlister(lagreKandidaterDto, markerteKandidatlister);

            setLagreIKandidatlister({ kind: 'suksess', data: lagreKandidaterDto });
            setMarkerteLister(new Set());

            const oppdaterteLagredeLister = new Set(lagredeLister);
            markerteKandidatlister.forEach((kandidatlisteId) => {
                oppdaterteLagredeLister.add(kandidatlisteId);
            });

            setLagredeLister(oppdaterteLagredeLister);
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
                    Lagre {markerteKandidater.size} kandidat
                    {markerteKandidater.size === 1 ? '' : 'er'} i kandidatlister
                </Heading>
                <VelgKandidatlister
                    markerteLister={markerteLister}
                    lagredeLister={lagredeLister}
                    onKandidatlisteMarkert={onKandidatlisteMarkert}
                />
                <SøkPåKandidatliste
                    markerteLister={markerteLister}
                    lagredeLister={lagredeLister}
                    onKandidatlisteMarkert={onKandidatlisteMarkert}
                />
                <div className={css.knapper}>
                    <Button
                        variant="primary"
                        onClick={onLagreKandidater}
                        disabled={markerteLister.size === 0}
                        loading={lagreIKandidatlister.kind === 'laster-opp'}
                    >
                        Lagre
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Avbryt
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LagreKandidaterIMineKandidatlisterModal;
