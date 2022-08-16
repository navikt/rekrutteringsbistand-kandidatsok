import React, { useEffect, useState } from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { get } from '../api/api';
import { Kandidat } from '../Kandidat';
import { Back } from '@navikt/ds-icons';
import css from './KandidatsideForUtvikling.module.css';
import { Navigeringsstate } from '../hooks/useNavigeringsstate';

const KandidatsideForUtvikling = () => {
    const [kandidat, setKandidat] = useState<Kandidat | null>(null);
    const { state }: { state?: any } = useLocation();
    const { kandidatNr } = useParams();

    useEffect(() => {
        const hentKandidat = async () => {
            const respons = await get(`/kandidatsok-hent-kandidat/${kandidatNr}`);
            const kandidat = ((await respons.json()) as any)._source;

            setKandidat(kandidat);
        };

        hentKandidat();
    }, [kandidatNr]);

    let lenkeTilbakeTilSøket = '/kandidatsok';
    if (state?.search) {
        lenkeTilbakeTilSøket += state.search;
    }

    const stateTilLenke: Navigeringsstate = {
        fraKandidat: kandidatNr,
        markerteKandidater: state?.markerteKandidater,
    };

    return (
        <div className={css.wrapper}>
            <Panel className={css.panel}>
                <Link to={lenkeTilbakeTilSøket} state={stateTilLenke} className="navds-link">
                    <Back />
                    Tilbake til kandidatsøk
                </Link>
                <Heading level="1" size="large">
                    Kandidatside
                </Heading>
                <BodyShort>{kandidatNr}</BodyShort>
                {kandidat && <code>{JSON.stringify(kandidat, null, 4)}</code>}
            </Panel>
        </div>
    );
};

export default KandidatsideForUtvikling;
