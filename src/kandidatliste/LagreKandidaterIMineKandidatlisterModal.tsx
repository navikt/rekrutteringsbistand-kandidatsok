import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { lagreKandidaterIValgteKandidatlister } from '../api/api';
import VelgKandidatlister from './VelgKandidatlister';
import SøkPåKandidatliste from './SøkPåKandidatliste';
import css from './LagreKandidaterIMineKandidatlisterModal.module.css';
import { Kandidat } from '../kandidater/Kandidat';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
    kandidaterPåSiden: Kandidat[];
};

export type LagreKandidaterDto = Array<{
    kandidatnr: string;
}>;

const LagreKandidaterIMineKandidatlisterModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
    kandidaterPåSiden,
}) => {
    const [markerteLister, setMarkerteLister] = useState<Set<string>>(new Set());
    const [lagredeLister, setLagredeLister] = useState<Set<string>>(new Set());
    const [lagreIKandidatlister, setLagreIKandidatlister] = useState<
        Nettressurs<LagreKandidaterDto>
    >({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        setMarkerteLister(new Set());
        setLagredeLister(new Set());
        setLagreIKandidatlister({
            kind: 'ikke-lastet',
        });
    }, [markerteKandidater]);

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
        <Modal className={css.modal} open={vis} onClose={onClose}>
            <Heading size="medium" level="1">
                Lagre {markerteKandidater.size} kandidat
                {markerteKandidater.size === 1 ? '' : 'er'} i kandidatlister
            </Heading>
            <BodyLong>
                {oppsummerMarkerteKandidater(kandidaterPåSiden, markerteKandidater)}
            </BodyLong>
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
        </Modal>
    );
};

const oppsummerMarkerteKandidater = (
    kandidaterPåSiden: Kandidat[],
    markerteKandidater: Set<string>
) => {
    const noenMarkerteKandidatersNavn = kandidaterPåSiden
        .filter((kandidat) => markerteKandidater.has(kandidat.arenaKandidatnr))
        .map((kandidat) => `${kandidat.fornavn} ${kandidat.etternavn}`)
        .slice(0, 8);

    if (noenMarkerteKandidatersNavn.length < markerteKandidater.size) {
        const kommaseparerteNavn = noenMarkerteKandidatersNavn.join(', ');
        const antallKandidaterIkkeNevntMedNavn =
            markerteKandidater.size - noenMarkerteKandidatersNavn.length;

        return `${kommaseparerteNavn} og ${antallKandidaterIkkeNevntMedNavn} andre kandidater`;
    } else if (markerteKandidater.size === 1) {
        return `${noenMarkerteKandidatersNavn}`;
    } else {
        const sistemann = noenMarkerteKandidatersNavn.at(-1);
        const kommapseparerteNavnUtenomSistemann = noenMarkerteKandidatersNavn
            .slice(0, -1)
            .join(', ');

        return `${kommapseparerteNavnUtenomSistemann} og ${sistemann}.`;
    }
};

export default LagreKandidaterIMineKandidatlisterModal;
