import { BodyLong } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';
import css from './TekstlinjeMedIkon.module.css';

type Props = {
    ikon: ReactNode;
    tekst: string;
    label?: string;
};

const TekstlinjeMedIkon: FunctionComponent<Props> = ({ ikon, tekst, label }) => {
    return (
        <div title={label} className={css.linje}>
            {ikon}
            <BodyLong className={css.tekst}>{tekst}</BodyLong>
        </div>
    );
};

export default TekstlinjeMedIkon;
