import { Close, Collapse, Expand } from '@navikt/ds-icons';
import { Button, Popover, Tabs } from '@navikt/ds-react';
import React, {
    FunctionComponent,
    KeyboardEventHandler,
    MouseEventHandler,
    useRef,
    useState,
} from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { Søkekriterier } from '../../hooks/useSøkekriterier';
import { Portefølje } from './PorteføljeTabs';
import VelgKontor from '../VelgKontor';
import css from './VelgKontorTab.module.css';

const POPOVER_ID = 'velg-kontor-popover';
const FORSLAG_ID = 'velg-kontor-tab';

type Props = {
    søkekriterier: Søkekriterier;
};

const VelgKontorTab: FunctionComponent<Props> = ({ søkekriterier }) => {
    const [visKontorvelger, setVisKontorvelger] = useState<boolean>(false);
    const [beholdKontorvelger, setBeholdKontorvelger] = useState<boolean>(true);
    const velgKontorRef = useRef<HTMLButtonElement>(null);

    const onClickOutside = () => {
        if (visKontorvelger) {
            if (beholdKontorvelger) {
                setBeholdKontorvelger(false);
            } else {
                setVisKontorvelger(false);
                setBeholdKontorvelger(true);
            }
        }
    };

    useOnClickOutside(onClickOutside, [POPOVER_ID, FORSLAG_ID]);

    const onVelgKontorKnappClick: MouseEventHandler<HTMLButtonElement> = () => {
        if (visKontorvelger) {
            setVisKontorvelger(false);
        } else {
            setBeholdKontorvelger(true);
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
            setBeholdKontorvelger(true);
        }
    };

    const onLukkeknappClick = () => {
        setVisKontorvelger(false);
        setBeholdKontorvelger(true);
    };

    const antallKontorerValgt = søkekriterier.valgtKontor.size;

    return (
        <>
            <Tabs.Tab
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
                id={POPOVER_ID}
                open={visKontorvelger}
                anchorEl={velgKontorRef.current}
                onClose={() => {}}
            >
                <Popover.Content className={css.popover}>
                    <Button
                        className={css.lukkeknapp}
                        size="small"
                        variant="tertiary"
                        aria-label=""
                        onClick={onLukkeknappClick}
                        icon={<Close />}
                    />
                    <VelgKontor forslagId={FORSLAG_ID} />
                </Popover.Content>
            </Popover>
        </>
    );
};

export default VelgKontorTab;
