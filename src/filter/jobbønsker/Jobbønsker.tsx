import React, { FunctionComponent, ReactNode } from 'react';
import { Accordion } from '@navikt/ds-react';
import filterCss from '../Filter.module.css';

type Props = {
    children: ReactNode;
};

const Jobbønsker: FunctionComponent<Props> = ({ children }) => {
    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="innsatsgruppe-header">Jobbønsker</Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Jobbønsker;
