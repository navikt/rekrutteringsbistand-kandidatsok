import React from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import css from './VelgBehovskategorier.module.css';

export enum Behovskategori {
    Arbeidstid = 'arbeidstid',
    Fysisk = 'fysisk',
    Arbeidshverdagen = 'arbeidshverdagen',
    UtfordringerMedNorsk = 'utfordringerMedNorsk',
}

const VelgBehovskategorier = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    if (!søkekriterier.harTilretteleggingsbehov) {
        return null;
    }

    const onChange = (valgteKategorier: Behovskategori[]) => {
        setSearchParam(FilterParam.Behovskategori, valgteKategorier.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <CheckboxGroup
            hideLegend
            legend="Velg kategorier"
            className={css.checkboxes}
            value={Array.from(søkekriterier.behovskategori)}
            onChange={onChange}
        >
            <Checkbox value={Behovskategori.Arbeidstid}>Tilrettelegging av arbeidstid</Checkbox>
            <Checkbox value={Behovskategori.Fysisk}>
                Fysisk tilrettelegging av arbeidsplassen
            </Checkbox>
            <Checkbox value={Behovskategori.Arbeidshverdagen}>
                Tilpasninger i arbeidshverdagen
            </Checkbox>
            <Checkbox value={Behovskategori.UtfordringerMedNorsk}>Utfordringer med norsk</Checkbox>
        </CheckboxGroup>
    );
};

export default VelgBehovskategorier;
