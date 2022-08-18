import { ExternalLink, SuccessColored } from '@navikt/ds-icons';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@navikt/ds-react';
import { Kandidatliste } from './LagreKandidaterModal';
import css from './LagreKandidaterModal.module.css';

type Props = {
    kandidatliste: Kandidatliste;
    markerteKandidater: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const VelgbarKandidatliste: FunctionComponent<Props> = ({
    kandidatliste,
    markerteKandidater,
    onKandidatlisteMarkert,
}) => {
    const { kandidatlisteId, tittel, antallKandidater, kandidater } = kandidatliste;

    const alleMarkerteKandidaterErPåListen = Array.from(markerteKandidater).every(
        (markertKandidat) =>
            kandidater.find((kandidat) => kandidat.arenaKandidatnr === markertKandidat)
    );

    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <div className={css.leftAlign}>
                <Checkbox
                    disabled={alleMarkerteKandidaterErPåListen}
                    value={kandidatlisteId}
                    onChange={onKandidatlisteMarkert}
                >
                    <span>
                        {tittel} ({antallKandidater} kandidater)
                    </span>
                </Checkbox>
                <Link
                    target="_blank"
                    to={lenkeTilKandidatliste(kandidatlisteId)}
                    className="navds-link"
                >
                    <ExternalLink title="Åpne kandidatliste" />
                </Link>
            </div>
            {alleMarkerteKandidaterErPåListen && <SuccessColored />}
        </div>
    );
};

const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/kandidatliste/${kandidatlisteId}`;

export default VelgbarKandidatliste;
