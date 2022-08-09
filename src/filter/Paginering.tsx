import { Pagination } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { PAGE_SIZE } from '../api/query';
import { Param } from '../useRespons';
import useParams from './useParams';
import css from './Paginering.module.css';

type Props = {
    antallTreff: number;
};

const Paginering: FunctionComponent<Props> = ({ antallTreff }) => {
    const { searchParams, setSearchParam } = useParams();

    const antallSider = Math.ceil(antallTreff / PAGE_SIZE);
    const sidetallSomNumber = Number(searchParams.side);
    const sidetall = sidetallSomNumber || 1;

    const setSidetall = (nySide: number) => {
        setSearchParam(Param.Side, nySide > 1 ? String(nySide) : undefined);
        scrollTilToppen();
    };

    if (antallSider === 1) {
        return null;
    } else {
        return (
            <Pagination
                size="medium"
                className={css.wrapper}
                page={sidetall}
                onPageChange={setSidetall}
                count={antallSider}
            />
        );
    }
};

const scrollTilToppen = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

export default Paginering;
