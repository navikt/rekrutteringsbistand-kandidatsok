import { Accordion, Search } from '@navikt/ds-react';
import React, { FormEventHandler, useState } from 'react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import filterCss from './Filter.module.css';

const Jobbønsker = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const [ønsketYrke, setØnsketYrke] = useState<string | null>(søkekriterier.ønsketYrke);

    const onChange = (tekst: string) => {
        setØnsketYrke(tekst || null);
    };

    const onClear = () => {
        setSearchParam(FilterParam.ØnsketYrke, undefined);
    };

    const onSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        setSearchParam(FilterParam.ØnsketYrke, ønsketYrke || undefined);
    };

    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="innsatsgruppe-header">Jobbønsker</Accordion.Header>
                <Accordion.Content>
                    <form onSubmit={onSubmit}>
                        <Search
                            type="text"
                            value={ønsketYrke || ''}
                            label="Ønsket yrke"
                            description="Hva ønsker kandidaten å jobbe med?"
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

export default Jobbønsker;
