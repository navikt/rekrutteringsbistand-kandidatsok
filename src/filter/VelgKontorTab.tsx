import { Collapse, Expand } from '@navikt/ds-icons';
import { Button, Popover, Tabs } from '@navikt/ds-react';
import React, { FunctionComponent, MouseEventHandler, useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { Søkekriterier } from '../hooks/useSøkekriterier';
import { Portefølje } from './PorteføljeTabs';
import VelgKontor from './VelgKontor';
import css from './VelgKontorTab.module.css';

type Props = {
    søkekriterier: Søkekriterier;
};

const VelgKontorTab: FunctionComponent<Props> = ({ søkekriterier }) => {
    const [visKontorvelger, setVisKontorvelger] = useState<boolean>(false);
    const [erÅpnet, setErÅpnet] = useState<boolean>(false);
    const andreKontorRef = useRef<HTMLButtonElement>(null);

    const onClickOutside = () => {
        if (visKontorvelger) {
            if (erÅpnet) {
                setVisKontorvelger(false);
                setErÅpnet(false);
            } else {
                setErÅpnet(true);
            }
        }
    };

    useOnClickOutside(onClickOutside, ['velg-kontor-popover', 'velg-kontor-forslag']);

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
        <>
            <Tabs.Tab
                id="velg-kontor-tab"
                ref={andreKontorRef}
                value={Portefølje.VelgKontor}
                onClick={onVelgKontorTabClick}
                label={'Velg kontor' + (antallKontorerValgt ? ` (${antallKontorerValgt})` : '')}
                className={css.tab}
                icon={
                    <Button
                        as="div"
                        className={css.knapp}
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
            <Popover
                placement="bottom"
                id="velg-kontor-popover"
                open={visKontorvelger}
                anchorEl={andreKontorRef.current}
                onClose={() => {}}
            >
                <Popover.Content className={css.popover}>
                    <VelgKontor forslagId="velg-kontor-forslag" />
                </Popover.Content>
            </Popover>
        </>
    );
};

export default VelgKontorTab;
