import React from 'react';
import { ToggleGroup, Tooltip } from '@navikt/ds-react';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { FilterParam } from '../../hooks/useRespons';
import { Clock, DecisionCheck } from '@navikt/ds-icons';
import css from './Sortering.module.css';
import { sendEvent } from '../../amplitude';

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
                    <Clock aria-hidden />
                    Sist oppdatert
                </ToggleGroup.Item>
            </Tooltip>
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Kandidatene som oppfyller flest kriterier, vises øverst"
            >
                <ToggleGroup.Item value={Sortering.FlestKriterier}>
                    <DecisionCheck aria-hidden /> Flest kriterier
                </ToggleGroup.Item>
            </Tooltip>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
