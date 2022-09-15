import React, { ReactNode } from 'react';
import { Button, Tabs } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import { Expand } from '@navikt/ds-icons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';
import { erIkkeProd } from '../utils';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MittKontor = 'kontor',
    AndreKontor = 'andre',
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
                {erIkkeProd && (
                    <Tabs.Tab
                        value={Portefølje.AndreKontor}
                        label="Andre kontor"
                        className={css.andreKontorTab}
                        icon={
                            <Button className={css.andreKontorKnapp} variant="tertiary">
                                <Expand title="Velg andre kontor" />
                            </Button>
                        }
                    />
                )}
            </Tabs.List>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
