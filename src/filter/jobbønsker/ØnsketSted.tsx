import React, { FormEventHandler, useEffect, useState } from 'react';
import { Search } from '@navikt/ds-react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';

const ØnsketSted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const [ønsketSted, setØnsketSted] = useState<string | null>(søkekriterier.ønsketSted);

    useEffect(() => {
        if (søkekriterier.ønsketSted === null) {
            setØnsketSted(null);
        }
    }, [søkekriterier]);

    const onChange = (tekst: string) => {
        setØnsketSted(tekst || null);
    };

    const onClear = () => {
        setSearchParam(FilterParam.ØnsketSted, null);
    };

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setSearchParam(FilterParam.ØnsketSted, ønsketSted);
    };

    return (
        <form onSubmit={onSubmit}>
            <Search
                value={ønsketSted || ''}
                label="Ønsket sted"
                description="Hvor ønsker kandidaten å jobbe?"
                onChange={onChange}
                onClear={onClear}
                variant="secondary"
                hideLabel={false}
            />
        </form>
    );
};

export default ØnsketSted;
