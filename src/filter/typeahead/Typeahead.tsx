import { Search } from '@navikt/ds-icons';
import {
    Combobox,
    ComboboxInput,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
    ComboboxPopover,
} from '@reach/combobox';
import React, { FormEventHandler, FunctionComponent, ReactNode } from 'react';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';
import css from './Typeahead.module.css';

type Props = {
    children?: ReactNode;
    value: string;
    label: string;
    suggestions: string[];
    selectedSuggestions: string[];
    onRemoveSuggestion: (suggestion: string) => () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (selection: string) => void;
};

export const Typeahead: FunctionComponent<Props> = ({
    label,
    value,
    suggestions,
    selectedSuggestions,
    onRemoveSuggestion,
    onSelect,
    onChange,
}) => {
    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const matchedSuggestion = suggestions.find(
            (suggestion) => value.toLowerCase() === suggestion.toLowerCase()
        );

        if (matchedSuggestion) {
            onSelect(matchedSuggestion);
        } else {
            onSelect(uppercaseFirstLetter(value));
        }
    };

    const suggestionsWithoutSelected = suggestions.filter(
        (suggestion) => !selectedSuggestions.includes(suggestion)
    );

    return (
        <form onSubmit={onSubmit}>
            <Combobox className="navds-search__wrapper" aria-label={label} onSelect={onSelect}>
                <div className="navds-search__wrapper-inner">
                    <ComboboxInput
                        className="navds-search__input navds-search__input--secondary navds-text-field__input navds-body-short navds-body-medium"
                        onChange={onChange}
                        value={value}
                    />
                </div>
                <button className="navds-search__button-search navds-button navds-button--secondary navds-button--medium navds-button--icon-only">
                    <span className="navds-button__icon">
                        <Search />
                    </span>
                </button>

                {suggestionsWithoutSelected.length > 0 && (
                    <ComboboxPopover className={css.suggestionPopover}>
                        <ComboboxList>
                            {suggestionsWithoutSelected.map((suggestion) => (
                                <ComboboxOption
                                    key={suggestion}
                                    value={suggestion}
                                    className={'navds-body-short ' + css.suggestion}
                                >
                                    <ComboboxOptionText />
                                </ComboboxOption>
                            ))}
                        </ComboboxList>
                    </ComboboxPopover>
                )}
            </Combobox>

            <Merkelapper>
                {selectedSuggestions.map((suggestion) => (
                    <Merkelapp key={suggestion} onClick={onRemoveSuggestion(suggestion)}>
                        {suggestion}
                    </Merkelapp>
                ))}
            </Merkelapper>
        </form>
    );
};

const uppercaseFirstLetter = (s: string) => {
    return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
};
