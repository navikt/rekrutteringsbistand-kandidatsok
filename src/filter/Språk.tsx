import React from 'react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Språk = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.Språk, value);
    };

    return (
        <FilterMedTypeahead
            label="Språk"
            description="For eksempel «norsk»"
            suggestionField={Forslagsfelt.Språk}
            value={søkekriterier.språk}
            setValue={setValue}
        />
    );
};

export default Språk;
