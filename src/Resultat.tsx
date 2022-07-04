import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { Respons } from './elasticSearchTyper';

type Props = {
    respons: Respons;
};

const Resultat = ({ respons }: Props) => {
    const treff = respons.hits.hits;
    const kandidater = treff.map((t) => t._source);

    return (
        <ul>
            {kandidater.map((kandidat) => (
                <BodyShort as="li" key={kandidat.fodselsnummer}>
                    {kandidat.fornavn}
                </BodyShort>
            ))}
        </ul>
    );
};

export default Resultat;
