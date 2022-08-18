import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import { CheckboxGroup, Loader, Search } from '@navikt/ds-react';
import { hentKandidatlisteMedAnnonsenummer } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from './LagreKandidaterModal';
import VelgbarKandidatliste from './VelgbarKandidatliste';
import css from './LagreKandidaterModal.module.css';

type Props = {
    markerteLister: Set<string>;
    markerteKandidater: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SøkPåKandidatliste: FunctionComponent<Props> = ({
    markerteLister,
    markerteKandidater,
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
            const kandidatliste = await hentKandidatlisteMedAnnonsenummer(annonsenummer);
            console.log('JALLA:');

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
                    label="Søk på annonsenummer"
                    size="small"
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
                        markerteKandidater={markerteKandidater}
                    />
                </CheckboxGroup>
            )}
        </div>
    );
};

export default SøkPåKandidatliste;
