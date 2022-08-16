import React, { useEffect, useState } from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { Link, useParams } from 'react-router-dom';
import { get } from '../api/api';
import { Kandidat } from '../Kandidat';
import { Back } from '@navikt/ds-icons';
import css from './KandidatsideForUtvikling.module.css';

const KandidatsideForUtvikling = () => {
    const [kandidat, setKandidat] = useState<Kandidat | null>(null);
    const { kandidatNr } = useParams();

    useEffect(() => {
        const hentKandidat = async () => {
            const respons = await get(`/kandidatsok-hent-kandidat/${kandidatNr}`);
            const kandidat = ((await respons.json()) as any)._source;

            setKandidat(kandidat);
        };

        hentKandidat();
    }, [kandidatNr]);

    return (
        <div className={css.wrapper}>
            <Panel className={css.panel}>
                <Link to="/kandidatsok" className="navds-link">
                    <Back />
                    Tilbake til kandidatsøk
                </Link>
                <Heading level="1" size="large">
                    Kandidatside
                </Heading>
                <BodyShort>{kandidatNr}</BodyShort>
                {kandidat && (
                    <code style={{ whiteSpace: 'pre' }}>{JSON.stringify(kandidat, null, 4)}</code>
                )}
            </Panel>
        </div>
    );
};

export default KandidatsideForUtvikling;
