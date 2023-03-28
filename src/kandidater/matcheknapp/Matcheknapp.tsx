import React, { FunctionComponent, useState } from 'react';
import { AutomaticSystem } from '@navikt/ds-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { Kandidatliste } from '../../hooks/useKontekstAvKandidatlisteEllerStilling';
import { Kandidat } from '../Kandidat';

import css from './Matcheknapp.module.css';
import useSøkekriterier from '../../hooks/useSøkekriterier';
import { byggQueryForAktørIder } from '../../api/query/byggQuery';
import { søk } from '../../api/api';
import { InnloggetBruker } from '../../hooks/useBrukerensIdent';

type Props = {
    kandidatliste: Kandidatliste;
    kandidater: Kandidat[];
    innloggetBruker: InnloggetBruker;
};

const MAKS_ANTALL_KANDIDATER = 1000;

const Matcheknapp: FunctionComponent<Props> = ({ kandidatliste, kandidater, innloggetBruker }) => {
    const navigate = useNavigate();
    const { søkekriterier } = useSøkekriterier();
    const [visTooltip, setVisTooltip] = useState<boolean>(false);

    const tillatMatching = kandidater.length <= MAKS_ANTALL_KANDIDATER;

    const onForeslåRangeringClick = async () => {
        const query = byggQueryForAktørIder(søkekriterier, innloggetBruker, MAKS_ANTALL_KANDIDATER);
        const respons = await søk(query);
        const aktørIder = respons.hits.hits.map((hit) => hit._source.aktorId);

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
