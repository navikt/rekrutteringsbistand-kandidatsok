import { Button, Checkbox, Heading, Loader, Modal } from '@navikt/ds-react';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { hentMineKandidatlister } from '../api/api';
import css from './LagreKandidaterModal.module.css';
import { Link } from 'react-router-dom';

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
        const erMarkert = event.target.checked;
        console.log('kand:', kandidatlisteId, erMarkert);

        const nyMarkering = new Set(markerteLister);

        if (erMarkert) {
            nyMarkering.add(kandidatlisteId);
        } else {
            nyMarkering.delete(kandidatlisteId);
        }

        setMarkerteLister(nyMarkering);
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
                    <ul className={css.liste}>
                        {mineKandidatlister.data.liste.map((kandidatliste) => (
                            <li className={css.kandidatliste} key={kandidatliste.kandidatlisteId}>
                                <Checkbox
                                    hideLabel
                                    value={kandidatliste.kandidatlisteId}
                                    checked={markerteLister.has(kandidatliste.kandidatlisteId)}
                                    onChange={onKandidatlisteMarkert}
                                >
                                    {kandidatliste.tittel}
                                </Checkbox>
                                <Link
                                    to={lenkeTilKandidatliste(kandidatliste)}
                                    className="navds-link"
                                >
                                    {kandidatliste.tittel}
                                </Link>
                                <span>{kandidatliste.antallKandidater} kandidater</span>
                            </li>
                        ))}
                    </ul>
                )}
                <Button
                    variant="primary"
                    size="small"
                    onClick={onLagreKandidater}
                    className={css.lagreKandidaterKnapp}
                    disabled={markerteLister.size === 0}
                >
                    Lagre i {markerteLister.size || ''} lister
                </Button>
                <Button variant="secondary" size="small" onClick={onClose}>
                    Avbryt
                </Button>
            </div>
        </Modal>
    );
};

const lenkeTilKandidatliste = (kandidatliste: Kandidatliste) =>
    `/kandidater/kandidatliste/${kandidatliste.kandidatlisteId}`;

export default LagreKandidaterModal;
