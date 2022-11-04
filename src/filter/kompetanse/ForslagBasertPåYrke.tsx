import { Up, Down } from '@navikt/ds-icons';
import { Heading, BodyShort, Button } from '@navikt/ds-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { søk } from '../../api/api';
import { byggAggregeringerQuery, Aggregering } from '../../api/query/byggAggregeringer';
import { Søkekriterier } from '../../hooks/useSøkekriterier';
import { AggregeringRespons } from '../../kandidater/elasticSearchTyper';
import Merkelapp from '../merkelapp/Merkelapp';
import Merkelapper from '../merkelapp/Merkelapper';
import css from './Kompetanse.module.css';

type Props = {
    søkekriterier: Søkekriterier;
    onVelgForslag: (forslag: string) => () => void;
};

const ForslagBasertPåYrke: FunctionComponent<Props> = ({ søkekriterier, onVelgForslag }) => {
    const [alleForslag, setAlleForslag] = useState<AggregeringRespons | null>(null);
    const [visAlleForslag, setVisAlleForslag] = useState<boolean>(false);

    useEffect(() => {
        const hentForslag = async () => {
            const query = byggAggregeringerQuery(søkekriterier);
            const respons = await søk(query);

            if (respons.aggregations) {
                const aggregering = respons.aggregations[Aggregering.Kompetanse];

                setAlleForslag(aggregering);
            }
        };

        hentForslag();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [søkekriterier.ønsketYrke]);

    console.log('APEKATT:', alleForslag);

    if (alleForslag === null) {
        return null;
    }

    let forslag = alleForslag.buckets
        .map((bucket) => bucket.key)
        .filter((kompetanse) => !søkekriterier.kompetanse.has(kompetanse));

    if (!visAlleForslag) {
        forslag = forslag.slice(0, 4);
    }

    if (søkekriterier.ønsketYrke.size === 0 || forslag.length === 0) {
        return null;
    }

    return (
        <div className={css.forslag}>
            <Heading size="xsmall" level="4">
                Kompetanseforslag
            </Heading>
            <BodyShort size="small" className={css.beskrivelse}>
                Basert på ønsket yrke
            </BodyShort>
            <Merkelapper>
                {forslag.map((kompetanse) => (
                    <Merkelapp
                        ariaLabel={`Legg til ${kompetanse}`}
                        onClick={onVelgForslag(kompetanse)}
                        key={kompetanse}
                    >
                        {kompetanse}
                    </Merkelapp>
                ))}
            </Merkelapper>
            <Button
                size="small"
                className={css.visningsknapp}
                onClick={() => setVisAlleForslag(!visAlleForslag)}
                icon={visAlleForslag ? <Up /> : <Down />}
                variant="tertiary"
            >
                {visAlleForslag ? 'Vis færre' : 'Vis alle'}
            </Button>
        </div>
    );
};

export default ForslagBasertPåYrke;
