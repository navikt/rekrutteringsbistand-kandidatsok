import { BodyLong } from '@navikt/ds-react';
import React, { FunctionComponent, ReactNode } from 'react';
import css from './Kandidatinfo.module.css';

type Props = {
    ikon: ReactNode;
    tekst: string;
    label?: string;
};

const Kandidatinfo: FunctionComponent<Props> = ({ ikon, tekst, label }) => {
    return (
        <div title={label} className={css.info}>
            {ikon}
            <BodyLong className={css.tekst}>{tekst}</BodyLong>
        </div>
    );
};

export default Kandidatinfo;
