import { ExternalLink, SuccessColored } from '@navikt/ds-icons';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { BodyShort, Checkbox } from '@navikt/ds-react';
import { lenkeTilKandidatliste } from '../utils';
import { Kandidatliste } from '../hooks/useKontekstAvKandidatliste';
import css from './VelgKandidatlister.module.css';
import classNames from 'classnames';

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
    const checkboxId = `velg-kandidatliste-${kandidatliste.kandidatlisteId}`;
    const erLagtTil = lagredeLister.has(kandidatlisteId);
    const opprettetDato = new Date(kandidatliste.opprettetTidspunkt).toLocaleDateString('nb', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    const labelCls = classNames(css.label, {
        [css.disabled]: erLagtTil,
    });

    console.log('Er lagt til', kandidatlisteId, erLagtTil);

    return (
        <div key={kandidatlisteId} className={css.kandidatliste}>
            <Checkbox
                hideLabel
                id={checkboxId}
                disabled={lagredeLister.has(kandidatlisteId)}
                value={kandidatlisteId}
                onChange={onKandidatlisteMarkert}
            >
                {tittel}
            </Checkbox>
            <label className={labelCls} htmlFor={checkboxId}>
                {tittel}
            </label>
            <BodyShort className={css.arbeidsgiver}>{kandidatliste.organisasjonNavn}</BodyShort>
            <BodyShort className={css.opprettet}>{opprettetDato}</BodyShort>
            <Link
                target="_blank"
                to={lenkeTilKandidatliste(kandidatlisteId)}
                className="navds-link"
            >
                <ExternalLink title="Åpne kandidatliste" />
            </Link>
        </div>
    );
};

export default VelgbarKandidatliste;
