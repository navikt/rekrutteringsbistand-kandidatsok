import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { BodyShort, Heading } from '@navikt/ds-react';
import { CoApplicant as KandidatlisteIkon, Office1 as StillingIkon } from '@navikt/ds-icons';
import { lenkeTilKandidatliste, lenkeTilStilling } from '../utils';
import { KontekstAvKandidatliste } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import useSøkekriterierFraStilling from '../hooks/useSøkekriterierFraStilling';
import css from './Kandidatlistebanner.module.css';

type Props = {
    kontekst: KontekstAvKandidatliste;
};

const Kandidatlistebanner: FunctionComponent<Props> = ({ kontekst }) => {
    const { kandidatliste, stilling, brukKriterierFraStillingen } = kontekst;

    useSøkekriterierFraStilling(stilling, brukKriterierFraStillingen);

    if (kandidatliste.kind !== 'suksess') {
        return null;
    }

    const { tittel, opprettetAv, kandidatlisteId } = kandidatliste.data;

    return (
        <div role="banner" className={css.container}>
            <div className={css.banner}>
                <div>
                    <BodyShort>Finn kandidater til kandidatliste:</BodyShort>
                    <Heading level="1" size="medium">
                        {tittel}
                    </Heading>
                    <BodyShort>
                        Opprettet av {opprettetAv.navn} ({opprettetAv.ident})
                    </BodyShort>
                </div>
                <div className={css.lenker}>
                    {kandidatliste.data.stillingId && (
                        <Link
                            className="navds-link"
                            to={lenkeTilStilling(kandidatliste.data.stillingId)}
                        >
                            <StillingIkon />
                            Se stilling
                        </Link>
                    )}
                    <Link className="navds-link" to={lenkeTilKandidatliste(kandidatlisteId)}>
                        <KandidatlisteIkon />
                        Se kandidatliste
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Kandidatlistebanner;
