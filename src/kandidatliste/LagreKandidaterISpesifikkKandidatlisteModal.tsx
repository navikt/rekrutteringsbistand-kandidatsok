import { BodyLong, Button, Heading, Loader, Modal } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { lagreKandidaterIKandidatliste } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import {
    Kandidatliste,
    KontekstAvKandidatlisteEllerStilling,
} from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { LagreKandidaterDto } from './LagreKandidaterIMineKandidatlisterModal';
import css from './LagreKandidaterISpesifikkKandidatlisteModal.module.css';

type Props = {
    vis: boolean;
    onClose: () => void;
    markerteKandidater: Set<string>;
    kontekstAvKandidatlisteEllerStilling: KontekstAvKandidatlisteEllerStilling;
    onSuksess: (kandidatliste: Kandidatliste) => void;
};

const LagreKandidaterISpesifikkKandidatlisteModal: FunctionComponent<Props> = ({
    vis,
    onClose,
    markerteKandidater,
    kontekstAvKandidatlisteEllerStilling,
    onSuksess,
}) => {
    const [lagreKandidater, setLagreKandidater] = useState<Nettressurs<LagreKandidaterDto>>({
        kind: 'ikke-lastet',
    });

    const onBekreftClick = (kandidatlisteId: string) => async () => {
        const lagreKandidaterDto = Array.from(markerteKandidater).map((kandidat) => ({
            kandidatnr: kandidat,
        }));

        setLagreKandidater({ kind: 'laster-opp', data: lagreKandidaterDto });

        try {
            const oppdatertKandidatliste = await lagreKandidaterIKandidatliste(
                lagreKandidaterDto,
                kandidatlisteId
            );

            setLagreKandidater({ kind: 'suksess', data: lagreKandidaterDto });
            onSuksess(oppdatertKandidatliste);
            onClose();
        } catch (e) {
            setLagreKandidater({
                kind: 'feil',
                error: typeof e === 'string' ? e : String(e),
            });
        }
    };

    return (
        <Modal open={vis} onClose={onClose} closeButton={false}>
            <div className={css.innhold}>
                <Heading level="1" size="medium">
                    Lagre {markerteKandidater.size} kandidat
                    {markerteKandidater.size > 1 ? 'er' : ''} i kandidatlisten
                </Heading>
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind === 'laster-inn' && (
                    <Loader />
                )}
                {kontekstAvKandidatlisteEllerStilling.kandidatliste.kind === 'suksess' && (
                    <>
                        <BodyLong className={css.beskrivelse}>
                            Ønsker du å lagre kandidaten i kandidatlisten til stillingen «
                            {kontekstAvKandidatlisteEllerStilling.kandidatliste.data.tittel}»?
                        </BodyLong>
                        <div className={css.knapper}>
                            <Button
                                variant="primary"
                                onClick={onBekreftClick(
                                    kontekstAvKandidatlisteEllerStilling.kandidatliste.data
                                        .kandidatlisteId
                                )}
                            >
                                Lagre
                            </Button>
                            <Button
                                variant="tertiary"
                                loading={lagreKandidater.kind === 'laster-opp'}
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Avbryt
                            </Button>
                        </div>
                    </>
                )}
                {lagreKandidater.kind === 'feil' && <BodyLong>{lagreKandidater.error}</BodyLong>}
            </div>
        </Modal>
    );
};

export default LagreKandidaterISpesifikkKandidatlisteModal;
