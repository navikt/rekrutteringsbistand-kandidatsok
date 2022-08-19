import { ExternalLink, SuccessColored } from '@navikt/ds-icons';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@navikt/ds-react';
import { Kandidatliste } from './LagreKandidaterModal';
import { lenkeTilKandidatliste } from '../utils';
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
    const { kandidatlisteId, tittel } = kandidatliste;

    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <div className={css.leftAlign}>
                <Checkbox
                    disabled={lagredeLister.has(kandidatlisteId)}
                    value={kandidatlisteId}
                    onChange={onKandidatlisteMarkert}
                >
                    {tittel}
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

export default VelgbarKandidatliste;
