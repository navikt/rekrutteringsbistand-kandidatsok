import React from 'react';
import { ToggleGroup, Tooltip } from '@navikt/ds-react';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { FilterParam } from '../../hooks/useRespons';
import { CoApplicant, Star } from '@navikt/ds-icons';
import css from './Sortering.module.css';

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
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Sist oppdaterte kandidater kommer øverst"
            >
                <ToggleGroup.Item value={Sortering.SisteFørst}>
                    <CoApplicant aria-hidden />
                    Siste først
                </ToggleGroup.Item>
            </Tooltip>
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Kandidatene som passer til flest kriterier, vises øverst"
            >
                <ToggleGroup.Item value={Sortering.BesteMatch}>
                    <Star aria-hidden /> Flest kriterier
                </ToggleGroup.Item>
            </Tooltip>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
