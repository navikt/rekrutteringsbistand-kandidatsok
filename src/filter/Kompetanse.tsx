import React from 'react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Kompetanse = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.Kompetanse, value);
    };

    return (
        <FilterMedTypeahead
            label="Kompetanse"
            description="For eksempel fagbrev, sertifisering, ferdigheter eller programmer"
            suggestionField={Forslagsfelt.Kompetanse}
            value={søkekriterier.kompetanse}
            setValue={setValue}
        />
    );
};

export default Kompetanse;
