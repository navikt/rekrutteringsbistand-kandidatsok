import React from 'react';
import { Checkbox } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Kandidat } from './Kandidat';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatliste';
import css from './Kandidater.module.css';

type Props = {
    kandidater: Kandidat[];
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnumre: string[]) => void;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
};

const MarkerAlle: FunctionComponent<Props> = ({
    kandidater,
    markerteKandidater,
    onMarkerKandidat,
    kontekstAvKandidatliste,
}) => {
    const kandidaterSomIkkeErPåKandidatlisten = hentKandidaterSomIkkeErPåKandidatlisten(
        kandidater,
        kontekstAvKandidatliste
    ).map((kandidat) => kandidat.arenaKandidatnr);

    const alleKandidaterErMarkert = kandidaterSomIkkeErPåKandidatlisten.every((kandidatnr) =>
        markerteKandidater.has(kandidatnr)
    );

    const onChange = () => {
        if (alleKandidaterErMarkert) {
            const kandidaterSomIkkeErPåSiden = Array.from(markerteKandidater).filter(
                (markertKandidat) => !kandidaterSomIkkeErPåKandidatlisten.includes(markertKandidat)
            );

            onMarkerKandidat(kandidaterSomIkkeErPåSiden);
        } else {
            const kandidaterSomSkalMarkeres = [
                ...Array.from(markerteKandidater),
                ...kandidaterSomIkkeErPåKandidatlisten,
            ];

            onMarkerKandidat(kandidaterSomSkalMarkeres);
        }
    };

    return (
        <Checkbox checked={alleKandidaterErMarkert} onChange={onChange}>
            <span className={css.markerAlleLabel}>Marker alle på siden</span>
        </Checkbox>
    );
};

const hentKandidaterSomIkkeErPåKandidatlisten = (
    kandidater: Kandidat[],
    kontekst: KontekstAvKandidatliste | null
) => {
    if (kontekst === null) {
        return kandidater;
    }

    if (kontekst.kandidatliste.kind === 'suksess') {
        const kandidaterPåListen = kontekst.kandidatliste.data.kandidater;

        return kandidater.filter(
            (kandidat) =>
                !kandidaterPåListen.some(
                    (kandidatPåListen) => kandidatPåListen.kandidatnr === kandidat.arenaKandidatnr
                )
        );
    } else {
        return kandidater;
    }
};

export default MarkerAlle;