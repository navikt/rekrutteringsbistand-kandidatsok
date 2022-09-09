import React, { useState } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import FilterMedTypeahead from '../FilterMedTypeahead';
import { Typeahead } from '../typeahead/Typeahead';
import useGeografiSuggestions from '../../hooks/useGeografiSuggestions';
import { it } from 'date-fns/locale';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');
    const forslag = useGeografiSuggestions(input);

    const setValue = (value: string | null) => {
        setSearchParam(FilterParam.ØnsketSted, value);
    };

    const suggestions =
        forslag.kind === 'suksess' ? forslag.data.map((sted) => sted.geografiKodeTekst) : [];

    return (
        <Typeahead
            label="Ønsket sted"
            description="Hvor ønsker kandidaten å jobbe?"
            value={input}
            suggestions={suggestions}
            selectedSuggestions={valgteVerdier}
            onRemoveSuggestion={onFjernValgtVerdi}
            onSelect={onSelect}
            onChange={onChange}
        />
        /*<FilterMedTypeahead
            label="Ønsket sted"
            description="Hvor ønsker kandidaten å jobbe?"
            suggestionField={Forslagsfelt.ØnsketSted}
            value={søkekriterier.ønsketSted}
            setValue={setValue}
        />*/
    );
};

export default ØnsketSted;
