import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { CheckboxGroup, Loader, Search } from '@navikt/ds-react';
import { hentKandidatlisteMedStillingsId, hentStillingMedAnnonsenummer } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import { Kandidatliste } from '../hooks/useKontekstAvKandidatliste';
import css from './SøkPåKandidatliste.module.css';
import { sendEvent } from '../amplitude';

type Props = {
    markerteLister: Set<string>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SøkPåKandidatliste: FunctionComponent<Props> = ({
    markerteLister,
    lagredeLister,
    onKandidatlisteMarkert,
}) => {
    const [annonsenummer, setAnnonsenummer] = useState<string>('');
    const [søkeresultat, setSøkeresultat] = useState<Nettressurs<Kandidatliste>>({
        kind: 'ikke-lastet',
    });

    const søkPåAnnonsenummer = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setSøkeresultat({
            kind: 'laster-inn',
        });

        try {
            sendEvent('lagre_i_kandidatliste_modal', 'søkte_kandidatliste_basert_på_annonsenr');
            const stilling = await hentStillingMedAnnonsenummer(annonsenummer);
            const kandidatliste = await hentKandidatlisteMedStillingsId(stilling.stilling.uuid);

            setSøkeresultat({
                kind: 'suksess',
                data: kandidatliste,
            });
        } catch (e) {
            setSøkeresultat({
                kind: 'feil',
                error: e as string,
            });
        }
    };

    return (
        <div className={css.søkPåKandidatliste}>
            <form role="search" onSubmit={søkPåAnnonsenummer}>
                <Search
                    clearButton
                    size="small"
                    label="Søk på annonsenummer"
                    description="Hvis du ikke finner kandidatlisten du leter etter"
                    variant="secondary"
                    hideLabel={false}
                    value={annonsenummer}
                    onChange={setAnnonsenummer}
                />
            </form>
            {søkeresultat.kind === 'laster-inn' && <Loader />}
            {søkeresultat.kind === 'suksess' && (
                <CheckboxGroup
                    hideLegend
                    legend="Velg kandidatlister"
                    value={Array.from(markerteLister)}
                >
                    <VelgbarKandidatliste
                        kandidatliste={søkeresultat.data}
                        onKandidatlisteMarkert={onKandidatlisteMarkert}
                        lagredeLister={lagredeLister}
                    />
                </CheckboxGroup>
            )}
        </div>
    );
};

export default SøkPåKandidatliste;
