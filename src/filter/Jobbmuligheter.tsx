import React from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import useSøkekriterier, { LISTEPARAMETER_SEPARATOR } from '../hooks/useSøkekriterier';
import { FilterParam } from '../hooks/useRespons';

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
        label: 'Spesielt tilpasset innsats',
        description: 'Har et identifisert behov for tilrettelegging',
    },
    [Innsatsgruppe.SituasjonsbestemtInnsats]: {
        label: 'Situasjonsbestemt innsats',
        description: 'Moderat bistandsbehov',
    },
    [Innsatsgruppe.VarigTilpasset]: {
        label: 'Varig tilpasset',
        description: 'Varig nedsatt arbeidsevne',
    },
    [Innsatsgruppe.Standardinnsats]: {
        label: 'Standardinnsats',
        description: 'Behov for ordinær bistand',
    },
    [FiltrerbarInnsatsgruppe.AndreInnsatsgrupper]: {
        label: 'Andre kvalifiseringsgrupper',
        description: 'Ikke vurdert, helserelatert arbeidsrettet oppfølging, sykmeldt',
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
        setSearchParam(
            FilterParam.Innsatsgruppe,
            valgteInnsatsgrupper.join(LISTEPARAMETER_SEPARATOR)
        );
    };

    return (
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
    );
};

export default Jobbmuligheter;
