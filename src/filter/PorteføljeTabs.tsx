import React, { ReactNode } from 'react';
import { Tabs } from '@navikt/ds-react';
import css from './PorteføljeTabs.module.css';
import useParams from '../hooks/useParams';
import { Param } from '../hooks/useRespons';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MittKontor = 'kontor',
}

const PorteføljeTabs = ({
    children,
    medNavKontor,
}: {
    children: ReactNode;
    medNavKontor: boolean;
}) => {
    const { searchParams, setSearchParam } = useParams();
    const valgtPortefølje = (searchParams[Param.Portefølje] as Portefølje) || Portefølje.Alle;

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(Param.Portefølje, portefølje === Portefølje.Alle ? undefined : portefølje);
    };

    return (
        <Tabs value={valgtPortefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <Tabs.Tab value={Portefølje.Alle} label="Alle" />
                <Tabs.Tab value={Portefølje.MineBrukere} label="Mine brukere" />
                <Tabs.Tab value={Portefølje.MittKontor} label="Mitt kontor" />
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={valgtPortefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
