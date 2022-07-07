import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from '@navikt/ds-react';

const Fritekstsøk: FunctionComponent = () => {
    const history = useHistory();
    const [query, setQuery] = useState<string>('');

    const onSearchChange = (query: string) => {
        setQuery(query.trim());
    };

    const onSearchApply = () => {
        history.replace({
            search: query ? `?q=${query}` : '',
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
