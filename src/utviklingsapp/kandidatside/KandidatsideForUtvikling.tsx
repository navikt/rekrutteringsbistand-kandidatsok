import React, { useEffect } from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { Link, useParams } from 'react-router-dom';
import { Back } from '@navikt/ds-icons';
import { Økt } from '../../Økt';
import useKandidatMedForklaringForUtvikling from './useKandidatMedForklaringForUtvikling';
import css from './KandidatsideForUtvikling.module.css';

const KandidatsideForUtvikling = ({ navKontor }: { navKontor: string | null }) => {
    const searchParams = hentSearchParamsFraSessionStorage();

    const { kandidatNr } = useParams();
    const { kandidat, forklaring } = useKandidatMedForklaringForUtvikling(
        kandidatNr,
        navKontor,
        searchParams
    );

    useEffect(() => {
        skrivKandidatnrTilSessionStorage(kandidatNr!);
    }, [kandidatNr]);

    return (
        <div className={css.wrapper}>
            <Panel className={css.panel}>
                <Link
                    to={'/kandidatsok' + (searchParams ? `?${searchParams}` : '')}
                    state={{
                        scrollTilKandidat: true,
                    }}
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

const hentKandidatsøkSession = (): Økt | undefined => {
    const kandidatsøkString = window.sessionStorage.getItem('kandidatsøk');

    if (!kandidatsøkString) {
        return undefined;
    }

    return JSON.parse(kandidatsøkString);
};

const hentSearchParamsFraSessionStorage = (): string | undefined =>
    hentKandidatsøkSession()?.searchParams;

const skrivKandidatnrTilSessionStorage = (kandidatNr: string) => {
    const session = hentKandidatsøkSession() || {};

    const oppdatertSession: Økt = {
        ...session,
        sistBesøkteKandidat: kandidatNr,
    };

    window.sessionStorage.setItem('kandidatsøk', JSON.stringify(oppdatertSession));
};

export default KandidatsideForUtvikling;
