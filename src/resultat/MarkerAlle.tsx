import React from 'react';
import { Checkbox } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Kandidat } from '../Kandidat';
import css from './Resultat.module.css';

type Props = {
    kandidater: Kandidat[];
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnumre: string[]) => void;
};

const MarkerAlle: FunctionComponent<Props> = ({
    kandidater,
    markerteKandidater,
    onMarkerKandidat,
}) => {
    const alleKandidaterPåSiden = kandidater.map((kandidat) => kandidat.arenaKandidatnr);

    const alleKandidaterErMarkert = kandidater.every((kandidat) =>
        markerteKandidater.has(kandidat.arenaKandidatnr)
    );

    const onChange = () => {
        if (alleKandidaterErMarkert) {
            const kandidaterSomIkkeErPåSiden = Array.from(markerteKandidater).filter(
                (markertKandidat) => !alleKandidaterPåSiden.includes(markertKandidat)
            );

            onMarkerKandidat(kandidaterSomIkkeErPåSiden);
        } else {
            const kandidaterSomSkalMarkeres = [
                ...Array.from(markerteKandidater),
                ...alleKandidaterPåSiden,
            ];

            onMarkerKandidat(kandidaterSomSkalMarkeres);
        }
    };

    return (
        <Checkbox checked={alleKandidaterErMarkert} onChange={onChange}>
            <span className={css.markerAlleLabel}>Marker alle kandidater</span>
        </Checkbox>
    );
};

export default MarkerAlle;
