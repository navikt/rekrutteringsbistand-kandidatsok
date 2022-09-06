import React, { FunctionComponent } from 'react';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.ØnsketYrke, value);
    };

    return (
        <FilterMedTypeahead
            label="Ønsket yrke"
            description="Hva ønsker kandidaten å jobbe med?"
            suggestionField={Forslagsfelt.ØnsketYrke}
            value={søkekriterier.ønsketYrke}
            setValue={setValue}
        />
    );
};

export default ØnsketYrke;
