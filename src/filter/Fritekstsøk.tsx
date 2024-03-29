import React, { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { Search } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [query, setQuery] = useState<string>(søkekriterier.fritekst || '');

    useEffect(() => {
        if (søkekriterier.fritekst === null) {
            setQuery('');
        }
    }, [søkekriterier]);

    const onSearchChange = (query: string) => {
        setQuery(query);
    };

    const onSearchApply = () => {
        setSearchParam(FilterParam.Fritekst, query.trim());
    };

    const onClear = () => {
        setSearchParam(FilterParam.Fritekst, null);
    };

    const onFormSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        onSearchApply();
    };

    return (
        <form role="search" onSubmit={onFormSubmit}>
            <Search
                type="text"
                value={query}
                className={css.søk}
                label="Søk etter kandidater"
                description="F.eks navn, fødselsnummer eller jobbønske"
                onChange={onSearchChange}
                onClear={onClear}
                hideLabel={false}
            />
        </form>
    );
};

export default Fritekstsøk;
