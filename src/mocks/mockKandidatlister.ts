import { Kandidatliste } from '../hooks/useKontekstAvKandidatlisteEllerStilling';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';

export const mockMineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: '123',
            stillingId: 'abc',
            tittel: 'Volleyballskuespiller på Pescara Beach',
            organisasjonNavn: null,
            antallKandidater: 1,
            opprettetTidspunkt: new Date().toISOString(),
            opprettetAv: {
                ident: 'AB123456',
                navn: 'Joare Mangstuen Mossby',
            },
        },
        {
            kandidatlisteId: '456',
            stillingId: 'abc',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'APERTURE SCIENCE',
            antallKandidater: 1,
            opprettetTidspunkt: new Date().toISOString(),
            opprettetAv: {
                ident: 'AB123456',
                navn: 'Joare Mangstuen Mossby',
            },
        },
        {
            kandidatlisteId: '789',
            stillingId: null,
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: null,
            antallKandidater: 1,
            opprettetTidspunkt: new Date().toISOString(),
            opprettetAv: {
                ident: 'AB123456',
                navn: 'Joare Mangstuen Mossby',
            },
        },
    ],
    antall: 32,
};

export const mockKandidatliste = (): Kandidatliste => {
    const kandidatliste: any = {
        ...mockMineKandidatlister.liste[0],
        kandidater: [
            {
                arenaKandidatnr: 'PAM017l0yhd38',
            },
        ],
    };

    delete kandidatliste.antallKandidater;
    return kandidatliste as Kandidatliste;
};

export const mockKandidatlisteUtenStilling = (): Kandidatliste => {
    const kandidatliste: any = {
        ...mockMineKandidatlister.liste[2],
        kandidater: [
            {
                arenaKandidatnr: 'PAM017l0yhd38',
            },
        ],
    };

    delete kandidatliste.antallKandidater;
    return kandidatliste as Kandidatliste;
};

export const mockLagringAvKandidaterIKandidatliste = (
    lagreKandidaterDto: LagreKandidaterDto
): Kandidatliste => {
    const utdatertListe = mockKandidatliste();

    return {
        ...utdatertListe,
        kandidater: [
            ...utdatertListe.kandidater,
            ...lagreKandidaterDto.map((k) => ({ kandidatnr: k.kandidatnr })),
        ],
    };
};
