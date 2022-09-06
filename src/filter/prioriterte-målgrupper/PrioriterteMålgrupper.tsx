import React, { FunctionComponent } from 'react';
import { Checkbox, CheckboxGroup, HelpText, useId } from '@navikt/ds-react';
import { FilterParam } from '../../hooks/useRespons';
import { Innsatsgruppe } from '../Jobbmuligheter';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../../hooks/useSøkekriterier';
import css from './PrioriterteMålgrupper.module.css';

export enum PrioritertMålgruppe {
    UngeUnderTrettiÅr = 'unge',
    SeniorFemtiPluss = 'senior',
    HullICv = 'hullICv',
}

const PrioriterteMålgrupper: FunctionComponent = () => {
    const hjelpetekstId = useId();
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteMålgrupper: Innsatsgruppe[]) => {
        setSearchParam(
            FilterParam.PrioritertMålgruppe,
            valgteMålgrupper.join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
        <CheckboxGroup
            hideLegend
            legend="Velg prioriterte målgrupper"
            onChange={onChange}
            value={Array.from(søkekriterier.prioritertMålgruppe)}
        >
            <Checkbox value={PrioritertMålgruppe.UngeUnderTrettiÅr}>Unge under 30 år</Checkbox>
            <Checkbox value={PrioritertMålgruppe.SeniorFemtiPluss}>Senior 50+</Checkbox>
            <div className={css.checkboxOgHjelpetekst}>
                <Checkbox value={PrioritertMålgruppe.HullICv} aria-describedby={hjelpetekstId}>
                    Har hull i CV-en
                </Checkbox>
                <HelpText title="Hva er hull i CV-en?" id={hjelpetekstId}>
                    Du får treff på kandidater som ikke har registrert jobb eller utdanning i CV-en
                    i en sammenhengende periode på 2 år i løpet av de siste 5 årene.
                </HelpText>
            </div>
        </CheckboxGroup>
    );
};

export default PrioriterteMålgrupper;
