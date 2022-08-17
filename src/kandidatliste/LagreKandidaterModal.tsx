import { Button, Checkbox, CheckboxGroup, Heading, Loader, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { hentMineKandidatlister } from '../api/api';
import css from './LagreKandidaterModal.module.css';
import { Link } from 'react-router-dom';
import { AddPerson, Close, ExternalLink } from '@navikt/ds-icons';

type Props = {
    vis: boolean;
    onClose: () => void;
};

export type MineKandidatlister = {
    liste: Kandidatliste[];
    antall: number;
};

type Kandidatliste = {
    kandidatlisteId: string;
    tittel: string;
    organisasjonNavn: string | null;
    antallKandidater: number;
};

type LagreKandidaterDto = [
    {
        kandidatnr: string;
    }
];

const LagreKandidaterModal: FunctionComponent<Props> = ({ vis, onClose }) => {
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
        setMarkerteLister(new Set());
    };

    return (
        <Modal closeButton open={vis} onClose={onClose}>
            <div className={css.innhold}>
                <Heading size="medium" level="1">
                    Lagre kandidater
                </Heading>
                {mineKandidatlister.kind === 'laster-inn' && <Loader />}
                {mineKandidatlister.kind === 'suksess' && (
                    <CheckboxGroup
                        className={css.liste}
                        legend="Velg kandidatlister"
                        value={Array.from(markerteLister)}
                    >
                        {mineKandidatlister.data.liste.map(
                            ({ kandidatlisteId, tittel, antallKandidater }) => {
                                return (
                                    <div className={css.kandidatliste}>
                                        <Checkbox
                                            value={kandidatlisteId}
                                            onChange={onKandidatlisteMarkert}
                                        >
                                            <span>
                                                {tittel} ({antallKandidater} kandidater)
                                            </span>
                                        </Checkbox>
                                        <Link
                                            target="_blank"
                                            to={lenkeTilKandidatliste(kandidatlisteId)}
                                            aria-label="Lenke til kandidatliste"
                                            className="navds-link"
                                        >
                                            <ExternalLink />
                                        </Link>
                                    </div>
                                );
                            }
                        )}
                    </CheckboxGroup>
                )}
                <Button
                    variant="primary"
                    size="small"
                    onClick={onLagreKandidater}
                    className={css.lagreKandidaterKnapp}
                    disabled={markerteLister.size === 0}
                >
                    <AddPerson />
                    Lagre i lister
                </Button>
                <Button variant="secondary" size="small" onClick={onClose}>
                    <Close />
                    Avbryt
                </Button>
            </div>
        </Modal>
    );
};

const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/kandidatliste/${kandidatlisteId}`;

export default LagreKandidaterModal;
