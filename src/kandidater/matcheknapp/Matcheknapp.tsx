import React, { FunctionComponent, useState } from 'react';
import { AutomaticSystem } from '@navikt/ds-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { Kandidatliste } from '../../hooks/useKontekstAvKandidatliste';
import { Kandidat } from '../Kandidat';

import css from './Matcheknapp.module.css';

type Props = {
    kandidatliste: Kandidatliste;
    kandidater: Kandidat[];
};

const MAKS_ANTALL_KANDIDATER = 1000;

const Matcheknapp: FunctionComponent<Props> = ({ kandidatliste, kandidater }) => {
    const navigate = useNavigate();
    const [visTooltip, setVisTooltip] = useState<boolean>(false);

    const aktørIder = kandidater.map((k) => k.aktorId);
    const tillatMatching = kandidater.length <= MAKS_ANTALL_KANDIDATER;

    const onForeslåRangeringClick = () => {
        const path = `/prototype/stilling/${kandidatliste.stillingId}`;
        const state = {
            aktørIder,
        };

        navigate(path, {
            state,
        });
    };

    if (tillatMatching) {
        return (
            <div className={css.posisjon + ' ' + css.regnbuebord}>
                <Button
                    variant="tertiary"
                    onClick={onForeslåRangeringClick}
                    icon={<AutomaticSystem aria-hidden />}
                >
                    Foreslå rangering
                </Button>
            </div>
        );
    }

    return (
        <div
            className={css.posisjon + ' ' + css.kjedeligBord}
            onClick={() => setVisTooltip(!visTooltip)}
        >
            <Tooltip
                open={visTooltip}
                placement="left"
                offset={16}
                content={`For å foreslå rangering må du ha færre enn ${MAKS_ANTALL_KANDIDATER} treff.`}
            >
                <Button disabled variant="tertiary" icon={<AutomaticSystem aria-hidden />}>
                    Foreslå rangering
                </Button>
            </Tooltip>
        </div>
    );
};

export default Matcheknapp;
