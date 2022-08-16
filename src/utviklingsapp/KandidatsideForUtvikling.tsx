import React, { useEffect, useState } from 'react';
import { BodyShort, Heading, Panel } from '@navikt/ds-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { get, post } from '../api/api';
import { Kandidat } from '../Kandidat';
import { Back } from '@navikt/ds-icons';
import { Navigeringsstate } from '../hooks/useNavigeringsstate';
import { byggInnerQuery } from '../api/query/byggQuery';
import { searchParamsTilSøkekriterier } from '../hooks/useSøkekriterier';
import useInnloggetBruker from '../hooks/useBrukerensIdent';
import css from './KandidatsideForUtvikling.module.css';

const KandidatsideForUtvikling = ({ navKontor }: { navKontor: string | null }) => {
    const [kandidat, setKandidat] = useState<Kandidat | null>(null);
    const [forklaring, setForklaring] = useState<any>(null);

    const innloggetBruker = useInnloggetBruker(navKontor);

    const location = useLocation();
    const { kandidatNr } = useParams();
    const { search, markerteKandidater } = (location.state || {}) as any;

    const søkekriterier = searchParamsTilSøkekriterier(new URLSearchParams(search));
    const bruktSøk = {
        query: byggInnerQuery(søkekriterier, innloggetBruker),
    };

    useEffect(() => {
        const hentKandidat = async () => {
            const kandidatRespons = await get(`/kandidatsok-hent-kandidat/${kandidatNr}`);
            const kandidat = ((await kandidatRespons.json()) as any)._source;

            setKandidat(kandidat);
        };

        const hentForklaring = async () => {
            const forklaringRespons = await post(
                `/kandidatsok-hent-forklaring/${kandidatNr}`,
                bruktSøk
            );

            const forklaring = ((await forklaringRespons.json()) as any).explanation;

            setForklaring(forklaring);
        };

        hentKandidat();

        if (search) {
            hentForklaring();
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [kandidatNr]);

    let lenkeTilbakeTilSøket = '/kandidatsok';
    if (search) {
        lenkeTilbakeTilSøket += search;
    }

    const stateTilLenke: Navigeringsstate = {
        fraKandidat: kandidatNr,
        markerteKandidater,
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
