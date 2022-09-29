import { Kandidatliste } from '../hooks/useKontekstAvKandidatliste';
import { Kandidat } from '../Kandidat';
import { LagreKandidaterDto } from '../kandidatliste/LagreKandidaterIMineKandidatlisterModal';
import { MineKandidatlister } from '../kandidatliste/useMineKandidatlister';
import { Innsatsgruppe } from '../filter/Jobbmuligheter';

export const mockMineKandidatlister: MineKandidatlister = {
    liste: [
        {
            kandidatlisteId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f0d',
            stillingId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f01',
            tittel: 'Volleyballskuespiller på Pescara Beach',
            organisasjonNavn: null,
            antallKandidater: 1,
            opprettetAv: {
                ident: 'AB123456',
                navn: 'Joare Mangstuen Mossby',
            },
        },
        {
            kandidatlisteId: 'dc6282eb-a6a1-4009-888c-997e3b2f4f0a',
            stillingId: 'dc6282ed-a6a1-4009-888c-997e3b2f4f02',
            tittel: 'Labrotte til ymse eksperimenter',
            organisasjonNavn: 'Aperture Science',
            antallKandidater: 1,
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
                fodselsnummer: '01010012345',
                fornavn: 'Fornavn',
                etternavn: 'Etternavn',
                arenaKandidatnr: 'PAM017l0yhd38',
                kvalifiseringsgruppekode: Innsatsgruppe.SituasjonsbestemtInnsats,
                yrkeJobbonskerObj: [],
                geografiJobbonsker: [],
            },
        ],
    };

    delete kandidatliste.antallKandidater;
    return kandidatliste as Kandidatliste;
};

export const mockLagringAvKandidaterIKandidatliste = (
    lagreKandidaterDto: LagreKandidaterDto,
    kandidatlisteId: string
): Kandidatliste => {
    const utdatertListe = mockKandidatliste();

    return {
        ...utdatertListe,
        kandidater: [
            ...utdatertListe.kandidater,
            ...lagreKandidaterDto.map((k) => ({ arenaKandidatnr: k.kandidatnr } as Kandidat)),
        ],
    };
};
