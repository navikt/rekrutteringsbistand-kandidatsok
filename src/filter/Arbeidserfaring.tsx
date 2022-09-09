import React from 'react';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';

const Arbeidserfaring = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setArbeidserfaring = (value: string | null) => {
        setSearchParam(FilterParam.Arbeidserfaring, value);

        if (value === '') {
            setSearchParam(FilterParam.Ferskhet, null);
        }
    };

    const onFerskhetChange = (value: number | null) => {
        setSearchParam(FilterParam.Ferskhet, value === null ? null : String(value));
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
            {søkekriterier.arbeidserfaring.size > 0 && (
                <RadioGroup
                    value={søkekriterier.ferskhet}
                    onChange={onFerskhetChange}
                    legend="Hvor fersk må arbeidserfaringen være?"
                >
                    <Radio value={null}>Ingen krav</Radio>
                    <Radio value={2}>Siste to år</Radio>
                    <Radio value={4}>Siste fem år</Radio>
                </RadioGroup>
            )}
        </>
    );
};

export default Arbeidserfaring;
