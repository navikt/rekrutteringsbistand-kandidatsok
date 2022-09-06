import React from 'react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Førerkort = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.Førerkort, value);
    };

    return (
        <FilterMedTypeahead
            label="Førerkort"
            description="For eksempel: B - Personbil"
            suggestionField={Forslagsfelt.Førerkort}
            value={søkekriterier.førerkort}
            setValue={setValue}
        />
    );
};

export default Førerkort;
