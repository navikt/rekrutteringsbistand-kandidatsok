import React from 'react';
import { Accordion, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Param } from '../hooks/useRespons';
import filterCss from './Filter.module.css';

export enum Innsatsgruppe {
    SpesieltTilpassetInnsats = 'BATT',
    SituasjonsbestemtInnsats = 'BFORM',
    Standardinnsats = 'IKVAL',
    VarigTilpasset = 'VARIG',
    IkkeVurdert = 'IVURD',
    BehovForArbeidsevnevurdering = 'BKART',
    HelserelatertArbeidsrettetOppfølgingINav = 'OPPFI',
    SykmeldtMedOppfølgingPåArbeidsplassen = 'VURDI',
    SykmeldtUtenArbeidsgiver = 'VURDU',
}

type Config = {
    kode: Innsatsgruppe;
    label: string;
    description?: string;
};

const vurderteInnsatsgrupper: Config[] = [
    {
        kode: Innsatsgruppe.SpesieltTilpassetInnsats,
        label: 'Spesielt tilpasset innsats',
        description: 'Nedsatt arbeidsevne og et identifisert behov for tilrettelegging',
    },
    {
        kode: Innsatsgruppe.SituasjonsbestemtInnsats,
        label: 'Situasjonsbestemt innsats',
        description: 'Moderat bistandsbehov',
    },
    {
        kode: Innsatsgruppe.Standardinnsats,
        label: 'Standardinnsats',
        description: 'Behov for ordinær bistand',
    },
    {
        kode: Innsatsgruppe.VarigTilpasset,
        label: 'Varig tilpasset innsats',
        description: 'Varig nedsatt arbeidsevne',
    },
];

const uvurderteInnsatsgrupper: Config[] = [
    {
        kode: Innsatsgruppe.IkkeVurdert,
        label: 'Ikke vurdert',
    },
    {
        kode: Innsatsgruppe.BehovForArbeidsevnevurdering,
        label: 'Behov for arbeidsevnevurdering',
    },
];

const sykmeldteGrupper: Config[] = [
    {
        kode: Innsatsgruppe.HelserelatertArbeidsrettetOppfølgingINav,
        label: 'Helserelatert arbeidsrettet oppfølging i NAV',
    },
    {
        kode: Innsatsgruppe.SykmeldtMedOppfølgingPåArbeidsplassen,
        label: 'Sykmeldt, oppfølging på arbeidsplassen',
    },
    {
        kode: Innsatsgruppe.SykmeldtUtenArbeidsgiver,
        label: 'Sykmeldt uten arbeidsgiver',
    },
];

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
                        legend="Vurderte kandidater"
                        description="Kandidater med vurdert bistandsbehov"
                        onChange={onChange}
                        value={Array.from(søkekriterier.innsatsgruppe)}
                    >
                        {vurderteInnsatsgrupper.map((gruppe) => (
                            <Checkbox
                                key={gruppe.kode}
                                value={gruppe.kode}
                                description={gruppe.description}
                            >
                                {gruppe.label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>

                    <CheckboxGroup
                        legend="Ikke-vurderte kandidater"
                        onChange={onChange}
                        value={Array.from(søkekriterier.innsatsgruppe)}
                    >
                        {uvurderteInnsatsgrupper.map((gruppe) => (
                            <Checkbox
                                key={gruppe.kode}
                                value={gruppe.kode}
                                description={gruppe.description}
                            >
                                {gruppe.label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>

                    <CheckboxGroup
                        legend="Sykmeldte kandidater"
                        onChange={onChange}
                        value={Array.from(søkekriterier.innsatsgruppe)}
                    >
                        {sykmeldteGrupper.map((gruppe) => (
                            <Checkbox
                                key={gruppe.kode}
                                value={gruppe.kode}
                                description={gruppe.description}
                            >
                                {gruppe.label}
                            </Checkbox>
                        ))}
                    </CheckboxGroup>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    );
};

export default VelgInnsatsgruppe;
