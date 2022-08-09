import React, { FunctionComponent, useState } from 'react';
import { Search } from '@navikt/ds-react';
import useParams from './useParams';
import { Param } from '../useRespons';

const Fritekstsøk: FunctionComponent = () => {
    const { setSearchParam } = useParams();
    const [query, setQuery] = useState<string>('');

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
            label="Søk på kandidat"
            description="F.eks navn, fødselsnummer eller yrke"
            onChange={onSearchChange}
            onClear={onClear}
            hideLabel={false}
        >
            <Search.Button onClick={onSearchApply} />
        </Search>
    );
};

export default Fritekstsøk;
