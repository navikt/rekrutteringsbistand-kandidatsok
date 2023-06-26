import React from 'react';
import { Button } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import filterCss from './Filter.module.css';

const TømFiltre = () => {
    const { fjernSøkekriterier } = useSøkekriterier();

    return (
        <div className={filterCss.tømFilter}>
            <Button
                icon={<TrashIcon aria-hidden />}
                variant="tertiary"
                onClick={fjernSøkekriterier}
            >
                Tøm filtre
            </Button>
        </div>
    );
};

export default TømFiltre;
