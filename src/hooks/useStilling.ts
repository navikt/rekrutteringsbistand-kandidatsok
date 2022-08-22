import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatlisteMedStillingsId } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';

export type KontekstAvStilling = {
    stillingsId: string;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const useStilling = () => {
    const [searchParams] = useSearchParams();
    const stillingsId = searchParams.get('stilling');
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        const hentKandidatliste = async (stillingsId: string) => {
            setKandidatliste({
                kind: 'laster-inn',
            });

            try {
                const kandidatliste = await hentKandidatlisteMedStillingsId(stillingsId);

                setKandidatliste({
                    kind: 'suksess',
                    data: kandidatliste,
                });
            } catch (error) {
                setKandidatliste({
                    kind: 'feil',
                    error: error as string,
                });
            }
        };

        if (stillingsId) {
            hentKandidatliste(stillingsId);
        }
    }, [stillingsId]);

    if (stillingsId === null) {
        return null;
    } else {
        return {
            stillingsId,
            kandidatliste,
        };
    }
};

export default useStilling;
