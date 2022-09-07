import React, { useEffect, useState } from 'react';
import { Klasse } from '../api/query/queryMedFørerkort';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

type Førerkortklasse = {
    klasse: Klasse;
    kode: string;
    navn: string;
};

const alleKlasser: Førerkortklasse[] = Object.values(Klasse).map((esValue) => {
    const [kode, navn] = esValue.split(' - ');

    return {
        klasse: esValue,
        kode,
        navn,
    };
});

const Førerkort = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [forslag, setForslag] = useState<string[]>([]);

    const [input, setInput] = useState<string>('');

    useEffect(() => {
        if (input.length > 0) {
            const klasser = alleKlasser
                .filter(klasseInneholderInput(input))
                .map((klasse) => klasse.klasse);

            setForslag(klasser);
        }
    }, [input]);

    const setValue = (valgteKlasser: Set<Klasse>) => {
        setSearchParam(
            FilterParam.Førerkort,
            Array.from(valgteKlasser).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onSelect = (klasse: string) => {
        setInput('');

        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.add(klasse as Klasse);
        setValue(valgteKlasser);
    };

    const onFjernValgtKlasse = (valgtKlasse: string) => () => {
        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.delete(valgtKlasse as Klasse);

        setValue(valgteKlasser);
    };

    return (
        <Typeahead
            label="Førerkort"
            description={`For eksempel "Personbil"`}
            value={input}
            suggestions={forslag}
            selectedSuggestions={Array.from(søkekriterier.førerkort)}
            onRemoveSuggestion={onFjernValgtKlasse}
            onSelect={onSelect}
            onChange={(event) => setInput(event.target.value)}
            allowUnmatchedInputs={false}
        />
    );
};

const klasseInneholderInput =
    (input: string) =>
    ({ klasse }: Førerkortklasse) => {
        const inputWords = input.toLowerCase().split(' ');

        return inputWords.every((inputWord) => klasse.toLowerCase().includes(inputWord));
    };

export default Førerkort;
