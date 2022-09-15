import React, { useState } from 'react';
// import useSøkekriterier from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

const VelgKontor = () => {
    // const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    return (
        <Typeahead
            label="Velg kontor"
            description="For eksempel «NAV Kristiansand»"
            value={input}
            suggestions={[]}
            selectedSuggestions={[]}
            onRemoveSuggestion={(suggestion: string) => () => {}}
            onSelect={() => {}}
            onChange={onChange}
        />
    );
};

export default VelgKontor;
