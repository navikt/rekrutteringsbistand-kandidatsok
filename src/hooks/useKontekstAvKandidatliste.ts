import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatliste } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidatliste } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';

export type KontekstAvKandidatliste = {
    kandidatlisteId: string;
    kandidatliste: Nettressurs<Kandidatliste>;
};

const useKontekstAvKandidatliste = () => {
    const [searchParams] = useSearchParams();
    const kandidatlisteId = searchParams.get('kandidatliste');
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        const hent = async (kandidatlisteId: string) => {
            setKandidatliste({
                kind: 'laster-inn',
            });

            try {
                const kandidatliste = await hentKandidatliste(kandidatlisteId);

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

        if (kandidatlisteId) {
            hent(kandidatlisteId);
        }
    }, [kandidatlisteId]);

    if (kandidatlisteId === null) {
        return null;
    } else {
        return {
            kandidatlisteId,
            kandidatliste,
        };
    }
};

export default useKontekstAvKandidatliste;
