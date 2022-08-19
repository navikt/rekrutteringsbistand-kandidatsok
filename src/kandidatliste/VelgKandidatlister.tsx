import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { CheckboxGroup, Loader, Pagination } from '@navikt/ds-react';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import useMineKandidatlister from './useMineKandidatlister';
import css from './LagreKandidaterModal.module.css';

type Props = {
    markerteLister: Set<string>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const pageSize = 8;

const VelgKandidatlister: FunctionComponent<Props> = ({
    markerteLister,
    lagredeLister,
    onKandidatlisteMarkert,
}) => {
    const [side, setSide] = useState<number>(1);
    const mineKandidatlister = useMineKandidatlister(side);

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
                    legend="Velg blant dine kandidatlister"
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
                    page={side}
                    className={css.paginering}
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
