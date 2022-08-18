import React, { ChangeEvent, FunctionComponent, useEffect } from 'react';
import { CheckboxGroup, Loader } from '@navikt/ds-react';
import { hentMineKandidatlister } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from './LagreKandidaterModal';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import css from './LagreKandidaterModal.module.css';

type Props = {
    markerteLister: Set<string>;
    markerteKandidater: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
    mineKandidatlister: Nettressurs<MineKandidatlister>;
    setMineKandidatlister: (mineKandidatlister: Nettressurs<MineKandidatlister>) => void;
};

export type MineKandidatlister = {
    liste: Kandidatliste[];
    antall: number;
};

const VelgKandidatlister: FunctionComponent<Props> = ({
    markerteLister,
    markerteKandidater,
    onKandidatlisteMarkert,
    mineKandidatlister,
    setMineKandidatlister,
}) => {
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

        lastInnKandidatlister();
    }, [setMineKandidatlister]);

    if (mineKandidatlister.kind === 'laster-inn') {
        return <Loader />;
    } else if (mineKandidatlister.kind === 'suksess') {
        return (
            <CheckboxGroup
                className={css.liste}
                legend="Velg kandidatlister"
                value={Array.from(markerteLister)}
            >
                {mineKandidatlister.data.liste.map((kandidatliste) => (
                    <VelgbarKandidatliste
                        key={kandidatliste.kandidatlisteId}
                        kandidatliste={kandidatliste}
                        markerteKandidater={markerteKandidater}
                        onKandidatlisteMarkert={onKandidatlisteMarkert}
                    />
                ))}
            </CheckboxGroup>
        );
    } else {
        return null;
    }
};

export default VelgKandidatlister;
