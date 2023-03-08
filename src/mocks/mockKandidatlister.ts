import { Kandidatliste } from '../hooks/useKontekstAvKandidatliste';
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
            opprettet: new Date().toISOString(),
            opprettetAv: {
                ident: 'AB123456',
                navn: 'Joare Mangstuen Mossby',
            },
        },
        {
            kandidatlisteId: '456',
            stillingId: 'abc',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'Aperture Science',
            antallKandidater: 1,
            opprettet: new Date().toISOString(),
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
