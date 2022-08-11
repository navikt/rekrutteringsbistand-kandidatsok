import React, { ReactNode } from 'react';
import { Tabs } from '@navikt/ds-react';
import { Param } from '../hooks/useRespons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MittKontor = 'kontor',
}

const PorteføljeTabs = ({ children }: { children: ReactNode }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(Param.Portefølje, portefølje === Portefølje.Alle ? undefined : portefølje);
    };

    return (
        <Tabs value={søkekriterier.portefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <Tabs.Tab value={Portefølje.Alle} label="Alle" />
                <Tabs.Tab value={Portefølje.MineBrukere} label="Mine brukere" />
                <Tabs.Tab value={Portefølje.MittKontor} label="Mitt kontor" />
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
