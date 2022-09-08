import React from 'react';
import { Checkbox } from '@navikt/ds-react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import FilterMedTypeahead from './FilterMedTypeahead';
import filterCss from './Filter.module.css';

const Arbeidserfaring = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const setArbeidserfaring = (value: string | null) => {
        setSearchParam(FilterParam.Arbeidserfaring, value);

        if (value === '') {
            setSearchParam(FilterParam.ArbeidserfaringErFersk, null);
        }
    };

    const onFerskArbeidserfaringChange = () => {
        setSearchParam(
            FilterParam.ArbeidserfaringErFersk,
            søkekriterier.arbeidserfaringErFersk === true ? null : String(true)
        );
    };

    const checked = søkekriterier.arbeidserfaringErFersk || false;

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
                <Checkbox
                    className={filterCss.arbeidserfaringErFersk}
                    checked={checked}
                    onChange={onFerskArbeidserfaringChange}
                    description="Gjennomført siste 2 år"
                >
                    Arbeidserfaringen må være fersk
                </Checkbox>
            )}
        </>
    );
};

export default Arbeidserfaring;
