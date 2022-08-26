import React from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Back } from '@navikt/ds-icons';
import useKandidatMedForklaringForUtvikling from './useKandidatMedForklaringForUtvikling';
import css from './KandidatsideForUtvikling.module.css';

const KandidatsideForUtvikling = ({ navKontor }: { navKontor: string | null }) => {
    const location = useLocation();
    const { search, markerteKandidater, scroll } = (location.state || {}) as any;

    const { kandidatNr } = useParams();
    const { kandidat, forklaring } = useKandidatMedForklaringForUtvikling(
        kandidatNr,
        navKontor,
        search
    );

    const stateTilSøk = {
        kandidat: kandidatNr,
        markerteKandidater,
        scroll,
    };

    return (
        <div className={css.wrapper}>
            <Panel className={css.panel}>
                <Link
                    to={'/kandidatsok' + (search || '')}
                    state={stateTilSøk}
                    className="navds-link"
                >
                    <Back />
                    Tilbake til kandidatsøk
                </Link>
                <Heading level="1" size="large">
                    Kandidatside
                </Heading>
                <BodyShort>{kandidatNr}</BodyShort>

                {forklaring && (
                    <>
                        <Heading level="2" size="medium">
                            Matcheforklaring
                        </Heading>
                        <code>{JSON.stringify(forklaring, null, 4)}</code>
                    </>
                )}

                {kandidat && (
                    <>
                        <Heading level="2" size="medium">
                            Kandidat
                        </Heading>
                        <code>{JSON.stringify(kandidat, null, 4)}</code>
                    </>
                )}
            </Panel>
        </div>
    );
};

export default KandidatsideForUtvikling;
