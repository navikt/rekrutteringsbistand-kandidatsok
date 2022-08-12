import React from 'react';
import { Accordion, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Param } from '../hooks/useRespons';
import filterCss from './Filter.module.css';

export enum Innsatsgruppe {
    SpesieltTilpasset = 'BATT',
    Situasjonsbestemt = 'BFORM',
    Standard = 'IKVAL',
    VarigTilpasset = 'VARIG',
    SykmeldtMedOppfølgingPåArbeidsplassen = 'VURDI',
    BehovForArbeidsevnevurdering = 'BKART',
    Placeholder = 'IVURD',
    SykmeldtUtenArbeidsgiver = 'VURDU',
    HelserelatertArbeidsrettetOppfølgingINav = 'OPPFI',
}

const VelgInnsatsgruppe = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
        setSearchParam(Param.Innsatsgruppe, valgteInnsatsgrupper.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="innsatsgruppe-header">Innsatsgruppe</Accordion.Header>
                <Accordion.Content>
                    <CheckboxGroup
                        legend="Velg innsatsgruppe"
                        hideLegend
                        onChange={onChange}
                        value={Array.from(søkekriterier.innsatsgruppe)}
                    >
                        {Object.values(Innsatsgruppe).map((innsatsgruppe) => (
                            <Checkbox key={innsatsgruppe} value={innsatsgruppe}>
                                {innsatsgruppeTilLabel(innsatsgruppe)}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

const innsatsgruppeTilLabel = (innsatsgruppe: Innsatsgruppe) => {
    switch (innsatsgruppe) {
        case Innsatsgruppe.SpesieltTilpasset:
            return 'Spesielt tilpasset innsats';
        case Innsatsgruppe.Situasjonsbestemt:
            return 'Situasjonsbestemt innsats';
        case Innsatsgruppe.Standard:
            return 'Standardinnsats';
        case Innsatsgruppe.VarigTilpasset:
            return 'Spesielt tilpasset innsats';
        case Innsatsgruppe.SykmeldtMedOppfølgingPåArbeidsplassen:
            return 'Sykmeldt med oppfølging på arbeidsplassen';
        case Innsatsgruppe.BehovForArbeidsevnevurdering:
            return 'Behov for arbeidsevnevurdering';
        case Innsatsgruppe.Placeholder:
            return 'IVURD. Hva er dette?';
        case Innsatsgruppe.SykmeldtUtenArbeidsgiver:
            return 'Sykmeldt uten arbeidsgiver';
        case Innsatsgruppe.HelserelatertArbeidsrettetOppfølgingINav:
            return 'Helserelatert arbeidsrettet oppfølging i NAV';
    }
};

export default VelgInnsatsgruppe;
