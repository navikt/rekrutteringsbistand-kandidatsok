import { Collapse, Expand } from '@navikt/ds-icons';
import { Button, Popover, Tabs } from '@navikt/ds-react';
import React, {
    FunctionComponent,
    KeyboardEventHandler,
    MouseEventHandler,
    useRef,
    useState,
} from 'react';
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
    const velgKontorRef = useRef<HTMLButtonElement>(null);

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
        if (visKontorvelger) {
            setVisKontorvelger(false);
        } else {
            setErÅpnet(false);
            setVisKontorvelger(true);
        }
    };

    const onVelgKontorTabClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (søkekriterier.valgtKontor.size === 0) {
            setVisKontorvelger(true);
        }
    };

    const onVelgKontorTabKeyDown: KeyboardEventHandler = (event) => {
        if (event.code === 'Space' || event.key === 'Enter') {
            setVisKontorvelger(true);
        } else if (event.code === 'Escape') {
            setVisKontorvelger(false);
            setErÅpnet(false);
        }
    };

    const antallKontorerValgt = søkekriterier.valgtKontor.size;

    return (
        <>
            <Tabs.Tab
                id="velg-kontor-tab"
                ref={velgKontorRef}
                value={Portefølje.VelgKontor}
                onClick={onVelgKontorTabClick}
                onKeyDown={onVelgKontorTabKeyDown}
                label={'Valgte kontorer' + (antallKontorerValgt ? ` (${antallKontorerValgt})` : '')}
                className={css.tab}
                icon={
                    <Button
                        as="div"
                        tabIndex={-1}
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
                anchorEl={velgKontorRef.current}
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
