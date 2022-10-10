import React, { ReactNode, FunctionComponent } from 'react';
import { InnloggetBruker } from './hooks/useBrukerensIdent';
import { KontekstAvKandidatliste } from './hooks/useKontekstAvKandidatliste';
import useRespons from './hooks/useRespons';
import { Loader } from '@navikt/ds-react';
import Resultat from './resultat/Resultat';
import { Økt } from './Økt';
import css from './Kandidatsøk.module.css';

type Props = {
    innloggetBruker: InnloggetBruker;
    kontekstAvKandidatliste: KontekstAvKandidatliste | null;
    markerteKandidater: Set<string>;
    onMarkerKandidat: (kandidatnr: string | string[]) => void;
    forrigeØkt: Økt | null;
    knapper: ReactNode;
};

const Søk: FunctionComponent<Props> = ({
    innloggetBruker,
    kontekstAvKandidatliste,
    markerteKandidater,
    onMarkerKandidat,
    forrigeØkt,
    knapper,
}) => {
    const respons = useRespons(innloggetBruker);

    console.log('HALLA:', kontekstAvKandidatliste, respons);

    if (respons.kind === 'laster-inn') {
        return <Loader variant="interaction" size="2xlarge" className={css.lasterInn} />;
    } else if (respons.kind === 'suksess' || respons.kind === 'oppdaterer') {
        return (
            <Resultat
                respons={respons.data}
                kontekstAvKandidatliste={kontekstAvKandidatliste}
                markerteKandidater={markerteKandidater}
                onMarkerKandidat={onMarkerKandidat}
                forrigeØkt={forrigeØkt}
                knapper={knapper}
            />
        );
    } else {
        return null;
    }
};

export default Søk;
