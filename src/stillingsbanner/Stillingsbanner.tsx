import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { BodyShort, Heading } from '@navikt/ds-react';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { CoApplicant, Office1 } from '@navikt/ds-icons';
import { lenkeTilKandidatliste, lenkeTilStilling } from '../utils';
import css from './Stillingsbanner.module.css';

type Props = {
    kandidatliste: Nettressurs<Kandidatliste>;
    stillingsId: string;
};

const Stillingsbanner: FunctionComponent<Props> = ({ kandidatliste, stillingsId }) => {
    if (kandidatliste.kind !== 'suksess') {
        return null;
    }

    const { kandidatlisteId, tittel, opprettetAv } = kandidatliste.data;

    return (
        <div role="banner" className={css.container}>
            <div className={css.banner}>
                <div>
                    <BodyShort>Finn kandidater til stilling/kandidatliste:</BodyShort>
                    <Heading level="1" size="medium">
                        {tittel}
                    </Heading>
                    <BodyShort>
                        Opprettet av {opprettetAv.navn} ({opprettetAv.ident})
                    </BodyShort>
                </div>
                <div className={css.lenker}>
                    <Link className="navds-link" to={lenkeTilStilling(stillingsId)}>
                        <Office1 />
                        Se stilling
                    </Link>
                    <Link className="navds-link" to={lenkeTilKandidatliste(kandidatlisteId)}>
                        <CoApplicant />
                        Se kandidatliste
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Stillingsbanner;
