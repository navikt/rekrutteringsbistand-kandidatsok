import React from 'react';
import { ToggleGroup, Tooltip } from '@navikt/ds-react';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { FilterParam } from '../../hooks/useRespons';
import { CoApplicant, Star } from '@navikt/ds-icons';
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
                    <CoApplicant aria-hidden />
                    Siste først
                </ToggleGroup.Item>
            </Tooltip>
            <Tooltip
                offset={16}
                className={css.tooltip}
                content="Kandidatene som passer til flest kriterier, vises øverst"
            >
                <ToggleGroup.Item value={Sortering.FlestKriterier}>
                    <Star aria-hidden /> Flest kriterier
                </ToggleGroup.Item>
            </Tooltip>
        </ToggleGroup>
    );
};

export default Sorteringsvalg;
