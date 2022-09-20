import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatliste, hentStilling } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Kandidat } from '../Kandidat';

export type KontekstAvKandidatliste = {
    kandidatlisteId: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    stilling: Nettressurs<Stilling>;
};

const useKontekstAvKandidatliste = () => {
    const [searchParams] = useSearchParams();
    const kandidatlisteId = searchParams.get('kandidatliste');
    const [kandidatliste, setKandidatliste] = useState<Nettressurs<Kandidatliste>>({
        kind: 'ikke-lastet',
    });
    const [stilling, setStilling] = useState<Nettressurs<Stilling>>({
        kind: 'ikke-lastet',
    });

    useEffect(() => {
        const brukStilling = async (stillingsId: string) => {
            setStilling({
                kind: 'laster-inn',
            });

            try {
                const stilling = await hentStilling(stillingsId);

                setStilling({
                    kind: 'suksess',
                    data: stilling,
                });
            } catch (error) {
                setStilling({
                    kind: 'feil',
                    error: error as string,
                });
            }
        };

        const brukKandidatliste = async (kandidatlisteId: string): Promise<string | undefined> => {
            setKandidatliste({
                kind: 'laster-inn',
            });

            try {
                const respons = await hentKandidatliste(kandidatlisteId);

                setKandidatliste({
                    kind: 'suksess',
                    data: respons,
                });

                return respons.stillingId;
            } catch (error) {
                setKandidatliste({
                    kind: 'feil',
                    error: error as string,
                });
            }
        };

        const brukKontekst = async (kandidatlisteId: string) => {
            const listensStilling = await brukKandidatliste(kandidatlisteId);

            if (listensStilling) {
                brukStilling(listensStilling);
            }
        };

        if (kandidatlisteId) {
            brukKontekst(kandidatlisteId);
        }
    }, [kandidatlisteId]);

    if (kandidatlisteId === null) {
        return null;
    } else {
        return {
            kandidatlisteId,
            kandidatliste,
            stilling,
        };
    }
};

export type Kandidatliste = {
    kandidatlisteId: string;
    stillingId: string;
    tittel: string;
    organisasjonNavn: string | null;
    antallKandidater: number;
    kandidater: Kandidat[];
    opprettetAv: {
        ident: string;
        navn: string;
    };
};

export type Stilling = {
    stilling: {
        categoryList: Array<{
            categoryType: 'STYRK08' | 'STYRK08NAV' | string;
            name: string;
        }>;
        location: {
            municipalCode: string | null;
            municipal: string | null;
            postalCode: string | null;
        };
    };
};

export default useKontekstAvKandidatliste;
