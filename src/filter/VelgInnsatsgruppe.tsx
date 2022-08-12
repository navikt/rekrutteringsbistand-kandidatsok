import React from 'react';
import { Accordion, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { Param } from '../hooks/useRespons';
import filterCss from './Filter.module.css';

export enum FiltrerbarInnsatsgruppe {
    SpesieltTilpassetInnsats = 'BATT',
    SituasjonsbestemtInnsats = 'BFORM',
    Standardinnsats = 'IKVAL',
    VarigTilpasset = 'VARIG',
    AndreInnsatsgrupper = 'ANDRE',
}

export enum AnnenInnsatsgruppe {
    IkkeVurdert = 'IVURD',
    BehovForArbeidsevnevurdering = 'BKART',
    HelserelatertArbeidsrettetOppfølgingINav = 'OPPFI',
    SykmeldtMedOppfølgingPåArbeidsplassen = 'VURDI',
    SykmeldtUtenArbeidsgiver = 'VURDU',
}

export type Innsatsgruppe = FiltrerbarInnsatsgruppe | AnnenInnsatsgruppe;

type Config = Record<
    Innsatsgruppe,
    {
        label: string;
        description?: string;
    }
>;

const filtrerbareInnsatsgrupper: Partial<Config> = {
    [FiltrerbarInnsatsgruppe.SpesieltTilpassetInnsats]: {
        label: 'Spesielt tilpasset innsats',
        description: 'Nedsatt arbeidsevne og et identifisert behov for tilrettelegging',
    },
    [FiltrerbarInnsatsgruppe.SituasjonsbestemtInnsats]: {
        label: 'Situasjonsbestemt innsats',
        description: 'Moderat bistandsbehov',
    },
    [FiltrerbarInnsatsgruppe.Standardinnsats]: {
        label: 'Standardinnsats',
        description: 'Behov for ordinær bistand',
    },
    [FiltrerbarInnsatsgruppe.VarigTilpasset]: {
        label: 'Varig tilpasset innsats',
        description: 'Varig nedsatt arbeidsevne',
    },
    [FiltrerbarInnsatsgruppe.AndreInnsatsgrupper]: {
        label: 'Servicegrupper',
        description:
            'Ikke vurdert, behov for arbeidsevnevurdering, helserelatert arbeidsrettet oppfølging, sykmeldt',
    },
};

export const alleInnsatsgrupper: Partial<Config> = {
    ...filtrerbareInnsatsgrupper,
    [AnnenInnsatsgruppe.IkkeVurdert]: {
        label: 'Ikke vurdert',
    },
    [AnnenInnsatsgruppe.BehovForArbeidsevnevurdering]: {
        label: 'Behov for arbeidsevnevurdering',
    },
    [AnnenInnsatsgruppe.HelserelatertArbeidsrettetOppfølgingINav]: {
        label: 'Helserelatert arbeidsrettet oppfølging i NAV',
    },
    [AnnenInnsatsgruppe.SykmeldtMedOppfølgingPåArbeidsplassen]: {
        label: 'Sykmeldt med oppfølging på arbeidsplassen',
    },
    [AnnenInnsatsgruppe.SykmeldtUtenArbeidsgiver]: {
        label: 'sykmeldt uten arbeidsgiver',
    },
};

export const andreInnsatsgrupper = [
    AnnenInnsatsgruppe.IkkeVurdert,
    AnnenInnsatsgruppe.BehovForArbeidsevnevurdering,
    AnnenInnsatsgruppe.HelserelatertArbeidsrettetOppfølgingINav,
    AnnenInnsatsgruppe.SykmeldtMedOppfølgingPåArbeidsplassen,
    AnnenInnsatsgruppe.SykmeldtUtenArbeidsgiver,
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
                        hideLegend
                        legend="Velg innsatsgrupper"
                        onChange={onChange}
                        value={Array.from(søkekriterier.innsatsgruppe)}
                    >
                        {Object.entries(filtrerbareInnsatsgrupper).map(([kode, gruppe]) => (
                            <Checkbox key={kode} value={kode} description={gruppe.description}>
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
