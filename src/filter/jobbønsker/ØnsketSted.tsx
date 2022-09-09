import React, { useState } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { Typeahead } from '../typeahead/Typeahead';
import useGeografiSuggestions, { Geografiforslag } from '../../hooks/useGeografiSuggestions';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');
    const forslag = useGeografiSuggestions(input);

    const valgteSteder = Array.from(søkekriterier.ønsketSted).map(
        (enkodet) => hentGeografiFraUrl(enkodet).geografiKodeTekst
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        if (forslag.kind === 'suksess') {
            const korresponderendeForslag = forslag.data.find(
                (forslag) => forslag.geografiKodeTekst === selection
            );

            if (korresponderendeForslag) {
                const enkodetSted = `${korresponderendeForslag.geografiKodeTekst}.${korresponderendeForslag.geografiKode}`;

                onSelectEnkodetSted(enkodetSted);
            }
        }
    };

    const onSelectEnkodetSted = (enkodetSted: string) => {
        setInput('');

        const oppdaterteSteder = [...valgteSteder, enkodetSted];
        setSearchParam(FilterParam.ØnsketSted, oppdaterteSteder.join('_'));
    };

    const onFjernValgtSted = (valgtSted: string) => () => {
        const alleØnskedeSteder = new Set(valgteSteder);
        alleØnskedeSteder.delete(valgtSted);

        setSearchParam(FilterParam.ØnsketSted, Array.from(alleØnskedeSteder).join('_'));
    };

    const suggestions =
        forslag.kind === 'suksess' ? forslag.data.map((sted) => sted.geografiKodeTekst) : [];

    return (
        <Typeahead
            label="Ønsket sted"
            description="Hvor ønsker kandidaten å jobbe?"
            allowUnmatchedInputs={false}
            value={input}
            suggestions={suggestions}
            selectedSuggestions={valgteSteder}
            onRemoveSuggestion={onFjernValgtSted}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

const hentGeografiFraUrl = (enkodetIUrl: string): Geografiforslag => {
    const [sted, fylkeskode, kommunekode] = enkodetIUrl.split('.');

    return {
        geografiKode: fylkeskode + (kommunekode ? `.${kommunekode}` : ''),
        geografiKodeTekst: sted,
    };
};

export default ØnsketSted;
