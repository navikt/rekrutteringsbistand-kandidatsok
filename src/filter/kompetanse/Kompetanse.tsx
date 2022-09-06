import React, { useEffect, useState } from 'react';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useRespons';
import useSuggestions from '../../hooks/useSuggestions';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import { Typeahead } from '../typeahead/Typeahead';

const Kompetanse = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const valgtKompetanse = Array.from(søkekriterier.kompetanse);
    const [kompetanse, setKompetanse] = useState<string>('');
    const forslag = useSuggestions(Forslagsfelt.Kompetanse, kompetanse);

    useEffect(() => {
        if (søkekriterier.kompetanse.size === 0) {
            setKompetanse('');
        }
    }, [søkekriterier]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setKompetanse(event.target.value);

    const onSelect = (value: string) => {
        setKompetanse('');

        const allKompetanse = Array.from(søkekriterier.kompetanse);
        const kompetanseErAlleredeValgt = allKompetanse.some(
            (y) => y.toLowerCase() === value.toLowerCase()
        );

        if (!kompetanseErAlleredeValgt) {
            allKompetanse.push(value);
            setSearchParam(FilterParam.Kompetanse, allKompetanse.join(LISTEPARAMETER_SEPARATOR));
        }
    };

    const onFjernValgtKompetanse = (valgtYrke: string) => () => {
        const alleØnskedeYrker = new Set(søkekriterier.kompetanse);
        alleØnskedeYrker.delete(valgtYrke);

        setSearchParam(
            FilterParam.Kompetanse,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <Typeahead
            label="Kompetanse"
            description="For eksempel fagbrev, sertifisering, ferdigheter eller programmer"
            value={kompetanse}
            suggestions={forslag.kind === 'suksess' ? forslag.data : []}
            selectedSuggestions={valgtKompetanse}
            onRemoveSuggestion={onFjernValgtKompetanse}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

export default Kompetanse;
