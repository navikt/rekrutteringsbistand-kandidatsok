import React, { useEffect, useState } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { Typeahead } from '../typeahead/Typeahead';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import useSuggestions from '../../hooks/useSuggestions';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const valgteSteder = Array.from(søkekriterier.ønsketSted);
    const [ønsketSted, setØnsketSted] = useState<string>('');
    const forslag = useSuggestions(Forslagsfelt.ØnsketSted, ønsketSted);

    useEffect(() => {
        if (søkekriterier.ønsketSted === null) {
            setØnsketSted('');
        }
    }, [søkekriterier]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setØnsketSted(event.target.value);

    const onSelect = (value: string) => {
        setØnsketSted('');

        const alleØnskedeSteder = Array.from(søkekriterier.ønsketSted);
        const stedErAlleredeValgt = alleØnskedeSteder.some(
            (y) => y.toLowerCase() === value.toLowerCase()
        );

        if (!stedErAlleredeValgt) {
            alleØnskedeSteder.push(value);
            setSearchParam(
                FilterParam.ØnsketSted,
                alleØnskedeSteder.join(LISTEPARAMETER_SEPARATOR)
            );
        }
    };

    const onFjernValgtSted = (valgtSted: string) => () => {
        const alleØnskedeSteder = new Set(søkekriterier.ønsketSted);
        alleØnskedeSteder.delete(valgtSted);

        setSearchParam(
            FilterParam.ØnsketSted,
            Array.from(alleØnskedeSteder).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <Typeahead
            label="Ønsket sted"
            description="Hvor ønsker kandidaten å jobbe?"
            value={ønsketSted}
            suggestions={forslag.kind === 'suksess' ? forslag.data : []}
            selectedSuggestions={valgteSteder}
            onRemoveSuggestion={onFjernValgtSted}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default ØnsketSted;
