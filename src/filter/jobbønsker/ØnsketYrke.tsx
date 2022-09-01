import { Search } from '@navikt/ds-react';
import React, { FormEventHandler, FunctionComponent, useEffect, useState } from 'react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';

const ØnsketYrke: FunctionComponent = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const valgteYrker = Array.from(søkekriterier.ønsketYrke);
    const [ønsketYrke, setØnsketYrke] = useState<string>('');

    useEffect(() => {
        if (søkekriterier.ønsketYrke.size === 0) {
            setØnsketYrke('');
        }
    }, [søkekriterier]);

    const onChange = (tekst: string) => {
        setØnsketYrke(tekst);
    };

    const onClear = () => {
        setSearchParam(FilterParam.ØnsketYrke, undefined);
    };

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        const alleØnskedeYrker = new Set(søkekriterier.ønsketYrke);
        alleØnskedeYrker.add(ønsketYrke);

        setSearchParam(
            FilterParam.ØnsketYrke,
            Array.from(alleØnskedeYrker).join(LISTEPARAMETER_SEPARATOR)
        );

        setØnsketYrke('');
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
        <form onSubmit={onSubmit}>
            <Search
                value={ønsketYrke}
                label="Ønsket yrke"
                description="Hva ønsker kandidaten å jobbe med?"
                onChange={onChange}
                onClear={onClear}
                variant="secondary"
                hideLabel={false}
            />
            <Merkelapper>
                {valgteYrker.map((yrke) => (
                    <Merkelapp onClick={onValgtYrkeClick(yrke)}>{yrke}</Merkelapp>
                ))}
            </Merkelapper>
        </form>
    );
};

export default ØnsketYrke;
