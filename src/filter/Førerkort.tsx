import React, { useEffect, useState } from 'react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Typeahead } from './typeahead/Typeahead';

type Førerkortklasse = {
    kode: string;
    tekst: string;
    kodeOgTekst: string;
};

const alleKlasser: Førerkortklasse[] = [
    { kode: 'B', tekst: 'Personbil' },
    { kode: 'BE', tekst: 'Personbil med tilhenger' },
    { kode: 'C', tekst: 'Lastebil' },
    { kode: 'CE', tekst: 'Lastebil med tilhenger' },
    { kode: 'C1', tekst: 'Lett lastebil' },
    { kode: 'C1E', tekst: 'Lett lastebil med tilhenger' },
    { kode: 'D', tekst: 'Buss' },
    { kode: 'DE', tekst: 'Buss med tilhenger' },
    { kode: 'D1', tekst: 'Minibuss' },
    { kode: 'D1E', tekst: 'Minibuss med tilhenger' },
    { kode: 'A', tekst: 'Tung motorsykkel' },
    { kode: 'A1', tekst: 'Lett motorsykkel' },
    { kode: 'A2', tekst: 'Mellomtung motorsykkel' },
    { kode: 'AM', tekst: 'Moped' },
    { kode: 'T', tekst: 'Traktor' },
    { kode: 'S', tekst: 'Snøscooter' },
].map(({ kode, tekst }) => ({
    kode,
    tekst,
    kodeOgTekst: `${kode} - ${tekst}`,
}));

const Førerkort = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [forslag, setForslag] = useState<string[]>([]);

    const [input, setInput] = useState<string>('');

    useEffect(() => {
        if (input.length > 0) {
            const klasser = alleKlasser
                .filter(klasseInneholderInput(input))
                .map((klasse) => klasse.kodeOgTekst);

            setForslag(klasser);
        }
    }, [input]);

    const setValue = (valgteKlasser: Set<string>) => {
        setSearchParam(
            FilterParam.Førerkort,
            Array.from(valgteKlasser).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    const onSelect = (klasse: string) => {
        setInput('');

        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.add(klasse);
        setValue(valgteKlasser);
    };

    const onFjernValgtKlasse = (valgtKlasse: string) => () => {
        const valgteKlasser = new Set(søkekriterier.førerkort);
        valgteKlasser.delete(valgtKlasse);

        setValue(valgteKlasser);
    };

    return (
        <Typeahead
            label="Førerkort"
            description={`For eksempel "B – personbil"`}
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
    ({ kode, tekst, kodeOgTekst }: Førerkortklasse) => {
        const inputWords = input.toLowerCase().split(' ');

        return inputWords.every((inputWord) => kodeOgTekst.toLowerCase().includes(inputWord));
    };

export default Førerkort;
