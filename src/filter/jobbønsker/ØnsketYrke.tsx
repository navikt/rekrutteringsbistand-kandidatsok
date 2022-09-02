import React, { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { Forslagsfelt } from '../../api/query/byggSuggestion';
import { FilterParam } from '../../hooks/useRespons';
import useSuggestions from '../../hooks/useSuggestions';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from '@reach/combobox';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const valgteYrker = Array.from(søkekriterier.ønsketYrke);
    const [ønsketYrke, setØnsketYrke] = useState<string>('');
    const forslag = useSuggestions(Forslagsfelt.ØnsketYrke, ønsketYrke);

    const forslagliste = forslag.kind === 'suksess' ? forslag.data : [];

    useEffect(() => {
        if (søkekriterier.ønsketYrke.size === 0) {
            setØnsketYrke('');
        }
    }, [søkekriterier]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setØnsketYrke(event.target.value);

    const onSelect = (value: string) => {
        const alleØnskedeYrker = new Set(søkekriterier.ønsketYrke);
        alleØnskedeYrker.add(value);

        setSearchParam(
            FilterParam.ØnsketYrke,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );

        setØnsketYrke('');
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        onSelect(ønsketYrke);
    };

    const onValgtYrkeClick = (valgtYrke: string) => () => {
        const alleØnskedeYrker = new Set(søkekriterier.ønsketYrke);
        alleØnskedeYrker.delete(valgtYrke);

        setSearchParam(
            FilterParam.ØnsketYrke,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <form onSubmit={onFormSubmit}>
            <Combobox aria-label="Ønsket yrke" onSelect={onSelect}>
                <ComboboxInput onChange={onChange} value={ønsketYrke} />
                <ComboboxPopover>
                    <ComboboxList>
                        {forslagliste.map((forslag) => (
                            <ComboboxOption key={forslag} value={forslag}>
                                <ComboboxOptionText />
                            </ComboboxOption>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            <Merkelapper>
                {valgteYrker.map((yrke) => (
                    <Merkelapp key={yrke} onClick={onValgtYrkeClick(yrke)}>
                        {yrke}
                    </Merkelapp>
                ))}
            </Merkelapper>
        </form>
    );
};

export default ØnsketYrke;
