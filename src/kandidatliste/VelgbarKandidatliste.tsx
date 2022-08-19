import { ExternalLink, SuccessColored } from '@navikt/ds-icons';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@navikt/ds-react';
import { Kandidatliste } from './LagreKandidaterModal';
import css from './LagreKandidaterModal.module.css';

type Props = {
    kandidatliste: Omit<Kandidatliste, 'kandidater'>;
    lagredeLister: Set<string>;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const VelgbarKandidatliste: FunctionComponent<Props> = ({
    kandidatliste,
    lagredeLister,
    onKandidatlisteMarkert,
}) => {
    const { kandidatlisteId, tittel, antallKandidater } = kandidatliste;

    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <div className={css.leftAlign}>
                <Checkbox
                    disabled={lagredeLister.has(kandidatlisteId)}
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
            {lagredeLister.has(kandidatlisteId) && <SuccessColored />}
        </div>
    );
};

const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/lister/detaljer/${kandidatlisteId}`;

export default VelgbarKandidatliste;
