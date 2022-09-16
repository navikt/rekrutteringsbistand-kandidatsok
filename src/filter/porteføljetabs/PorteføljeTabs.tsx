import React, { ReactNode } from 'react';
import { Tabs } from '@navikt/ds-react';
import { FilterParam } from '../../hooks/useRespons';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';
import { erIkkeProd } from '../../utils';
import VelgKontorTab from './VelgKontorTab';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MittKontor = 'kontor',
    VelgKontor = 'valgte',
}

const PorteføljeTabs = ({ children }: { children: ReactNode }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje === Portefølje.Alle ? null : portefølje);
    };

    return (
        <Tabs className={css.tabpanel} value={søkekriterier.portefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <Tabs.Tab value={Portefølje.Alle} label="Alle" />
                <Tabs.Tab value={Portefølje.MineBrukere} label="Mine brukere" />
                <Tabs.Tab value={Portefølje.MittKontor} label="Mitt kontor" />
                {erIkkeProd && <VelgKontorTab søkekriterier={søkekriterier} />}
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
