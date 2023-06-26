import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { BodyShort, Heading } from '@navikt/ds-react';
import { Buldings2Icon, PersonGroupIcon } from '@navikt/aksel-icons';
import { lenkeTilKandidatliste, lenkeTilStilling } from '../utils';
import { KontekstAvKandidatlisteEllerStilling } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import useSøkekriterierFraStilling from '../hooks/useSøkekriterierFraStilling';
import css from './Kandidatlistebanner.module.css';

type Props = {
    kontekst: KontekstAvKandidatlisteEllerStilling;
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
                            <Buldings2Icon />
                            Se stilling
                        </Link>
                    )}
                    <Link className="navds-link" to={lenkeTilKandidatliste(kandidatlisteId)}>
                        <PersonGroupIcon />
                        Se kandidatliste
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Kandidatlistebanner;
