import React, { MouseEventHandler, ReactNode, useState } from 'react';
import { Button, Tabs } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import { Collapse, Expand } from '@navikt/ds-icons';
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

    const [visKontorvelger, setVisKontorvelger] = useState<boolean>(false);

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje === Portefølje.Alle ? null : portefølje);
    };

    const onVelgKontorClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setVisKontorvelger(!visKontorvelger);
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
                            <Button
                                as="div"
                                className={css.andreKontorKnapp}
                                onClick={onVelgKontorClick}
                                variant="tertiary"
                                role="button"
                            >
                                {visKontorvelger ? (
                                    <Collapse title="Lukk kontorvelger" />
                                ) : (
                                    <Expand title="Velg andre kontor" />
                                )}
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
