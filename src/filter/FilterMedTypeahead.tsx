import React, { FunctionComponent, useEffect, useState } from 'react';
import { Forslagsfelt } from '../api/query/byggSuggestion';
import useSuggestions from '../hooks/useSuggestions';
import { kombinerStringsTilSearchParam } from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

type Props = {
    label: string;
    description?: string;
    suggestionField: Forslagsfelt;
    value: Set<string>;
    setValue: (value: string | null) => void;
};

const FilterMedTypeahead: FunctionComponent<Props> = ({
    label,
    description,
    suggestionField,
    value,
    setValue,
}) => {
    const valgteVerdier = Array.from(value);

    const [input, setInput] = useState<string>('');
    const forslag = useSuggestions(suggestionField, input);

    useEffect(() => {
        if (value.size === 0) {
            setInput('');
        }
    }, [value]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (value: string) => {
        setInput('');

        const verdiErAlleredeValgt = valgteVerdier.some(
            (y) => y.toLowerCase() === value.toLowerCase()
        );

        if (!verdiErAlleredeValgt) {
            valgteVerdier.push(value);
            setValue(kombinerStringsTilSearchParam(valgteVerdier));
        }
    };

    const onFjernValgtVerdi = (valgtVerdi: string) => () => {
        const alleVerdier = new Set(value);
        alleVerdier.delete(valgtVerdi);

        setValue(kombinerStringsTilSearchParam(Array.from(alleVerdier)));
    };

    return (
        <Typeahead
            label={label}
            description={description}
            value={input}
            suggestions={forslag.kind === 'suksess' ? forslag.data : []}
            selectedSuggestions={valgteVerdier}
            onRemoveSuggestion={onFjernValgtVerdi}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default FilterMedTypeahead;
