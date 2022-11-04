import React from 'react';
import { ToggleGroup } from '@navikt/ds-react';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { FilterParam } from '../../hooks/useRespons';

export enum Sortering {
    SisteFørst = 'nyeste',
    BesteMatch = 'score',
}

const Sorteringsvalg = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (sortering: Sortering) => {
        setSearchParam(
            FilterParam.Sortering,
            sortering === Sortering.SisteFørst ? null : sortering
        );
    };

    return (
        <ToggleGroup
            defaultValue={søkekriterier.sortering}
            onChange={(sortering) => onChange(sortering as Sortering)}
            size="small"
        >
            <ToggleGroup.Item value={Sortering.SisteFørst}>Siste først</ToggleGroup.Item>
            <ToggleGroup.Item value={Sortering.BesteMatch}>Beste match</ToggleGroup.Item>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
