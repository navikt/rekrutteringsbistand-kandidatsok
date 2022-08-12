import { Delete } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import useSøkekriterier from '../hooks/useSøkekriterier';
import filterCss from './Filter.module.css';

const TømFiltre = () => {
    const { fjernSøkekriterier } = useSøkekriterier();

    return (
        <div className={filterCss.fjernFilter}>
            <Button className="navds-link" variant="tertiary" onClick={fjernSøkekriterier}>
                <Delete />
                Tøm filtre
            </Button>
        </div>
    );
};

export default TømFiltre;
