import { Checkbox } from '@navikt/ds-react';
import { ChangeEventHandler, useEffect } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import filterCss from '../Filter.module.css';

const BorPåØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    useEffect(() => {
        if (søkekriterier.ønsketSted.size === 0 && søkekriterier.borPåØnsketSted) {
            setSearchParam(FilterParam.BorPåØnsketSted, null);
        }
    }, [søkekriterier.ønsketSted, søkekriterier.borPåØnsketSted, setSearchParam]);

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
