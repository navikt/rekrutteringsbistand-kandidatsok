import { Close } from '@navikt/ds-icons';
import React, { FunctionComponent, ReactNode, useRef } from 'react';
import css from './Merkelapper.module.css';

type Props = {
    onClick: () => void;
    children: ReactNode;
};

const Merkelapp: FunctionComponent<Props> = ({ onClick, children }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            type="button"
            className={css.merkelapp}
            title={typeof children === 'string' ? children : undefined}
        >
            <span>{children}</span>
            <Close />
        </button>
    );
};

export default Merkelapp;
