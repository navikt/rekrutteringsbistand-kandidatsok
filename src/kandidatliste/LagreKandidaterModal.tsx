import { Button, Heading, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { lagreKandidaterIValgteKandidatlister } from '../api/api';
import { AddPerson } from '@navikt/ds-icons';
import VelgKandidatlister, { MineKandidatlister } from './VelgKandidatlister';
import { Kandidat } from '../Kandidat';
import SøkPåKandidatliste from './SøkPåKandidatliste';
import css from './LagreKandidaterModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
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
    const [lagredeLister, setLagredeLister] = useState<Set<string>>(new Set());
    const [mineKandidatlister, setMineKandidatlister] = useState<Nettressurs<MineKandidatlister>>({
        kind: 'ikke-lastet',
    });

    const [lagreIKandidatlister, setLagreIKandidatlister] = useState<
        Nettressurs<LagreKandidaterDto>
    >({
        kind: 'ikke-lastet',
    });

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
                    mineKandidatlister={mineKandidatlister}
                    setMineKandidatlister={setMineKandidatlister}
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
                        <AddPerson />
                        Lagre i lister
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Avbryt
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LagreKandidaterModal;
