import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { Button, CheckboxGroup, Loader, Pagination } from '@navikt/ds-react';
import { hentMineKandidatlister } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from './LagreKandidaterModal';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import css from './LagreKandidaterModal.module.css';
import { Download, Refresh, Upload } from '@navikt/ds-icons';

type Props = {
    markerteLister: Set<string>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
    mineKandidatlister: Nettressurs<MineKandidatlister>;
    setMineKandidatlister: (mineKandidatlister: Nettressurs<MineKandidatlister>) => void;
};

export type MineKandidatlister = {
    liste: Omit<Kandidatliste, 'kandidater'>[];
    antall: number;
};

const pageSize = 5;

const VelgKandidatlister: FunctionComponent<Props> = ({
    markerteLister,
    lagredeLister,
    onKandidatlisteMarkert,
    mineKandidatlister,
    setMineKandidatlister,
}) => {
    const [side, setSide] = useState<number>(1);

    useEffect(() => {
        const lastInnKandidatlister = async () => {
            setMineKandidatlister(
                mineKandidatlister.kind === 'suksess'
                    ? { kind: 'oppdaterer', data: mineKandidatlister.data }
                    : {
                          kind: 'laster-inn',
                      }
            );

            try {
                const nesteSideMedLister = await hentMineKandidatlister(side, pageSize);

                if (mineKandidatlister.kind === 'oppdaterer') {
                    const alleLister = {
                        ...nesteSideMedLister,
                        liste: [...mineKandidatlister.data.liste, ...nesteSideMedLister.liste],
                    };

                    setMineKandidatlister({
                        kind: 'suksess',
                        data: alleLister,
                    });
                } else {
                    setMineKandidatlister({
                        kind: 'suksess',
                        data: nesteSideMedLister,
                    });
                }
            } catch (e) {
                setMineKandidatlister({
                    kind: 'feil',
                    error: e as string,
                });
            }
        };

        lastInnKandidatlister();

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [setMineKandidatlister, side]);

    const hentFlereKandidatlister = (side: number) => {
        setSide(side);
    };

    if (mineKandidatlister.kind === 'laster-inn') {
        return <Loader />;
    } else if (mineKandidatlister.kind === 'suksess' || mineKandidatlister.kind === 'oppdaterer') {
        return (
            <div className={css.velgKandidatlister}>
                <CheckboxGroup
                    className={css.liste}
                    legend="Velg kandidatlister"
                    value={Array.from(markerteLister)}
                >
                    {mineKandidatlister.data.liste.map((kandidatliste) => (
                        <VelgbarKandidatliste
                            key={kandidatliste.kandidatlisteId}
                            kandidatliste={kandidatliste}
                            lagredeLister={lagredeLister}
                            onKandidatlisteMarkert={onKandidatlisteMarkert}
                        />
                    ))}
                </CheckboxGroup>
                <Pagination
                    size="small"
                    page={side}
                    onPageChange={hentFlereKandidatlister}
                    count={Math.floor(mineKandidatlister.data.antall / pageSize)}
                />
            </div>
        );
    } else {
        return null;
    }
};

export default VelgKandidatlister;
