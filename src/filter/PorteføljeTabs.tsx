import React, { MouseEventHandler, ReactNode, useRef, useState } from 'react';
import { Button, Popover, Tabs } from '@navikt/ds-react';
import { FilterParam } from '../hooks/useRespons';
import { Collapse, Expand } from '@navikt/ds-icons';
import useSøkekriterier from '../hooks/useSøkekriterier';
import css from './PorteføljeTabs.module.css';
import { erIkkeProd } from '../utils';
import VelgKontor from './VelgKontor';

export enum Portefølje {
    Alle = 'alle',
    MineBrukere = 'mine',
    MittKontor = 'kontor',
    VelgKontor = 'valgte',
}

const PorteføljeTabs = ({ children }: { children: ReactNode }) => {
    const { søkekriterier, setSearchParam } = useSøkekriterier();
    const [visKontorvelger, setVisKontorvelger] = useState<boolean>(false);
    const andreKontorRef = useRef<HTMLButtonElement>(null);

    const velgPortefølje = (portefølje: string) => {
        setSearchParam(FilterParam.Portefølje, portefølje === Portefølje.Alle ? null : portefølje);
    };

    const onVelgKontorKnappClick: MouseEventHandler<HTMLButtonElement> = () => {
        setVisKontorvelger(!visKontorvelger);
    };

    const onVelgKontorTabClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (søkekriterier.valgtKontor.size === 0) {
            setVisKontorvelger(true);
        }
    };

    const antallKontorerValgt = søkekriterier.valgtKontor.size;

    return (
        <Tabs className={css.tabpanel} value={søkekriterier.portefølje} onChange={velgPortefølje}>
            <Tabs.List>
                <Tabs.Tab value={Portefølje.Alle} label="Alle" />
                <Tabs.Tab value={Portefølje.MineBrukere} label="Mine brukere" />
                <Tabs.Tab value={Portefølje.MittKontor} label="Mitt kontor" />
                {erIkkeProd && (
                    <Tabs.Tab
                        ref={andreKontorRef}
                        value={Portefølje.VelgKontor}
                        onClick={onVelgKontorTabClick}
                        label={
                            'Velg kontor' + (antallKontorerValgt ? ` (${antallKontorerValgt})` : '')
                        }
                        className={css.andreKontorTab}
                        icon={
                            <Button
                                as="div"
                                className={css.andreKontorKnapp}
                                onClick={onVelgKontorKnappClick}
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
            <Popover
                placement="bottom"
                open={visKontorvelger}
                anchorEl={andreKontorRef.current}
                onClose={() => {
                    setVisKontorvelger(false);
                }}
            >
                <Popover.Content className={css.kontorvelger}>
                    <VelgKontor />
                </Popover.Content>
            </Popover>
            <Tabs.Panel className={css.tabpanel} value={søkekriterier.portefølje}>
                {children}
            </Tabs.Panel>
        </Tabs>
    );
};

export default PorteføljeTabs;
