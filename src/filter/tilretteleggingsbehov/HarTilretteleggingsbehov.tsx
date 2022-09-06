import { Checkbox } from '@navikt/ds-react';
import React, { ChangeEventHandler, FunctionComponent } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';

const HarTilretteleggingsbehov: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange: ChangeEventHandler = () => {
        setSearchParam(
            FilterParam.HarTilretteleggingsbehov,
            søkekriterier.harTilretteleggingsbehov === true ? null : String(true)
        );
    };

    const checked = søkekriterier.harTilretteleggingsbehov || false;

    return (
        <Checkbox checked={checked} onChange={onChange}>
            Vis kun kandidater med tilretteleggingsbehov
        </Checkbox>
    );
};

export default HarTilretteleggingsbehov;
