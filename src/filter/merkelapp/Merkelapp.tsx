import { Close } from '@navikt/ds-icons';
import React, { FunctionComponent, ReactNode } from 'react';
import css from './Merkelapp.module.css';

type Props = {
    onClick: () => void;
    children: ReactNode;
};

const Merkelapp: FunctionComponent<Props> = ({ onClick, children }) => {
    return (
        <button onClick={onClick} type="button" className={css.merkelapp}>
            {children}
            <Close />
        </button>
    );
};

export default Merkelapp;
