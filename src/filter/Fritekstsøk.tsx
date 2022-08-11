import React, { FunctionComponent, useState } from 'react';
import { Search } from '@navikt/ds-react';
import useParams from './useParams';
import { Param } from '../useRespons';
import css from './Fritekstsøk.module.css';

const Fritekstsøk: FunctionComponent = () => {
    const { searchParams, setSearchParam } = useParams();
    const [query, setQuery] = useState<string>(searchParams[Param.Fritekst] || '');

    const onSearchChange = (query: string) => {
        setQuery(query.trim());
    };

    const onSearchApply = () => {
        setSearchParam(Param.Fritekst, query);
    };

    const onClear = () => {
        setSearchParam(Param.Fritekst, undefined);
    };

    return (
        <Search
            type="text"
            value={query}
            className={css.beskrivelse}
            label="Søk etter kandidater"
            description="F.eks navn, fødselsnummer eller jobbønske"
            onChange={onSearchChange}
            onClear={onClear}
            hideLabel={false}
        >
            <Search.Button onClick={onSearchApply} />
        </Search>
    );
};

export default Fritekstsøk;
