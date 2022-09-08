import React from 'react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Arbeidserfaring = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setArbeidserfaring = (value: string | null) => {
        setSearchParam(FilterParam.Arbeidserfaring, value);
    };

    return (
        <>
            <FilterMedTypeahead
                label="Arbeidserfaring"
                description={`For eksempel "barnehagelærer"`}
                suggestionField={Forslagsfelt.Arbeidserfaring}
                value={søkekriterier.arbeidserfaring}
                setValue={setArbeidserfaring}
            />
        </>
    );
};

export default Arbeidserfaring;
