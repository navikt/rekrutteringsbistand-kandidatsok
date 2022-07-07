import React, { FunctionComponent, useState } from 'react';
import { Search } from '@navikt/ds-react';
import { useSearchParams } from 'react-router-dom';

const Fritekstsøk: FunctionComponent = () => {
    const [, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState<string>('');

    const onSearchChange = (query: string) => {
        setQuery(query.trim());
    };

    const onSearchApply = () => {
        setSearchParams({
            q: query,
        });
    };

    return (
        <Search
            type="text"
            label="Søk på kandidat"
            description="F.eks navn, fødselsnummer eller yrke"
            onChange={onSearchChange}
            hideLabel={false}
        >
            <Search.Button onClick={onSearchApply} />
        </Search>
    );
};

export default Fritekstsøk;
