import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatliste, hentStilling } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Navigeringsstate } from './useNavigeringsstate';

export type KontekstAvKandidatliste = {
    kandidatlisteId: string;
    kandidatliste: Nettressurs<Kandidatliste>;
    stilling: Nettressurs<Stilling>;
    brukKriterierFraStillingen: boolean;
    setOppdatertKandidatliste: (kandidatliste: Kandidatliste) => void;
};

const useKontekstAvKandidatliste = (
    navigeringsstate: Navigeringsstate
): KontekstAvKandidatliste | null => {
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
            const listensStillingsId = await brukKandidatliste(kandidatlisteId);

            if (listensStillingsId) {
                brukStilling(listensStillingsId);
            }
        };

        if (kandidatlisteId) {
            brukKontekst(kandidatlisteId);
        }
    }, [kandidatlisteId]);

    const memoisertReturverdi = useMemo(() => {
        if (kandidatlisteId === null) {
            return null;
        } else {
            return {
                kandidatlisteId,
                kandidatliste,
                stilling,
                brukKriterierFraStillingen: navigeringsstate.brukKriterierFraStillingen || false,
                setOppdatertKandidatliste: (kandidatliste: Kandidatliste) =>
                    setKandidatliste({
                        kind: 'suksess',
                        data: kandidatliste,
                    }),
            };
        }
    }, [kandidatlisteId, kandidatliste, stilling, navigeringsstate.brukKriterierFraStillingen]);

    return memoisertReturverdi;
};

export type Kandidatliste = {
    kandidatlisteId: string;
    stillingId: string;
    tittel: string;
    organisasjonNavn: string | null;
    kandidater: Array<{ kandidatnr: string }>;
    opprettetAv: {
        ident: string;
        navn: string;
    };
};

export type Stilling = {
    stilling: {
        categoryList: Array<{
            categoryType: 'STYRK08' | 'STYRK08NAV';
            name: string;
        }>;
        location: {
            municipalCode: string | null;
            municipal: string | null;
            postalCode: string | null;
            county: string | null;
        };
    };
};

export default useKontekstAvKandidatliste;
