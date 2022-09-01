import React, { FunctionComponent, ReactNode } from 'react';
import css from './Merkelapp.module.css';

type Props = {
    children: ReactNode;
};

const Merkelapper: FunctionComponent<Props> = ({ children }) => {
    return <div className={css.merkelapper}>{children}</div>;
};

export default Merkelapper;
