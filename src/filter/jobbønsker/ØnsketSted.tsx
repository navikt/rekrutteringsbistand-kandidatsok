import React, { useState } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { Typeahead } from '../typeahead/Typeahead';
import useGeografiSuggestions, { Geografiforslag } from '../../hooks/useGeografiSuggestions';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [input, setInput] = useState<string>('');
    const forslag = useGeografiSuggestions(input);

    const valgteSteder = Array.from(søkekriterier.ønsketSted).map((enkodet) =>
        hentGeografiFraUrl(enkodet)
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

    const onSelect = (selection: string) => {
        if (forslag.kind === 'suksess') {
            const korresponderendeForslag = forslag.data.find(
                (forslag) => forslag.geografiKodeTekst === selection
            );

            if (korresponderendeForslag) {
                const enkodetSted = enkodGeografiforslag(korresponderendeForslag);

                onSelectEnkodetSted(enkodetSted);
            }
        }
    };

    const onSelectEnkodetSted = (enkodetSted: string) => {
        setInput('');
        const oppdaterteSteder = [...valgteSteder.map(enkodGeografiforslag), enkodetSted];
        setSearchParam(FilterParam.ØnsketSted, oppdaterteSteder.join('_'));
    };

    const onFjernValgtSted = (valgtSted: string) => () => {
        const alleØnskedeSteder = [...valgteSteder]
            .filter((sted) => {
                return sted.geografiKodeTekst !== valgtSted;
            })
            .map(enkodGeografiforslag);

        setSearchParam(FilterParam.ØnsketSted, alleØnskedeSteder.join('_'));
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
            selectedSuggestions={valgteSteder.map((valgt) => valgt.geografiKodeTekst)}
            onRemoveSuggestion={onFjernValgtSted}
            onSelect={onSelect}
            onChange={onChange}
        />
    );
};

const enkodGeografiforslag = (korresponderendeForslag: Geografiforslag) => {
    return `${korresponderendeForslag.geografiKodeTekst}.${korresponderendeForslag.geografiKode}`;
};

const hentGeografiFraUrl = (enkodetIUrl: string): Geografiforslag => {
    const [sted, fylkeskode, kommunekode] = enkodetIUrl.split('.');

    return {
        geografiKode: fylkeskode + (kommunekode ? `.${kommunekode}` : ''),
        geografiKodeTekst: sted,
    };
};

export default ØnsketSted;
