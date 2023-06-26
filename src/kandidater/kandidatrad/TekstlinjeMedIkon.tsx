import { BodyLong } from '@navikt/ds-react';
import { FunctionComponent, ReactNode } from 'react';
import css from './TekstlinjeMedIkon.module.css';

type Props = {
    ikon: ReactNode;
    tekst: string;
    label?: string;
    className?: string;
};

const TekstlinjeMedIkon: FunctionComponent<Props> = ({ ikon, tekst, label, className }) => {
    const cls = css.linje + (className ? ' ' + className : '');

    return (
        <div title={label} className={cls}>
            {ikon}
            <BodyLong className={css.tekst}>{tekst}</BodyLong>
        </div>
    );
};

export default TekstlinjeMedIkon;
