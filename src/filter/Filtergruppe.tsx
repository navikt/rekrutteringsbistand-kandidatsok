import { FunctionComponent, ReactNode } from 'react';
import { Accordion } from '@navikt/ds-react';
import filterCss from './Filter.module.css';

type Props = {
    tittel: string;
    children: ReactNode;
};

const Filtergruppe: FunctionComponent<Props> = ({ tittel, children }) => {
    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="filtergruppe-header">{tittel}</Accordion.Header>
                <Accordion.Content>{children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default Filtergruppe;
