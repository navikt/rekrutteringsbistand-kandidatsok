import React from 'react';
import { ToggleGroup, Tooltip } from '@navikt/ds-react';
import { CheckmarkIcon, ClockIcon } from '@navikt/aksel-icons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { FilterParam } from '../../hooks/useRespons';
import { sendEvent } from '../../amplitude';
import css from './Sortering.module.css';

export enum Sortering {
    SisteFørst = 'nyeste',
    FlestKriterier = 'score',
}

const Sorteringsvalg = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (sortering: Sortering) => {
        setSearchParam(
            FilterParam.Sortering,
            sortering === Sortering.SisteFørst ? null : sortering
        );

        sendEvent('nytt_kandidatsøk', 'endre-sortering', {
            sortering,
        });
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
                    <ClockIcon aria-hidden />
                    Sist oppdatert
                </ToggleGroup.Item>
            </Tooltip>
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Kandidatene som oppfyller flest kriterier, vises øverst"
            >
                <ToggleGroup.Item value={Sortering.FlestKriterier}>
                    <CheckmarkIcon aria-hidden /> Flest kriterier
                </ToggleGroup.Item>
            </Tooltip>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
