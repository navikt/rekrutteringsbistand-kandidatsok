import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hentKandidatliste, hentKandidatlisteMedStillingsId, hentStilling } from '../api/api';
import { Nettressurs } from '../api/Nettressurs';
import { Navigeringsstate } from './useNavigeringsstate';

export type KontekstAvKandidatliste = {
    kandidatliste: Nettressurs<Kandidatliste>;
    stilling: Nettressurs<Stilling>;
    brukKriterierFraStillingen: boolean;
    setOppdatertKandidatliste: (kandidatliste: Kandidatliste) => void;
};

const useKontekstAvKandidatlisteEllerStilling = (
    navigeringsstate: Navigeringsstate
): KontekstAvKandidatliste | null => {
    const [searchParams] = useSearchParams();
    const kandidatlisteId = searchParams.get('kandidatliste');
    const stillingId = searchParams.get('stilling');
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

        const brukKandidatliste = async (kandidatlisteId: string): Promise<string | null> => {
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

            return null;
        };

        const brukKandidatlisteMedStillingsId = async (stillingId: string) => {
            setKandidatliste({
                kind: 'laster-inn',
            });

            try {
                const respons = await hentKandidatlisteMedStillingsId(stillingId);

                setKandidatliste({
                    kind: 'suksess',
                    data: respons,
                });
            } catch (error) {
                setKandidatliste({
                    kind: 'feil',
                    error: error as string,
                });
            }
        };

        const brukKontekstKandidatliste = async (kandidatlisteId: string) => {
            const listensStillingsId = await brukKandidatliste(kandidatlisteId);

            if (listensStillingsId) {
                brukStilling(listensStillingsId);
            }
        };

        const brukKontekstStilling = async (stillingId: string) => {
            if (stillingId) {
                brukStilling(stillingId);
                brukKandidatlisteMedStillingsId(stillingId);
            }
        };

        if (kandidatlisteId) {
            brukKontekstKandidatliste(kandidatlisteId);
        } else if (stillingId) {
            brukKontekstStilling(stillingId);
        }
    }, [kandidatlisteId, stillingId]);

    const memoisertReturverdi = useMemo(() => {
        if (kandidatlisteId === null && stillingId === null) {
            return null;
        } else {
            return {
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
    stillingId: string | null;
    tittel: string;
    organisasjonNavn: string | null;
    kandidater: Array<{ kandidatnr: string }>;
    opprettetTidspunkt: string;
    opprettetAv: {
        ident: string;
        navn: string;
    };
};

export type Stilling = {
    stilling: {
        uuid: string;
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

export default useKontekstAvKandidatlisteEllerStilling;
