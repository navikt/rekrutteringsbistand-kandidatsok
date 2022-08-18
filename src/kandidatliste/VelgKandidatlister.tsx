import React, { ChangeEvent, FunctionComponent } from 'react';
import { ExternalLink } from '@navikt/ds-icons';
import { CheckboxGroup, Checkbox } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { MineKandidatlister } from './LagreKandidaterModal';
import css from './LagreKandidaterModal.module.css';

type Props = {
    markerteLister: Set<string>;
    mineKandidatlister: MineKandidatlister;
    onKandidatlisteMarkert: (event: ChangeEvent<HTMLInputElement>) => void;
};

const VelgKandidatlister: FunctionComponent<Props> = ({
    markerteLister,
    mineKandidatlister,
    onKandidatlisteMarkert,
}) => {
    return (
        <CheckboxGroup
            className={css.liste}
            legend="Velg kandidatlister"
            value={Array.from(markerteLister)}
        >
            {mineKandidatlister.liste.map(({ kandidatlisteId, tittel, antallKandidater }) => {
                return (
                    <div key={kandidatlisteId} className={css.kandidatliste}>
                        <Checkbox value={kandidatlisteId} onChange={onKandidatlisteMarkert}>
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
                );
            })}
        </CheckboxGroup>
    );
};

const lenkeTilKandidatliste = (kandidatlisteId: string) =>
    `/kandidater/kandidatliste/${kandidatlisteId}`;

export default VelgKandidatlister;
