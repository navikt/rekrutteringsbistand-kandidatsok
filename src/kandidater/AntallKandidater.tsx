import { Heading } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { Nettressurs } from '../api/Nettressurs';
import { Respons } from './elasticSearchTyper';

type Props = {
    respons: Nettressurs<Respons>;
};

const AntallKandidater: FunctionComponent<Props> = ({ respons }) => {
    if (respons.kind !== 'suksess' && respons.kind !== 'oppdaterer') {
        return <div />;
    }

    const antallTreff = formaterStortTall(respons.data.hits.total.value);

    return (
        <Heading size="medium" level="2">
            {antallTreff} kandidater
        </Heading>
    );
};

const formaterStortTall = (n: number) => n.toLocaleString('nb-NO');

export default AntallKandidater;
