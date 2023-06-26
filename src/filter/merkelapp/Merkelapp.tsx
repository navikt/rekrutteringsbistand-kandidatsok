import { FunctionComponent, ReactNode, useRef } from 'react';
import css from './Merkelapper.module.css';

type Props = {
    variant?: 'oransje';
    onClick: () => void;
    children: ReactNode;
    icon?: ReactNode;
    ariaLabel?: string;
};

const Merkelapp: FunctionComponent<Props> = ({ onClick, children, ariaLabel, icon, variant }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            type="button"
            aria-label={ariaLabel}
            className={css.merkelapp}
            data-variant={variant}
            title={typeof children === 'string' ? children : undefined}
        >
            <span>{children}</span>
            {icon}
        </button>
    );
};

export default Merkelapp;
