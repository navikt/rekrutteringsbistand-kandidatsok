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
}

export enum FiltrerbarInnsatsgruppe {
    Innsatsgruppe,
    AndreInnsatsgrupper = 'ANDRE',
}

export enum Servicegruppe {
    IkkeVurdert = 'IVURD',
    BehovForArbeidsevnevurdering = 'BKART',
    HelserelatertArbeidsrettetOppfølgingINav = 'OPPFI',
    SykmeldtMedOppfølgingPåArbeidsplassen = 'VURDI',
    SykmeldtUtenArbeidsgiver = 'VURDU',
}

export type Kvalifiseringsgruppe = FiltrerbarInnsatsgruppe | Servicegruppe;

const filtrerbareInnsatsgrupper = {
    [Innsatsgruppe.SpesieltTilpassetInnsats]: {
        label: 'Trenger veiledning, nedsatt arbeidsevne',
        description: 'Nedsatt arbeidsevne og et identifisert behov for tilrettelegging',
    },
    [Innsatsgruppe.SituasjonsbestemtInnsats]: {
        label: 'Trenger veiledning',
        description: 'Moderat bistandsbehov',
    },
    [Innsatsgruppe.VarigTilpasset]: {
        label: 'Liten mulighet til å jobbe',
        description: 'Varig nedsatt arbeidsevne',
    },
    [Innsatsgruppe.Standardinnsats]: {
        label: 'Gode muligheter',
        description: 'Behov for ordinær bistand',
    },
    [FiltrerbarInnsatsgruppe.AndreInnsatsgrupper]: {
        label: 'Andre kvalifiseringsgrupper',
        description:
            'Ikke vurdert, behov for arbeidsevnevurdering, helserelatert arbeidsrettet oppfølging, sykmeldt',
    },
};

export const alleInnsatsgrupper = {
    ...filtrerbareInnsatsgrupper,
    [Servicegruppe.IkkeVurdert]: {
        label: 'Ikke vurdert',
    },
    [Servicegruppe.BehovForArbeidsevnevurdering]: {
        label: 'Behov for arbeidsevnevurdering',
    },
    [Servicegruppe.HelserelatertArbeidsrettetOppfølgingINav]: {
        label: 'Helserelatert arbeidsrettet oppfølging i NAV',
    },
    [Servicegruppe.SykmeldtMedOppfølgingPåArbeidsplassen]: {
        label: 'Sykmeldt med oppfølging på arbeidsplassen',
    },
    [Servicegruppe.SykmeldtUtenArbeidsgiver]: {
        label: 'sykmeldt uten arbeidsgiver',
    },
};

const Jobbmuligheter = () => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const onChange = (valgteInnsatsgrupper: Innsatsgruppe[]) => {
        setSearchParam(Param.Innsatsgruppe, valgteInnsatsgrupper.join(LISTEPARAMETER_SEPARATOR));
    };

    return (
        <Accordion className={filterCss.filter}>
            <Accordion.Item defaultOpen>
                <Accordion.Header id="innsatsgruppe-header">Jobbmuligheter</Accordion.Header>
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

export default Jobbmuligheter;
