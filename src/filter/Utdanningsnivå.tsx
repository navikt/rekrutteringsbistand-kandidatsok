import React from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';

export enum Nivå {
    Videregående = 'videregaende',
    Fagskole = 'fagskole',
    Bachelor = 'bachelor',
    Master = 'master',
    Doktorgrad = 'doktorgrad',
}

const Utdanningsnivå = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgtNivå: Nivå[]) => {
        setSearchParam(FilterParam.Utdanningsnivå, valgtNivå.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <CheckboxGroup
            legend="Utdanningsnivå"
            description="Velg ett eller flere nivåer"
            value={Array.from(søkekriterier.utdanningsnivå)}
            onChange={onChange}
        >
            <Checkbox value={Nivå.Videregående}>Videregående</Checkbox>
            <Checkbox value={Nivå.Fagskole}>Fagskole</Checkbox>
            <Checkbox value={Nivå.Bachelor}>Universitet/høgskole inntil 4 år</Checkbox>
            <Checkbox value={Nivå.Master}>Universitet/høgskole over 4 år</Checkbox>
            <Checkbox value={Nivå.Doktorgrad}>Doktorgrad (PhD)</Checkbox>
        </CheckboxGroup>
    );
};

export default Utdanningsnivå;
