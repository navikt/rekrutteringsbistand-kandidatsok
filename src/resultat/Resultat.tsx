import React, { useState } from 'react';
import { Button, Heading } from '@navikt/ds-react';
import { AddPerson, Error } from '@navikt/ds-icons';

import { KontekstAvStilling } from '../hooks/useStilling';
import { Navigeringsstate } from '../hooks/useNavigeringsstate';
import { Respons } from '../elasticSearchTyper';
import Kandidatrad from './Kandidatrad';
import LagreKandidaterISpesifikkKandidatlisteModal from '../kandidatliste/LagreKandidaterISpesifikkKandidatlisteModal';
import LagreKandidaterIMineKandidatlisterModal from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import Paginering from '../filter/Paginering';
import css from './Resultat.module.css';

export type Props = {
    respons: Respons;
    navigeringsstate: Navigeringsstate;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatNr: string) => void;
    fjernMarkering: () => void;
    kontekstAvStilling: KontekstAvStilling | null;
};

const Resultat = ({
    respons,
    navigeringsstate,
    markerteKandidater,
    onMarkerKandidat,
    fjernMarkering,
    kontekstAvStilling,
}: Props) => {
    const treff = respons.hits.hits;
    const antallTreff = respons.hits.total.value;
    const kandidater = treff.map((t) => t._source);

    const [
        visLagreKandidaterIMineKandidatlisterModal,
        setVisLagreKandidaterIMineKandidatlisterModal,
    ] = useState(false);
    const [
        visLagreKandidaterISpesifikkKandidatlisteModal,
        setVisLagreKandidaterISpesifikkKandidatlisteModal,
    ] = useState(false);

    const onLagreIKandidatlisteClick = () => {
        if (kontekstAvStilling) {
            setVisLagreKandidaterISpesifikkKandidatlisteModal(true);
        } else {
            setVisLagreKandidaterIMineKandidatlisterModal(true);
        }
    };

    return (
        <div className={css.resultat}>
            <div className={css.telling}>
                <Heading size="medium" level="2">
                    {antallTreff} kandidater
                </Heading>
                <div>
                    {markerteKandidater.size > 0 && (
                        <Button
                            size="small"
                            variant="secondary"
                            aria-label="Fjern markerte kandidater"
                            icon={<Error aria-hidden />}
                            className={css.fjernMarkeringKnapp}
                            onClick={fjernMarkering}
                        >
                            {markerteKandidater.size} markert
                        </Button>
                    )}
                    <Button
                        size="small"
                        variant="primary"
                        icon={<AddPerson aria-hidden />}
                        disabled={markerteKandidater.size === 0}
                        onClick={onLagreIKandidatlisteClick}
                    >
                        Lagre i kandidatliste
                    </Button>
                </div>
            </div>
            <ul className={css.kandidater}>
                {kandidater.map((kandidat) => (
                    <Kandidatrad
                        kandidat={kandidat}
                        key={kandidat.arenaKandidatnr}
                        markerteKandidater={markerteKandidater}
                        erMarkert={markerteKandidater.has(kandidat.arenaKandidatnr)}
                        onMarker={() => {
                            onMarkerKandidat(kandidat.arenaKandidatnr);
                        }}
                        erFremhevet={navigeringsstate.fraKandidat === kandidat.arenaKandidatnr}
                    />
                ))}
            </ul>
            <Paginering antallTreff={antallTreff} />
            <LagreKandidaterIMineKandidatlisterModal
                vis={visLagreKandidaterIMineKandidatlisterModal}
                onClose={() => setVisLagreKandidaterIMineKandidatlisterModal(false)}
                markerteKandidater={markerteKandidater}
            />
            {kontekstAvStilling !== null && (
                <LagreKandidaterISpesifikkKandidatlisteModal
                    vis={visLagreKandidaterISpesifikkKandidatlisteModal}
                    onClose={() => setVisLagreKandidaterISpesifikkKandidatlisteModal(false)}
                    markerteKandidater={markerteKandidater}
                    kontekstAvStilling={kontekstAvStilling}
                    onSuksess={fjernMarkering}
                />
            )}
        </div>
    );
};

export default Resultat;
