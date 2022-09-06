import React from 'react';
import { FilterParam } from '../../hooks/useRespons';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.ØnsketSted, value);
    };

    return (
        <FilterMedTypeahead
            label="Ønsket sted"
            description="Hvor ønsker kandidaten å jobbe?"
            suggestionField={Forslagsfelt.ØnsketSted}
            value={søkekriterier.ønsketSted}
            setValue={setValue}
        />
    );
};

export default ØnsketSted;
