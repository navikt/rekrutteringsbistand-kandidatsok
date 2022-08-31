import { Accordion, Search } from '@navikt/ds-react';
import React, { FormEventHandler, useState } from 'react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import filterCss from './Filter.module.css';

const Sted = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const [ønsketSted, setØnsketSted] = useState<string | null>(søkekriterier.ønsketSted);

    const onChange = (tekst: string) => {
        setØnsketSted(tekst || null);
    };

    const onClear = () => {
        setSearchParam(FilterParam.ØnsketSted, undefined);
    };

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setSearchParam(FilterParam.ØnsketSted, ønsketSted || undefined);
    };

    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="innsatsgruppe-header">Sted</Accordion.Header>
                <Accordion.Content>
                    <form onSubmit={onSubmit}>
                        <Search
                            type="text"
                            value={ønsketSted || ''}
                            label="Ønsket sted"
                            description="Hvor ønsker kandidaten å jobbe?"
                            onChange={onChange}
                            onClear={onClear}
                            variant="secondary"
                            hideLabel={false}
                        />
                    </form>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Sted;
