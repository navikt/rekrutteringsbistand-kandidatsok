import { useCallback, useEffect, useState } from 'react';
import { hentMineKandidatlister } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from '../hooks/useKontekstAvKandidatlisteEllerStilling';

type MinKandidatliste = Omit<Kandidatliste, 'kandidater'> & {
    antallKandidater: number;
};

export type MineKandidatlister = {
    liste: MinKandidatliste[];
    antall: number;
};

const SIDESTØRRELSE = 8;

const useMineKandidatlister = (side: number) => {
    const [mineKandidatlister, setMineKandidatlister] = useState<Nettressurs<MineKandidatlister>>({
        kind: 'ikke-lastet',
    });

    const lastInnKandidatlister = useCallback(async () => {
        setMineKandidatlister(
            mineKandidatlister.kind === 'suksess'
                ? { kind: 'oppdaterer', data: mineKandidatlister.data }
                : {
                      kind: 'laster-inn',
                  }
        );

        try {
            const nesteSideMedLister = await hentMineKandidatlister(side, SIDESTØRRELSE);

            setMineKandidatlister({
                kind: 'suksess',
                data: nesteSideMedLister,
            });
        } catch (e) {
            setMineKandidatlister({
                kind: 'feil',
                error: e as string,
            });
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [side]);

    useEffect(() => {
        lastInnKandidatlister();
    }, [lastInnKandidatlister]);

    return mineKandidatlister;
};

export default useMineKandidatlister;
