import { Checkbox } from '@navikt/ds-react';
import React, { ChangeEventHandler } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import filterCss from '../Filter.module.css';

const BorPåØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    if (søkekriterier.ønsketSted.size === 0) {
        return null;
    }

    const onChange: ChangeEventHandler = () => {
        setSearchParam(
            FilterParam.BorPåØnsketSted,
            søkekriterier.borPåØnsketSted === true ? null : String(true)
        );
    };

    const checked = søkekriterier.borPåØnsketSted || false;

    return (
        <Checkbox checked={checked} onChange={onChange} className={filterCss.borPåØnsketSted}>
            Kandidaten må også bo på stedet
        </Checkbox>
    );
};

export default BorPåØnsketSted;
