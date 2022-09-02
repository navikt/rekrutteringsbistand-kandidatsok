import React, { FunctionComponent, useEffect, useState } from 'react';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useRespons';
import { Typeahead } from '../typeahead/Typeahead';
import useSuggestions from '../../hooks/useSuggestions';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const valgteYrker = Array.from(søkekriterier.ønsketYrke);
    const [ønsketYrke, setØnsketYrke] = useState<string>('');
    const forslag = useSuggestions(Forslagsfelt.ØnsketYrke, ønsketYrke);

    useEffect(() => {
        if (søkekriterier.ønsketYrke.size === 0) {
            setØnsketYrke('');
        }
    }, [søkekriterier]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setØnsketYrke(event.target.value);

    const onSelect = (value: string) => {
        setØnsketYrke('');

        const alleØnskedeYrker = new Set(søkekriterier.ønsketYrke);
        alleØnskedeYrker.add(value);

        setSearchParam(
            FilterParam.ØnsketYrke,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onFjernValgtYrke = (valgtYrke: string) => () => {
        const alleØnskedeYrker = new Set(søkekriterier.ønsketYrke);
        alleØnskedeYrker.delete(valgtYrke);

        setSearchParam(
            FilterParam.ØnsketYrke,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <Typeahead
            label="Ønsket yrke"
            value={ønsketYrke}
            suggestions={forslag.kind === 'suksess' ? forslag.data : []}
            selectedSuggestions={valgteYrker}
            onRemoveSuggestion={onFjernValgtYrke}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default ØnsketYrke;
